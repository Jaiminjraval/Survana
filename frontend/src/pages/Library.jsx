import {
  Box,
  Center,
  SimpleGrid,
  Heading,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import SongCard from "../components/SongCard";

const Library = () => {
  const { favorites: favoriteIds } = useAuth(); // Get the IDs from context
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      if (favoriteIds.length === 0) {
        setLoading(false);
        setFavoriteSongs([]);
        return;
      }
      try {
        const res = await fetch("/api/songs/favorites");
        const data = await res.json();
        if (res.ok) {
          setFavoriteSongs(data);
        }
      } catch (error) {
        console.error("Failed to fetch favorite songs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteSongs();
  }, [favoriteIds]); 

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={6}>
      <Heading fontStyle="italic" mb={6}>
        Your Favorites
      </Heading>
      {favoriteSongs.length > 0 ? (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          {favoriteSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </SimpleGrid>
      ) : (
        <Center h="50vh">
          <Text fontSize="lg" color="gray.500">
            You haven't added any favorite songs yet.
          </Text>
        </Center>
      )}
    </Box>
  );
};

export default Library;
