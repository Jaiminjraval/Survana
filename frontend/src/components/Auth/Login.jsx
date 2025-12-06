import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Center,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const formBgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.7)", 
    "rgba(2, 4, 11, 0.7)" 
  );
  const textColor = useColorModeValue("gray.800", "white");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return toast({ title: "Please fill all fields", status: "warning" });
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: "Logged in successfully!", status: "success" });
        window.location.href = "/";
      } else {
        throw new Error(data.error || "Failed to login");
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minH="100vh" w="full">
      <Box
        flex="1"
        display={{ base: "none", md: "block" }}
        bgImage="url('Headphone.avif')" 
        bgSize="cover"
        bgPosition="center"
      />

      <Center flex="1" p={8}>
        <Box
          w="full"
          maxW="md"
          p={8}
          borderRadius="xl"
          boxShadow="2xl"
          bg={formBgColor}
          backdropFilter="blur(10px)" 
          border="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Heading mb={6} textAlign="center" color={textColor}>
            Welcome Back
          </Heading>
          <Text mb={6} textAlign="center" color={textColor} opacity={0.7}>
            Log in to continue your musical journey.
          </Text>
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
                colorScheme="brand"
                type="submit"
                width="full"
                isLoading={isLoading}
              >
                Login
              </Button>
            </VStack>
          </form>
          <Text mt={4} textAlign="center" color={textColor}>
            Don't have an account?{" "}
            <Button
              variant="link"
              color="brand.400"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </Text>
        </Box>
      </Center>
    </Flex>
  );
};

export default Login;
