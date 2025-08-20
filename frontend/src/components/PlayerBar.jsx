import { Box, HStack, Text, IconButton, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext"; // Import our custom hook

const PlayerBar = () => {
  // Get everything we need from the PlayerContext
  const { currentSong, isPlaying, togglePlayPause, audioRef, setIsPlaying } =
    usePlayer();

  // This effect triggers whenever the currentSong changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      // When a new song is selected, automatically play it
      audioRef.current.play().catch((error) => {
        // Autoplay can sometimes be blocked by the browser
        console.error("Autoplay was prevented:", error);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }, [currentSong, audioRef, setIsPlaying]);

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="gray.900"
      color="white"
      p={4}
      zIndex={10}
      borderTop="1px solid"
      borderColor="gray.700"
    >
      <HStack justify="space-between" align="center">
        {/* Song Info */}
        <HStack flex="1">
          {currentSong && (
            <Image
              src={currentSong.cover}
              boxSize="50px"
              borderRadius="md"
              mr={3}
            />
          )}
          <Box>
            <Text fontWeight="bold">{currentSong?.title || "No Song"}</Text>
            <Text fontSize="sm" color="gray.400">
              {currentSong?.artist || "Select a song to play"}
            </Text>
          </Box>
        </HStack>

        {/* Play/Pause Controls */}
        <IconButton
          aria-label={isPlaying ? "Pause" : "Play"}
          icon={isPlaying ? <FaPause /> : <FaPlay />}
          onClick={togglePlayPause}
          isDisabled={!currentSong}
          isRound
          size="lg"
        />

        {/* This is the single, hidden audio element that powers the app */}
        <audio
          ref={audioRef}
          src={currentSong?.audio}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          style={{ display: "none" }}
        />

        {/* Placeholder for volume controls, etc. */}
        <Box flex="1"></Box>
      </HStack>
    </Box>
  );
};

export default PlayerBar;
