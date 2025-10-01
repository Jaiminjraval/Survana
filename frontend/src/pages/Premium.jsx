import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useDisclosure,
  Center,
  List,
  ListItem,
  ListIcon,
  Icon,
} from "@chakra-ui/react";
import { FaCrown, FaCheckCircle } from "react-icons/fa";
import PaymentModal from "../components/PaymentModal"; 

const PremiumPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); 

  return (
    <>
      <Center minH="80vh" p={4}>
        <VStack
          spacing={8}
          p={10}
          bgGradient="linear(to-b, brand.700, brand.900)"
          borderRadius="xl"
          boxShadow="2xl"
          maxW="md"
          w="full"
          textAlign="center"
          color="white"
        >
          <Icon as={FaCrown} w={24} h={24} color="yellow.400" />
          <Heading as="h1" size="2xl">
            Go Premium
          </Heading>
          <Text fontSize="lg" opacity={0.8}>
            Unlock exclusive features and enjoy an enhanced listening
            experience.
          </Text>
          <List spacing={3} textAlign="left" w="full" px={6}>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.400" />
              Download unlimited songs (simulation)
            </ListItem>
            
          </List>
          <Button
            colorScheme="yellow"
            size="lg"
            onClick={onOpen} 
            w="full"
            rightIcon={<Icon as={FaCrown} />}
          >
            Upgrade Now for ₹499
          </Button>
        </VStack>
      </Center>

      {/* The modal is rendered here but only visible when isOpen is true */}
      <PaymentModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PremiumPage;
