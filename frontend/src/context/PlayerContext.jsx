import React, { createContext, useState, useRef, useContext } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(-1);
  const audioRef = useRef(null);

  const playSong = (song, tracklist = []) => {
    setCurrentSong(song);
    if (tracklist.length > 0) {
      setQueue(tracklist);
      const songIndex = tracklist.findIndex((t) => t.id === song.id);
      setCurrentQueueIndex(songIndex);
    } else {
      // If playing a single song, the queue is just that one song
      setQueue([song]);
      setCurrentQueueIndex(0);
    }
  };

  const playNext = () => {
    if (queue.length > 1 && currentQueueIndex < queue.length - 1) {
      const nextIndex = currentQueueIndex + 1;
      setCurrentSong(queue[nextIndex]);
      setCurrentQueueIndex(nextIndex);
    }
  };

  const playPrev = () => {
    if (queue.length > 1 && currentQueueIndex > 0) {
      const prevIndex = currentQueueIndex - 1;
      setCurrentSong(queue[prevIndex]);
      setCurrentQueueIndex(prevIndex);
    }
  };

  const togglePlayPause = () => {
    if (!currentSong) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const value = {
    currentSong,
    isPlaying,
    audioRef,
    playSong,
    togglePlayPause,
    setIsPlaying,
    playNext,
    playPrev,
    isNextAvailable: queue.length > 1 && currentQueueIndex < queue.length - 1,
    isPrevAvailable: queue.length > 1 && currentQueueIndex > 0,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  return useContext(PlayerContext);
};
