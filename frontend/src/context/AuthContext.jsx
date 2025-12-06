import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const toast = useToast();

  // This effect runs once when the app loads to check if the user has a valid session cookie
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const res = await fetch("/api/auth/me"); // A new endpoint to get the current user
        const data = await res.json();
        if (res.ok) {
          setAuthUser(data);
          setFavorites(data.favorites || []);
        }
      } catch (error) {
        // If this fails, it's okay. It just means the user is not logged in.
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

  const isFavorite = (songId) => {
    return favorites.includes(Number(songId));
  };

  const toggleFavorite = async (songId) => {
    if (!authUser) {
      return toast({
        title: "Please login to add favorites",
        status: "warning",
      });
    }
    try {
      const res = await fetch(`/api/songs/like/${songId}`, { method: "POST" });
      if (res.ok) {
        const songIdNum = Number(songId);
        if (isFavorite(songIdNum)) {
          setFavorites(favorites.filter((id) => id !== songIdNum));
          toast({
            title: "Removed from favorites",
            status: "info",
            duration: 2000,
          });
        } else {
          setFavorites([...favorites, songIdNum]);
          toast({
            title: "Added to favorites",
            status: "success",
            duration: 2000,
          });
        }
      }
    } catch (error) {
      toast({ title: "Error", description: error.message, status: "error" });
    }
  };

  // The setAuthUser function is now passed in the value so other components can update the global state
  const value = {
    authUser,
    loading,
    favorites,
    isFavorite,
    toggleFavorite,
    setAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
