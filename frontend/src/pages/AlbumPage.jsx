import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  Spinner,
  Center,
  VStack,
  HStack,
  Link,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import TrackListItem from "../components/TrackListItem";

const AlbumPage = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cardBgColor = useColorModeValue("white", "gray.800");

  useEffect(() => {
    const fetchAlbumData = async () => {
      document.documentElement.scrollTo(0, 0); 
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/songs/album/${albumId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch album data");
        }
        const data = await res.json();
        setAlbum(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [albumId]);

  if (loading) {
    return (
      <Center h="80vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="80vh">
        <Text color="red.500">Error: {error}</Text>
      </Center>
    );
  }

  if (!album) {
    return (
      <Center h="80vh">
        <Text>Album not found.</Text>
      </Center>
    );
  }

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Flex
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 4, md: 8 }}
        align={{ base: "center", md: "flex-start" }}
        maxW="container.lg"
        mx="auto"
        textAlign={{ base: "center", md: "left" }}
      >
        <Image
          boxSize={{ base: "180px", md: "250px" }}
          src={album.cover_big}
          alt={album.title}
          borderRadius="lg"
          boxShadow="2xl"
          mb={{ base: 4, md: 0 }}
          mr={{ base: 0, md: 8 }}
        />
        <VStack align={{ base: "center", md: "flex-start" }} spacing={3}>
          <Heading as="h1" size={{ base: "lg", md: "2xl" }}>
            {album.title}
          </Heading>
          <Link
            as={RouterLink}
            to={`/artist/${album.artist.id}`}
            _hover={{ textDecoration: "underline" }}
          >
            <HStack justify={{ base: "center", md: "flex-start" }}>
              <Image
                src={album.artist.picture_small}
                boxSize="24px"
                borderRadius="full"
              />
              <Text fontSize={{ base: "md", md: "xl" }} fontWeight="bold">
                {album.artist.name}
              </Text>
            </HStack>
          </Link>
          <Text fontSize="md" color="gray.500">
            {new Date(album.release_date).getFullYear()} &bull;{" "}
            {album.nb_tracks} tracks
          </Text>
        </VStack>
      </Flex>

      <Box
        maxW="container.lg"
        mx="auto"
        mt={10}
        bg={cardBgColor}
        p={{ base: 4, md: 6 }}
        borderRadius="lg"
        boxShadow="xl"
      >
        <VStack spacing={3} align="stretch">
          {album.tracks.data.map((track, index) => (
            <TrackListItem
              key={track.id}
              track={track}
              tracklist={album.tracks.data}
              index={index}
            />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default AlbumPage;
