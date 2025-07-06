import React from 'react';
import { Play, Heart, MoreHorizontal, Clock, Share } from 'lucide-react';
import { mockPlaylists } from '../data/mockData';
import { Song } from '../types';
import { formatTime, formatNumber } from '../utils/helpers';

interface PlaylistViewProps {
  playlistId: string;
  onPlaySong: (song: Song) => void;
  onToggleLike: (songId: string) => void;
}

const PlaylistView: React.FC<PlaylistViewProps> = ({ playlistId, onPlaySong, onToggleLike }) => {
  const playlist = mockPlaylists.find(p => p.id === playlistId);

  if (!playlist) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Playlist not found</h2>
        <p className="text-gray-400">The playlist you're looking for doesn't exist.</p>
      </div>
    );
  }

  const totalDuration = playlist.songs.reduce((acc, song) => acc + song.duration, 0);

  return (
    <div className="pb-32">
      {/* Playlist Header */}
      <div className="bg-gradient-to-b from-purple-900/80 to-black/40 p-8">
        <div className="flex items-end space-x-6">
          <img
            src={playlist.coverUrl}
            alt={playlist.title}
            className="w-48 h-48 rounded-lg shadow-2xl object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-white/80 uppercase">Playlist</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{playlist.title}</h1>
            <p className="text-gray-300 mb-4">{playlist.description}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="font-medium">Spotify</span>
              <span>•</span>
              <span>{formatNumber(playlist.followers || 0)} followers</span>
              <span>•</span>
              <span>{playlist.songs.length} songs</span>
              <span>•</span>
              <span>{formatTime(Math.floor(totalDuration / 60))}m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Controls */}
      <div className="bg-gradient-to-b from-black/40 to-black p-8">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onPlaySong(playlist.songs[0])}
            className="p-4 rounded-full bg-green-500 hover:bg-green-400 text-black transition-colors"
          >
            <Play size={24} fill="currentColor" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
            <Heart size={32} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
            <Share size={24} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal size={24} />
          </button>
        </div>
      </div>

      {/* Songs List */}
      <div className="px-8">
        {/* Table Header */}
        <div className="flex items-center space-x-4 p-4 border-b border-gray-800 text-sm text-gray-400">
          <div className="w-8">#</div>
          <div className="flex-1">TITLE</div>
          <div className="w-48">ALBUM</div>
          <div className="w-24">DATE ADDED</div>
          <div className="w-16">
            <Clock size={16} />
          </div>
        </div>

        {/* Songs */}
        <div className="space-y-1">
          {playlist.songs.map((song, index) => (
            <div
              key={song.id}
              className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-800/50 group cursor-pointer"
              onClick={() => onPlaySong(song)}
            >
              <div className="w-8 text-gray-400 text-sm">
                <span className="group-hover:hidden">{index + 1}</span>
                <Play size={16} className="hidden group-hover:block" />
              </div>
              <div className="flex items-center space-x-3 flex-1">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="min-w-0">
                  <div className="font-medium text-white truncate">{song.title}</div>
                  <div className="text-sm text-gray-400 truncate">{song.artist}</div>
                </div>
              </div>
              <div className="w-48 text-sm text-gray-400 truncate">{song.album}</div>
              <div className="w-24 text-sm text-gray-400">5 days ago</div>
              <div className="w-16 flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike(song.id);
                  }}
                  className={`p-1 rounded-full hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100 ${
                    song.isLiked ? 'text-green-500' : 'text-gray-400'
                  }`}
                >
                  <Heart size={16} fill={song.isLiked ? 'currentColor' : 'none'} />
                </button>
                <span className="text-sm text-gray-400">{formatTime(song.duration)}</span>
                <button className="p-1 rounded-full hover:bg-gray-700 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistView;