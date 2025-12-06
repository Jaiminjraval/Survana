import { VStack, Avatar, Text, Link, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const ArtistAvatar = ({ artist }) => {
    const hoverBg = useColorModeValue('gray.100', 'gray.700');

    return (
        <Link
            as={RouterLink}
            to={`/artist/${artist.id}`}
            _hover={{ textDecoration: 'none' }}
        >
            <VStack
                spacing={3}
                p={4}
                borderRadius="lg"
                transition="background 0.2s"
                _hover={{ bg: hoverBg }}
                w="140px"
            >
                <Avatar size="xl" name={artist.name} src={artist.picture} />
                <Text fontWeight="medium" textAlign="center" noOfLines={2}>
                    {artist.name}
                </Text>
            </VStack>
        </Link>
    );
};

export default ArtistAvatar;
