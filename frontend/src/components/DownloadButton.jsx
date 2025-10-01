import { IconButton, useToast, Tooltip } from '@chakra-ui/react';
import { FaDownload } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DownloadButton = ({ song }) => {
    const { authUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleDownload = async (e) => {
        e.stopPropagation(); // Stop the song card from playing

        if (authUser?.subscription !== 'premium') {
            toast({
                title: 'Premium Feature',
                description: 'Please upgrade to a premium account to download songs.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            navigate('/premium'); // Redirect to the premium page
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`/api/songs/download/${song.id}`);

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Download failed');
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${song.title} - ${song.artist}.mp3`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();

            toast({ title: 'Download Started!', status: 'success', duration: 2000 });
        } catch (error) {
            toast({ title: 'Download Error', description: error.message, status: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Tooltip label="Download Song" aria-label="Download Song Tooltip">
            <IconButton
                aria-label="Download song"
                icon={<FaDownload />}
                isRound
                size="sm"
                onClick={handleDownload}
                isLoading={isLoading}
                variant="ghost"
                _hover={{ bg: 'whiteAlpha.300' }}
            />
        </Tooltip>
    );
};

export default DownloadButton;

