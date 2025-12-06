import { IconButton } from '@chakra-ui/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; 

const FavoriteButton = ({ song }) => {
    const { isFavorite, toggleFavorite } = useAuth();
    const isSongFavorite = isFavorite(song.id);

    const handleToggle = (e) => {
        e.stopPropagation(); 
        toggleFavorite(song.id);
    };

    return (
        <IconButton
            aria-label={isSongFavorite ? 'Remove from favorites' : 'Add to favorites'}
            icon={isSongFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
            isRound
            size="sm"
            onClick={handleToggle}
            variant="ghost"
            _hover={{ bg: 'whiteAlpha.300' }}
        />
    );
};

export default FavoriteButton;