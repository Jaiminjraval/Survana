import axios from "axios";
import User from "../models/user.model.js";

// Helper function to format song data from Deezer, now with more details
const formatSongData = (track) => {
  if (!track || !track.album || !track.artist) return null;
  return {
    id: track.id,
    title: track.title,
    artist: track.artist.name,
    artistId: track.artist.id, // <-- ADDED
    albumId: track.album.id, // <-- ADDED
    cover: track.album.cover_medium,
    audio: track.preview,
    duration: track.duration, // <-- ADDED
  };
};


export const getArtistDetails = async (req, res) => {
  try {
    const { artistId } = req.params;
    const response = await axios.get(
      `https://api.deezer.com/artist/${artistId}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching artist details:", error.message);
    res.status(500).json({ error: "Failed to fetch artist details" });
  }
};

export const getArtistTopTracks = async (req, res) => {
  try {
    const { artistId } = req.params;
    const response = await axios.get(
      `https://api.deezer.com/artist/${artistId}/top?limit=25`
    );

    const rawTracks = (response.data && response.data.data) || [];

    const formattedTracks = rawTracks.map(formatSongData).filter(Boolean);

    res.status(200).json(formattedTracks);
  } catch (error) {
    console.error("Error fetching artist top tracks:", error.message);
    res.status(500).json({ error: "Failed to fetch artist top tracks" });
  }
};

export const getAlbumDetails = async (req, res) => {
  try {
    const { albumId } = req.params;
    const response = await axios.get(`https://api.deezer.com/album/${albumId}`);
    const albumData = response.data;
    // Format the tracklist within the album data before sending
    if (albumData.tracks && albumData.tracks.data) {
      albumData.tracks.data = albumData.tracks.data
        .map(formatSongData)
        .filter(Boolean);
    }
    res.status(200).json(albumData);
  } catch (error) {
    console.error("Error fetching album details:", error.message);
    res.status(500).json({ error: "Failed to fetch album details" });
  }
};


export const getTrendingSongs = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.deezer.com/chart/0/tracks?limit=50"
    );
    res
      .status(200)
      .json(response.data.data.map(formatSongData).filter(Boolean));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trending songs" });
  }
};

export const downloadSong = async (req, res) => {
  try {
    if (req.user.subscription !== "premium") {
      return res
        .status(403)
        .json({ error: "Premium subscription required for downloads." });
    }
    const { songId } = req.params;
    const response = await axios.get(`https://api.deezer.com/track/${songId}`);
    const track = response.data;

    if (!track || !track.preview) {
      return res.status(404).json({ error: "Song preview not found." });
    }
    const audioUrl = track.preview;
    const audioResponse = await axios({
      method: "get",
      url: audioUrl,
      responseType: "stream",
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${track.title} - ${track.artist.name}.mp3"`
    );
    audioResponse.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const likeUnlikeSong = async (req, res) => {
  try {
    const songId = parseInt(req.params.songId, 10);
    const { _id: userId } = req.user;
    const user = await User.findById(userId);

    if (user.favorites.includes(songId)) {
      await User.updateOne({ _id: userId }, { $pull: { favorites: songId } });
      res.status(200).json({ message: "Song unliked successfully" });
    } else {
      await User.updateOne({ _id: userId }, { $push: { favorites: songId } });
      res.status(200).json({ message: "Song liked successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLikedSongs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || user.favorites.length === 0) {
      return res.status(200).json([]);
    }

    const songPromises = user.favorites.map((id) =>
      axios.get(`https://api.deezer.com/track/${id}`)
    );
    const songResponses = await Promise.all(songPromises);
    const favoriteSongs = songResponses
      .map((response) => formatSongData(response.data))
      .filter(Boolean);

    res.status(200).json(favoriteSongs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
