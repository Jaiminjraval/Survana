import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  Text,
  useToast,
  Icon,
  Center,
  VStack,
} from "@chakra-ui/react";
import { FaMagic } from "react-icons/fa";
import ArtistAvatar from "./ArtistAvatar";

const SimilarArtists = ({ artistName }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  const handleFetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/similar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistName }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to get recommendations.");
      }
      setRecommendations(data);
      if (data.length === 0) {
        toast({
          title: "Couldn't find any direct matches.",
          description: "AI is smart, but not always perfect!",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      setError(err.message);
      toast({
        title: "An error occurred.",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box mt={10}>
      <Heading as="h3" size="lg" mb={6}>
        Fans Also Like
      </Heading>
      {isLoading ? (
        <Center h="150px">
          <VStack>
            <Spinner />
            <Text mt={2} fontSize="sm" color="gray.500">
              AI is thinking...
            </Text>
          </VStack>
        </Center>
      ) : error ? (
        <Text color="red.500">Error: {error}</Text>
      ) : recommendations.length > 0 ? (
        <HStack spacing={4} overflowX="auto" pb={4}>
          {recommendations.map((artist) => (
            <ArtistAvatar key={artist.id} artist={artist} />
          ))}
        </HStack>
      ) : (
        <Button
          leftIcon={<Icon as={FaMagic} />}
          colorScheme="brand"
          onClick={handleFetchRecommendations}
        >
          Find Similar Artists
        </Button>
      )}
    </Box>
  );
};

export default SimilarArtists;
