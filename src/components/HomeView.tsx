import React from 'react';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { mockPlaylists, mockAlbums, mockSongs } from '../data/mockData';
import { Song } from '../types';
import { formatTime } from '../utils/helpers';

interface HomeViewProps {
  onPlaySong: (song: Song) => void;
  onViewChange: (view: string) => void;
  onToggleLike: (songId: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onPlaySong, onViewChange, onToggleLike }) => {
  const recentlyPlayed = mockSongs.slice(0, 6);
  const featuredPlaylists = mockPlaylists.slice(0, 6);
  const newReleases = mockAlbums.slice(0, 6);

  return (
    <div className="p-6 pb-32">
      {/* Quick Access */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Good afternoon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredPlaylists.slice(0, 6).map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => onViewChange(`playlist-${playlist.id}`)}
              className="bg-gray-800/50 hover:bg-gray-700/50 rounded-lg p-3 flex items-center space-x-4 cursor-pointer transition-colors group"
            >
              <img
                src={playlist.coverUrl}
                alt={playlist.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-white">{playlist.title}</h3>
                <p className="text-sm text-gray-400">{playlist.songs.length} songs</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlaySong(playlist.songs[0]);
                }}
                className="p-2 rounded-full bg-green-500 hover:bg-green-400 text-black opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Play size={20} fill="currentColor" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Played */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Recently played</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recentlyPlayed.map((song) => (
            <div
              key={song.id}
              className="bg-gray-800/30 hover:bg-gray-700/50 rounded-lg p-4 cursor-pointer transition-colors group"
              onClick={() => onPlaySong(song)}
            >
              <div className="relative mb-4">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-full aspect-square rounded-lg object-cover"
                />
                <button className="absolute bottom-2 right-2 p-3 rounded-full bg-green-500 hover:bg-green-400 text-black opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={20} fill="currentColor" />
                </button>
              </div>
              <h3 className="font-medium text-white truncate">{song.title}</h3>
              <p className="text-sm text-gray-400 truncate">{song.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Made for you</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gray-800/30 hover:bg-gray-700/50 rounded-lg p-4 cursor-pointer transition-colors group"
              onClick={() => onViewChange(`playlist-${playlist.id}`)}
            >
              <div className="relative mb-4">
                <img
                  src={playlist.coverUrl}
                  alt={playlist.title}
                  className="w-full aspect-square rounded-lg object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlaySong(playlist.songs[0]);
                  }}
                  className="absolute bottom-2 right-2 p-3 rounded-full bg-green-500 hover:bg-green-400 text-black opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Play size={20} fill="currentColor" />
                </button>
              </div>
              <h3 className="font-medium text-white truncate">{playlist.title}</h3>
              <p className="text-sm text-gray-400 truncate">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">New releases</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {newReleases.map((album) => (
            <div
              key={album.id}
              className="bg-gray-800/30 hover:bg-gray-700/50 rounded-lg p-4 cursor-pointer transition-colors group"
              onClick={() => onViewChange(`album-${album.id}`)}
            >
              <div className="relative mb-4">
                <img
                  src={album.coverUrl}
                  alt={album.title}
                  className="w-full aspect-square rounded-lg object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlaySong(album.songs[0]);
                  }}
                  className="absolute bottom-2 right-2 p-3 rounded-full bg-green-500 hover:bg-green-400 text-black opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Play size={20} fill="currentColor" />
                </button>
              </div>
              <h3 className="font-medium text-white truncate">{album.title}</h3>
              <p className="text-sm text-gray-400 truncate">{album.artist}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeView;