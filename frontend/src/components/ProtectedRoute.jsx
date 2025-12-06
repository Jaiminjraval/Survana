import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Center, Spinner } from "@chakra-ui/react";

const ProtectedRoute = () => {
  const { authUser, loading } = useAuth();

  if (loading) {
    return (
      <Center h="100vh" bg="gray.900">
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  // If loading is done, check if we have a user. If so, show the page.
  // If not, redirect to the login page.
  return authUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
