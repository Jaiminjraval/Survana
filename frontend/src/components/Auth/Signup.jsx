import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate(); // 2. Initialize the navigate function
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Creating account with:", form);
      setIsLoading(false);
      toast({ title: "Account created!", status: "success", isClosable: true });
      // 3. Navigate to the home page on successful signup
      navigate("/");
    }, 1500);
  };

  return (
    <Center h="100vh" bg="gray.900">
      <Box
        maxW="sm"
        w="full"
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="gray.800"
      >
        <Heading mb={6} textAlign="center">
          Sign Up for Survana
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={form.name}
            />
            <Input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
            />
            <Button
              colorScheme="teal"
              type="submit"
              width="full"
              isLoading={isLoading}
            >
              Sign Up
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center">
          Already have an account?{" "}
          {/* 4. Use navigate to switch to the login page */}
          <Button
            variant="link"
            color="teal.500"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Text>
      </Box>
    </Center>
  );
};

export default Signup;
