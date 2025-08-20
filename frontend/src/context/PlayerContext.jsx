import React, { createContext, useState, useRef, useContext } from "react";

// 1. Create the context
const PlayerContext = createContext();

// 2. Create the provider component
export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // A ref to hold a reference to the actual <audio> element
  const audioRef = useRef(null);

  const playSong = (song) => {
    setCurrentSong(song);
    // The actual playback is handled by a useEffect in PlayerBar
  };

  const togglePlayPause = () => {
    if (!currentSong) return; // Do nothing if no song is loaded

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // The 'value' object holds all the state and functions
  // that will be available to any component wrapped by this provider.
  const value = {
    currentSong,
    isPlaying,
    audioRef,
    playSong,
    togglePlayPause,
    setIsPlaying, // Exposing this to update play state from the <audio> element events
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

// 3. Create a custom hook for easy access to the context
export const usePlayer = () => {
  return useContext(PlayerContext);
};
