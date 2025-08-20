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

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate(); // 2. Initialize the navigate function
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
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
      console.log("Logging in with:", form);
      setIsLoading(false);
      toast({
        title: "Logged in successfully!",
        status: "success",
        isClosable: true,
      });
      // 3. Navigate to the home page on successful login
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
          Login to Survana
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
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
              Login
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center">
          Don't have an account?{" "}
          {/* 4. Use navigate to switch to the signup page */}
          <Button
            variant="link"
            color="teal.500"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </Text>
      </Box>
    </Center>
  );
};

export default Login;
