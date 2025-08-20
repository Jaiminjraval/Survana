import { Box, Text, Image, useToast } from "@chakra-ui/react";
import { usePlayer } from "../context/PlayerContext"; // Import our custom hook

// The component now receives a single `song` object prop
const SongCard = ({ song }) => {
  const { playSong } = usePlayer(); // Get the playSong function from context
  const toast = useToast();

  const handlePlay = () => {
    playSong(song); // Set the current song in the global context
    toast({
      title: `Now Playing`,
      description: `${song.title} by ${song.artist}`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Box
      p={4}
      bg="gray.800"
      borderRadius="lg"
      color="white"
      cursor="pointer"
      onClick={handlePlay}
      transition="background 0.2s"
      _hover={{ bg: "gray.700" }}
    >
      <Image
        src={song.cover}
        borderRadius="md"
        mb={4}
        alt={`${song.title} cover`}
      />
      <Text fontWeight="bold" noOfLines={1}>
        {song.title}
      </Text>
      <Text fontSize="sm" color="gray.400" noOfLines={1}>
        {song.artist}
      </Text>
      {/* The <audio> tag has been removed from here! */}
    </Box>
  );
};

export default SongCard;
