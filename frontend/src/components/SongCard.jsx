import {
  Box,
  Text,
  Image,
  useToast,
  Link,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import FavoriteButton from "./FavoriteButton";
import DownloadButton from "./DownloadButton";

const SongCard = ({ song }) => {
  const { playSong } = usePlayer();
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.800");

  const handlePlay = () => {
    playSong(song);
    toast({
      title: `Now Playing`,
      description: `${song.title} by ${song.artist}`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Box
      bg={cardBg}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.2s"
      _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
    >
      <Box position="relative">
        <Link as={RouterLink} to={`/album/${song.albumId}`}>
          <Image
            src={song.cover}
            alt={`${song.title} cover`}
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)" }}
          />
        </Link>
        <Box position="absolute" top={2} right={2} zIndex={1}>
          <FavoriteButton song={song} />
        </Box>
        <Box position="absolute" bottom={2} right={2} zIndex={1}>
          <DownloadButton song={song} />
        </Box>
      </Box>

      <VStack p={4} align="start" spacing={1}>
        <Text
          fontWeight="bold"
          noOfLines={1}
          onClick={handlePlay}
          cursor="pointer"
        >
          {song.title}
        </Text>
        <Link
          as={RouterLink}
          to={`/artist/${song.artistId}`}
          _hover={{ textDecoration: "underline" }}
        >
          <Text fontSize="sm" color="gray.500" noOfLines={1}>
            {song.artist}
          </Text>
        </Link>
      </VStack>
    </Box>
  );
};

export default SongCard;
