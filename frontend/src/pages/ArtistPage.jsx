import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  Spinner,
  Center,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import TrackListItem from "../components/TrackListItem";
import SimilarArtists from "../components/SimilarArtists";

const ArtistPage = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cardBgColor = useColorModeValue("white", "gray.800");

  useEffect(() => {
    const fetchArtistData = async () => {
      document.documentElement.scrollTo(0, 0);
      setLoading(true);
      setError(null);
      try {
        const [artistRes, tracksRes] = await Promise.all([
          fetch(`/api/songs/artist/${artistId}`),
          fetch(`/api/songs/artist/${artistId}/top`),
        ]);

        if (!artistRes.ok || !tracksRes.ok) {
          throw new Error("Failed to fetch artist data");
        }

        const artistData = await artistRes.json();
        const tracksData = await tracksRes.json();

        setArtist(artistData);
        setTopTracks(tracksData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [artistId]);

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

  if (!artist) {
    return (
      <Center h="80vh">
        <Text>Artist not found.</Text>
      </Center>
    );
  }

  return (
    <Box p={{ base: 4, md: 8 }}>
      <VStack spacing={8} align="center" mb={10}>
        <Image
          borderRadius="full"
          boxSize={{ base: "150px", md: "200px" }}
          src={artist.picture_big}
          alt={artist.name}
          boxShadow="2xl"
        />
        <Heading as="h1" size={{ base: "xl", md: "2xl" }}>
          {artist.name}
        </Heading>
        <Text fontSize="lg" color="gray.500">
          {artist.nb_fan.toLocaleString()} fans
        </Text>
      </VStack>

      <Box maxW="container.md" mx="auto">

        <SimilarArtists artistName={artist.name} />
      </Box>
    </Box>
  );
};

export default ArtistPage;
