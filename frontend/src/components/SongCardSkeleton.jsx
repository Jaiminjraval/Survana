import { Box, Skeleton, SkeletonText, useColorModeValue } from "@chakra-ui/react";

const SongCardSkeleton = () => {
    const bg = useColorModeValue("white", "gray.800");
    return (
        <Box
            p={4}
            bg={bg}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
        >
            <Skeleton height={{ base: "120px", md: "150px" }} borderRadius="md" />
            <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
        </Box>
    );
};

export default SongCardSkeleton;

