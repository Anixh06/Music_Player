import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle, 
  Volume2, 
  Heart,
  Monitor
} from 'lucide-react';
import { Song } from '../types';
import { formatTime } from '../utils/helpers';

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onToggleLike: (songId: string) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentSong,
  isPlaying,
  onTogglePlayPause,
  onNext,
  onPrevious,
  onToggleLike,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one

  useEffect(() => {
    if (isPlaying && currentSong) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentSong.duration) {
            onNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, currentSong, onNext]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3);
  };

  if (!currentSong) {
    return (
      <div className="bg-gray-900 border-t border-gray-800 p-4">
        <div className="text-center text-gray-400">
          Select a song to start playing
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border-t border-gray-800 p-4">
      <div className="flex items-center justify-between">
        {/* Song Info */}
        <div className="flex items-center space-x-4 w-1/3">
          <img
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className="w-14 h-14 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <div className="font-medium text-white truncate">{currentSong.title}</div>
            <div className="text-sm text-gray-400 truncate">{currentSong.artist}</div>
          </div>
          <button
            onClick={() => onToggleLike(currentSong.id)}
            className={`p-2 rounded-full hover:bg-gray-800 transition-colors ${
              currentSong.isLiked ? 'text-green-500' : 'text-gray-400'
            }`}
          >
            <Heart size={20} fill={currentSong.isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 w-1/3">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleShuffle}
              className={`p-2 rounded-full hover:bg-gray-800 transition-colors ${
                isShuffled ? 'text-green-500' : 'text-gray-400'
              }`}
            >
              <Shuffle size={20} />
            </button>
            <button
              onClick={onPrevious}
              className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <SkipBack size={20} />
            </button>
            <button
              onClick={onTogglePlayPause}
              className="p-3 rounded-full bg-white hover:bg-gray-200 text-black transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={onNext}
              className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <SkipForward size={20} />
            </button>
            <button
              onClick={toggleRepeat}
              className={`p-2 rounded-full hover:bg-gray-800 transition-colors ${
                repeatMode > 0 ? 'text-green-500' : 'text-gray-400'
              }`}
            >
              <Repeat size={20} />
              {repeatMode === 2 && (
                <span className="absolute -mt-1 -mr-1 text-xs bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  1
                </span>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-3 w-full">
            <span className="text-xs text-gray-400 min-w-[35px]">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={currentSong.duration}
              value={currentTime}
              onChange={handleProgressChange}
              className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-gray-400 min-w-[35px]">
              {formatTime(currentSong.duration)}
            </span>
          </div>
        </div>

        {/* Volume and Device Controls */}
        <div className="flex items-center space-x-4 w-1/3 justify-end">
          <button className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
            <Monitor size={20} />
          </button>
          <div className="flex items-center space-x-2">
            <Volume2 size={20} className="text-gray-400" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;