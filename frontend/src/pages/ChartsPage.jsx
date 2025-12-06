import {
  Box,
  Heading,
  VStack,
  useColorModeValue,
  Spinner,
  Center,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import TrackListItem from "../components/TrackListItem";

const ChartsPage = () => {
  const [chart, setChart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardBgColor = useColorModeValue("white", "gray.800");

  useEffect(() => {
    const fetchChart = async () => {
      document.documentElement.scrollTo(0, 0);
      try {
        const res = await fetch("/api/songs/trending");
        const data = await res.json();
        if (res.ok) {
          setChart(data);
        } else {
          throw new Error(data.error || "Failed to fetch chart");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChart();
  }, []);

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

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Heading as="h1" size="2xl" mb={2}>
        Top Trending Songs
      </Heading>
      <Text color="gray.500" mb={8}>
        The most popular tracks right now
      </Text>
      <Box maxW="container.md" mx="auto">
        <Box bg={cardBgColor} p={{ base: 4, md: 6 }} borderRadius="lg" boxShadow="xl">
          <VStack spacing={3} align="stretch">
            {chart.map((track, index) => (
              <TrackListItem
                key={track.id}
                track={track}
                tracklist={chart}
                index={index}
                showImage={true}
              />
            ))}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default ChartsPage;

