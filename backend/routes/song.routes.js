import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getTrendingSongs,
  likeUnlikeSong,
  getLikedSongs,
  downloadSong,
  getArtistDetails,
  getArtistTopTracks,
  getAlbumDetails,
} from "../controllers/song.controller.js";

const router = express.Router();

router.get("/artist/:artistId", getArtistDetails);
router.get("/artist/:artistId/top", getArtistTopTracks);
router.get("/album/:albumId", getAlbumDetails);

router.get("/trending", getTrendingSongs);
router.get("/download/:songId", protectRoute, downloadSong);
router.get("/favorites", protectRoute, getLikedSongs);
router.post("/like/:songId", protectRoute, likeUnlikeSong);

export default router;
