import { SimpleGrid, Box, Heading } from "@chakra-ui/react";
import SongCard from "../components/SongCard";

const Home = () => {
  const dummySongs = [
    {
      id: "song-1",
      title: "Ocean Vibes",
      artist: "DJ Flow",
      cover: "https://picsum.photos/seed/ocean/200",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: "song-2",
      title: "Forest Walk",
      artist: "Nature Sounds",
      cover: "https://picsum.photos/seed/forest/200",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      id: "song-3",
      title: "City Lights",
      artist: "Metro Beats",
      cover: "https://picsum.photos/seed/city/200",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ];

  return (
    // The MainLayout component already provides margins, so we don't need them here.
    <Box p={6}>
      <Heading fontStyle="italic" mb={6}>
        Trending Songs
      </Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
        {dummySongs.map((song) => (
          // Pass the entire song object as a single prop
          <SongCard key={song.id} song={song} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
