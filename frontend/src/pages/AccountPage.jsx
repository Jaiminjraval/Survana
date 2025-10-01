import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useToast,
  useColorModeValue,
  Spinner,
  Center,
  Icon,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { FaCrown, FaUserCircle } from "react-icons/fa";
import { useState } from "react"; 

const AccountPage = () => {
  const { authUser, setAuthUser, loading } = useAuth();
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      const res = await fetch("/api/users/cancel-premium", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        // CHANGE to remember
        // Update the global state with the fresh user data from the server.
        setAuthUser(data);
        toast({
          title: "Subscription Cancelled",
          description: "Your account has been set to the free plan.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error(data.error || "Failed to cancel subscription.");
      }
    } catch (error) {
      toast({ title: "Error", description: error.message, status: "error" });
    } finally {
      setIsCancelling(false);
    }
  };

  if (loading) {
    return (
      <Center h="80vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Center minH="80vh" p={4}>
      <VStack
        spacing={6}
        p={8}
        bg={cardBg}
        borderRadius="xl"
        boxShadow="2xl"
        maxW="md"
        w="full"
        textAlign="center"
      >
        <Icon as={FaUserCircle} w={24} h={24} color="brand.500" />
        <Heading as="h1" size="lg">
          My Account
        </Heading>
        <Text fontSize="xl" fontWeight="bold">
          {authUser?.name}
        </Text>
        <Text fontSize="md" color={textColor}>
          {authUser?.email}
        </Text>
        <Divider />
        <Box>
          <Text fontSize="lg" fontWeight="semibold">
            Subscription Status
          </Text>
          {authUser?.subscription === "premium" ? (
            <HStack justify="center" mt={2}>
              <Icon as={FaCrown} color="yellow.400" />
              <Text color="green.400" fontWeight="bold">
                Premium Member
              </Text>
            </HStack>
          ) : (
            <Text color={textColor} fontWeight="bold">
              Free Plan
            </Text>
          )}
        </Box>
        {authUser?.subscription === "premium" && (
          <Button
            colorScheme="red"
            onClick={handleCancel}
            isLoading={isCancelling}
            loadingText="Cancelling..."
          >
            Cancel Premium Subscription
          </Button>
        )}
      </VStack>
    </Center>
  );
};

export default AccountPage;
