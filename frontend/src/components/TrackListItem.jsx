import {
  HStack,
  Text,
  Image,
  useColorModeValue,
  Box,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { usePlayer } from "../context/PlayerContext";
import FavoriteButton from "./FavoriteButton";
import DownloadButton from "./DownloadButton";
import { FaPlay, FaRegPauseCircle } from "react-icons/fa";
import { useState } from "react";

const TrackListItem = ({ track, tracklist, index, showImage = false }) => {
  const { playSong, currentSong, isPlaying, togglePlayPause } = usePlayer();
  const [isHovered, setIsHovered] = useState(false);
  const isCurrentSong = currentSong?.id === track.id;

  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const activeBg = useColorModeValue("brand.100", "brand.900");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const activeTextColor = useColorModeValue("brand.700", "brand.200");

  const handlePlay = () => {
    // If it's the current song, just toggle play/pause. Otherwise, start the new song.
    if (isCurrentSong) {
      togglePlayPause();
    } else {
      playSong(track, tracklist);
    }
  };

  const formatDuration = (secs) => {
    if (!secs || typeof secs !== "number") return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Flex
      align="center"
      p={2}
      borderRadius="md"
      bg={isCurrentSong ? activeBg : "transparent"}
      _hover={{ bg: isCurrentSong ? activeBg : hoverBg }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      cursor="pointer"
      onClick={handlePlay}
      role="group" // Add group role for hover effects on children
    >
      <HStack spacing={4} flex="1">
        <Box
          w="40px"
          textAlign="center"
          color={isCurrentSong ? activeTextColor : textColor}
        >
          {isCurrentSong && isPlaying ? (
            <Icon as={FaRegPauseCircle} w={5} h={5} />
          ) : isHovered || isCurrentSong ? (
            <Icon as={FaPlay} w={4} h={4} />
          ) : (
            index + 1
          )}
        </Box>
        {showImage && (
          <Image
            src={track.cover}
            boxSize="40px"
            borderRadius="md"
            alt={track.title}
          />
        )}
        <Box flex="1">
          <Text
            fontWeight="bold"
            noOfLines={1}
            color={isCurrentSong ? activeTextColor : "inherit"}
          >
            {track.title}
          </Text>
          <Text fontSize="sm" color={textColor} noOfLines={1}>
            {track.artist}
          </Text>
        </Box>
      </HStack>

      {/* Group the action buttons */}
      <HStack
        spacing={2}
        pr={4}
        // Only show buttons on hover or if it's the active song
        opacity={{ base: 1, md: isHovered || isCurrentSong ? 1 : 0 }}
        transition="opacity 0.2s"
      >
        <FavoriteButton song={track} />
        <DownloadButton song={track} />
      </HStack>

      <Text
        fontSize="sm"
        color={textColor}
        w="50px"
        textAlign="right"
        display={{
          base: "block",
          md: isHovered || isCurrentSong ? "none" : "block",
        }}
      >
        {formatDuration(track.duration)}
      </Text>
    </Flex>
  );
};

export default TrackListItem;
