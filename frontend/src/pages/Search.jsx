// import { useState } from "react";
// import {
//   Box,
//   Input,
//   IconButton,
//   HStack,
//   Heading,
//   Text,
//   Center,
//   Spinner,
//   SimpleGrid,
//   useToast,
// } from "@chakra-ui/react";
// import { FaSearch } from "react-icons/fa";
// import SongCard from "../components/SongCard";

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   // State to check if a search has been performed
//   const [hasSearched, setHasSearched] = useState(false);
//   const toast = useToast();

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!query.trim()) {
//       toast({
//         title: "Please enter a search term.",
//         status: "warning",
//         duration: 2000,
//         isClosable: true,
//       });
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setHasSearched(true);

//     try {
//       // Use the proxy path to call your backend search endpoint
//       const res = await fetch(`/api/songs/search/${query}`);
//       const data = await res.json();

//       if (res.ok) {
//         setResults(data);
//       } else {
//         throw new Error(data.error || "Something went wrong");
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderContent = () => {
//     if (isLoading) {
//       return (
//         <Center h="50vh">
//           <Spinner size="xl" />
//         </Center>
//       );
//     }

//     if (error) {
//       return (
//         <Center h="50vh">
//           <Text color="red.500">Error: {error}</Text>
//         </Center>
//       );
//     }

//     if (hasSearched && results.length === 0) {
//       return (
//         <Center h="50vh">
//           <Text color="gray.500">No results found for "{query}"</Text>
//         </Center>
//       );
//     }

//     if (results.length > 0) {
//       return (
//         <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} mt={8}>
//           {results.map((song) => (
//             <SongCard key={song.id} song={song} />
//           ))}
//         </SimpleGrid>
//       );
//     }

//     // Initial state before any search is made
//     return (
//       <Center h="50vh">
//         <Text color="gray.500">Please enter a song or artist to begin.</Text>
//       </Center>
//     );
//   };

//   return (
//     <Box p={6}>
//       <Heading fontStyle="italic" mb={6}>
//         Search for Music
//       </Heading>
//       <form onSubmit={handleSearch}>
//         <HStack>
//           <Input
//             placeholder="Search for a song, artist, album..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <IconButton
//             aria-label="Search"
//             icon={<FaSearch />}
//             type="submit"
//             isLoading={isLoading}
//           />
//         </HStack>
//       </form>
//       {renderContent()}
//     </Box>
//   );
// };

// export default Search;

// // // // Below is ok 10-09-2025 // // // //

// import { useState } from "react";
// import {
//   Box,
//   Input,
//   IconButton,
//   HStack,
//   Heading,
//   Text,
//   Center,
//   Spinner,
//   SimpleGrid,
//   useToast,
// } from "@chakra-ui/react";
// import { FaSearch } from "react-icons/fa";
// import SongCard from "../components/SongCard";

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);
//   const toast = useToast();

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!query.trim()) {
//       return toast({
//         title: "Please enter a search term",
//         status: "warning",
//         duration: 2000,
//       });
//     }
//     setIsLoading(true);
//     setHasSearched(true);
//     try {
//       const res = await fetch(`/api/songs/search/${query}`);
//       const data = await res.json();
//       if (res.ok) {
//         setResults(data);
//       } else {
//         throw new Error(data.error || "Search failed");
//       }
//     } catch (error) {
//       toast({ title: "Error", description: error.message, status: "error" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderContent = () => {
//     if (isLoading)
//       return (
//         <Center h="50vh">
//           <Spinner size="xl" />
//         </Center>
//       );
//     if (hasSearched && results.length === 0) {
//       return (
//         <Center h="50vh">
//           <Text color="gray.500">No results found for "{query}"</Text>
//         </Center>
//       );
//     }
//     if (results.length > 0) {
//       return (
//         <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} mt={8}>
//           {results.map((song) => (
//             <SongCard key={song.id} song={song} />
//           ))}
//         </SimpleGrid>
//       );
//     }
//     return (
//       <Center h="50vh">
//         <Text color="gray.500">
//           Search for your favorite songs and artists.
//         </Text>
//       </Center>
//     );
//   };

//   return (
//     <Box p={6}>
//       <Heading fontStyle="italic" mb={6}>
//         Search Music
//       </Heading>
//       <form onSubmit={handleSearch}>
//         <HStack>
//           <Input
//             placeholder="Search for a song or artist..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <IconButton
//             aria-label="Search"
//             icon={<FaSearch />}
//             type="submit"
//             isLoading={isLoading}
//             colorScheme="brand"
//           />
//         </HStack>
//       </form>
//       {renderContent()}
//     </Box>
//   );
// };

// export default Search;

// /////////////////////////////////////////////////////////////////////////////////////           search removing

// import { useState } from "react";
// import {
//   Box,
//   Input,
//   IconButton,
//   HStack,
//   Heading,
//   Text,
//   Center,
//   Spinner,
//   SimpleGrid,
//   useToast,
// } from "@chakra-ui/react";
// import { FaSearch } from "react-icons/fa";
// import SongCard from "../components/SongCard";

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);
//   const toast = useToast();

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!query.trim()) {
//       return toast({
//         title: "Please enter a search term",
//         status: "warning",
//         duration: 2000,
//       });
//     }
//     setIsLoading(true);
//     setHasSearched(true);
//     try {
//       const res = await fetch(`/api/songs/search/${query}`);
//       const data = await res.json();

//       // --- NEW DEBUGGING LINE ---
//       // This shows us what the frontend component is receiving.
//       console.log("Data received on frontend:", data);

//       if (res.ok) {
//         setResults(data);
//       } else {
//         throw new Error(data.error || "Search failed");
//       }
//     } catch (error) {
//       toast({ title: "Error", description: error.message, status: "error" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderContent = () => {
//     if (isLoading)
//       return (
//         <Center h="50vh">
//           <Spinner size="xl" />
//         </Center>
//       );
//     if (hasSearched && results.length === 0) {
//       return (
//         <Center h="50vh">
//           <Text color="gray.500">
//             Results for "{query}" are currently unavailable from our music
//             partner. Please try a different search.
//           </Text>
//         </Center>
//       );
//     }
//     if (results.length > 0) {
//       return (
//         <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} mt={8}>
//           {results.map((song) => (
//             <SongCard key={song.id} song={song} />
//           ))}
//         </SimpleGrid>
//       );
//     }
//     return (
//       <Center h="50vh">
//         <Text color="gray.500">
//           Search for your favorite songs and artists.
//         </Text>
//       </Center>
//     );
//   };

//   return (
//     <Box p={6}>
//       <Heading fontStyle="italic" mb={6}>
//         Search Music
//       </Heading>
//       <form onSubmit={handleSearch}>
//         <HStack>
//           <Input
//             placeholder="Search for a song or artist..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <IconButton
//             aria-label="Search"
//             icon={<FaSearch />}
//             type="submit"
//             isLoading={isLoading}
//             colorScheme="brand"
//           />
//         </HStack>
//       </form>
//       {renderContent()}
//     </Box>
//   );
// };

// export default Search;
