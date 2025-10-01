import {
  Box,
  HStack,
  VStack,
  Text,
  IconButton,
  Image,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaStepForward,
  FaStepBackward,
} from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";

const formatTime = (time) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const PlayerBar = () => {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    audioRef,
    setIsPlaying,
    playNext,
    playPrev,
    isNextAvailable,
    isPrevAvailable,
  } = usePlayer();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);

  const playerBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleSongEnd = () => playNext();

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleSongEnd);
    audio.volume = volume;

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, [audioRef, currentSong, playNext, volume]);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  }, [currentSong, audioRef, setIsPlaying]);

  const handleSeek = (value) => {
    if (audioRef.current) audioRef.current.currentTime = value;
  };

  const handleVolumeChange = (value) => {
    if (audioRef.current) audioRef.current.volume = value;
    setVolume(value);
  };

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg={playerBg}
      p={4}
      zIndex={10}
      borderTop="1px solid"
      borderColor={borderColor}
      boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
    >
      <HStack spacing={4} justify="space-between">
        <HStack
          flex={1}
          minW={{ base: "150px", md: "200px" }}
          overflow="hidden"
        >
          {currentSong && (
            <Link as={RouterLink} to={`/album/${currentSong.albumId}`}>
              <Image
                src={currentSong.cover}
                boxSize={{ base: "48px", md: "60px" }}
                borderRadius="md"
                mr={3}
              />
            </Link>
          )}
          <VStack align="flex-start" spacing={0}>
            <Text fontWeight="bold" noOfLines={1}>
              {currentSong?.title || "No Song Playing"}
            </Text>
            {currentSong && (
              <Link
                as={RouterLink}
                to={`/artist/${currentSong.artistId}`}
                _hover={{ textDecoration: "underline" }}
              >
                <Text fontSize="sm" color="gray.500" noOfLines={1}>
                  {currentSong.artist}
                </Text>
              </Link>
            )}
          </VStack>
        </HStack>

        <VStack flex={{ base: 2, md: 1.5 }} spacing={1} maxW="500px">
          <HStack>
            <IconButton
              icon={<FaStepBackward />}
              aria-label="Previous"
              isRound
              onClick={playPrev}
              isDisabled={!isPrevAvailable}
            />
            <IconButton
              aria-label={isPlaying ? "Pause" : "Play"}
              icon={isPlaying ? <FaPause /> : <FaPlay />}
              onClick={togglePlayPause}
              isDisabled={!currentSong}
              isRound
              size="lg"
              colorScheme="brand"
            />
            <IconButton
              icon={<FaStepForward />}
              aria-label="Next"
              isRound
              onClick={playNext}
              isDisabled={!isNextAvailable}
            />
          </HStack>
          <HStack w="100%" spacing={2}>
            <Text fontSize="xs" minW="40px" textAlign="right">
              {formatTime(currentTime)}
            </Text>
            <Slider
              aria-label="seek-slider"
              value={currentTime}
              min={0}
              max={duration || 100}
              onChange={handleSeek}
              isDisabled={!currentSong}
              focusThumbOnChange={false}
              colorScheme="brand"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontSize="xs" minW="40px">
              {formatTime(duration)}
            </Text>
          </HStack>
        </VStack>

        <HStack flex={1} justifyContent="flex-end">
          <Popover placement="top">
            <PopoverTrigger>
              <IconButton
                aria-label="Volume"
                icon={volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
                variant="ghost"
              />
            </PopoverTrigger>
            <PopoverContent w="auto" p={2}>
              <PopoverBody>
                <Slider
                  aria-label="volume-slider"
                  orientation="vertical"
                  h="100px"
                  value={volume}
                  min={0}
                  max={1}
                  step={0.05}
                  onChange={handleVolumeChange}
                  colorScheme="brand"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </HStack>

      <audio
        ref={audioRef}
        src={currentSong?.audio}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default PlayerBar;
