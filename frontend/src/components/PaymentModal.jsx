import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  HStack,
  Icon,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { FaShieldAlt } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { authUser, setAuthUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // This is the only real action: call the upgrade endpoint
      const res = await fetch("/api/users/upgrade", { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        setAuthUser(data.user); 
        toast({
          title: "Payment Successful!",
          description: "Congratulations, you are now a Premium member!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose(); 
        navigate("/"); 
      } else {
        throw new Error(data.error || "Failed to upgrade account.");
      }
    } catch (error) {
      toast({
        title: "An Error Occurred",
        description: error.message,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white">
        <ModalHeader>Complete Your Purchase</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text>You are purchasing:</Text>
            <HStack justifyContent="space-between">
              <Text fontWeight="bold">Survana Premium (Lifetime)</Text>
              <Text fontWeight="bold">₹499.00</Text>
            </HStack>
            <Divider />
            <Text>
              Logged in as: <strong>{authUser?.email}</strong>
            </Text>
            <Text fontSize="sm" color="gray.400">
              By completing your purchase, you agree to our Terms of Service.
              This is a one-time payment for a lifetime membership.
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <VStack w="full" spacing={2}>
            <Button
              colorScheme="brand"
              w="full"
              isLoading={isLoading}
              loadingText="Processing..."
              onClick={handlePayment}
            >
              Pay Now
            </Button>
            <HStack fontSize="xs" color="green.300">
              <Icon as={FaShieldAlt} />
              <Text>Secure and Encrypted Payment</Text>
            </HStack>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
