import { SimpleGrid, Box, Heading, Center, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import SongCard from "../components/SongCard";
import SongCardSkeleton from "../components/SongCardSkeleton";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingSongs = async () => {
      try {
        const res = await fetch("/api/songs/trending");
        const data = await res.json();
        if (res.ok) {
          setSongs(data);
        } else {
          throw new Error(data.error || "Failed to fetch songs");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        // Simulate a slightly longer load time to see the skeletons
        setTimeout(() => setLoading(false), 700);
      }
    };

    fetchTrendingSongs();
  }, []);

  if (loading) {
    return (
      <Box p={6}>
        <Heading fontStyle="italic" mb={6}>
          Trending Songs
        </Heading>
        <SimpleGrid columns={[2, 3, 4, 5, 6]} spacing={6}>
          {Array.from({ length: 12 }).map((_, i) => (
            <SongCardSkeleton key={i} />
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  if (error) {
    return (
      <Center h="50vh">
        <Text color="red.500" fontSize="lg">
          Error: {error}
        </Text>
      </Center>
    );
  }

  return (
    <Box p={6}>
      <Heading fontStyle="italic" mb={6}>
        Trending Songs
      </Heading>
      <SimpleGrid columns={[2, 3, 4, 5, 6]} spacing={6}>
        {songs.length > 0 ? (
          songs.map((song) => <SongCard key={song.id} song={song} />)
        ) : (
          <Text>No songs found.</Text>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
