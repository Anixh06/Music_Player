import React, { useState, useMemo } from 'react';
import { Search, Play, Heart, MoreHorizontal } from 'lucide-react';
import { mockSongs, mockAlbums, mockArtists, mockGenres } from '../data/mockData';
import { Song } from '../types';
import { formatTime, debounce } from '../utils/helpers';

interface SearchViewProps {
  onPlaySong: (song: Song) => void;
  onViewChange: (view: string) => void;
  onToggleLike: (songId: string) => void;
}

const SearchView: React.FC<SearchViewProps> = ({ onPlaySong, onViewChange, onToggleLike }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return {
        songs: [],
        albums: [],
        artists: [],
        playlists: []
      };
    }

    const query = searchQuery.toLowerCase();
    
    return {
      songs: mockSongs.filter(song => 
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query)
      ),
      albums: mockAlbums.filter(album =>
        album.title.toLowerCase().includes(query) ||
        album.artist.toLowerCase().includes(query)
      ),
      artists: mockArtists.filter(artist =>
        artist.name.toLowerCase().includes(query)
      ),
      playlists: []
    };
  }, [searchQuery]);

  const handleSearch = debounce((query: string) => {
    setSearchQuery(query);
  }, 300);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'songs', label: 'Songs' },
    { id: 'albums', label: 'Albums' },
    { id: 'artists', label: 'Artists' },
  ];

  return (
    <div className="p-6 pb-32">
      {/* Search Header */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {!searchQuery.trim() ? (
        /* Browse Categories */
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockGenres.map((genre) => (
              <div
                key={genre.id}
                className="relative h-32 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
                style={{ backgroundColor: genre.color }}
                onClick={() => onViewChange(`genre-${genre.id}`)}
              >
                <div className="p-4 h-full flex flex-col justify-between">
                  <h3 className="text-white font-bold text-lg">{genre.name}</h3>
                  <img
                    src={genre.imageUrl}
                    alt={genre.name}
                    className="absolute bottom-0 right-0 w-16 h-16 object-cover transform rotate-12 translate-x-2 translate-y-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Search Results */
        <div>
          {/* Search Tabs */}
          <div className="flex space-x-6 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Top Result */}
          {searchResults.songs.length > 0 && (activeTab === 'all' || activeTab === 'songs') && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Top result</h2>
              <div className="bg-gray-800/50 rounded-lg p-6 max-w-md">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={searchResults.songs[0].coverUrl}
                    alt={searchResults.songs[0].title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white">{searchResults.songs[0].title}</h3>
                    <p className="text-gray-400">{searchResults.songs[0].artist}</p>
                  </div>
                </div>
                <button
                  onClick={() => onPlaySong(searchResults.songs[0])}
                  className="p-3 rounded-full bg-green-500 hover:bg-green-400 text-black transition-colors"
                >
                  <Play size={24} fill="currentColor" />
                </button>
              </div>
            </div>
          )}

          {/* Songs Results */}
          {searchResults.songs.length > 0 && (activeTab === 'all' || activeTab === 'songs') && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
              <div className="space-y-2">
                {searchResults.songs.slice(0, activeTab === 'songs' ? 50 : 4).map((song, index) => (
                  <div
                    key={song.id}
                    className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800/50 group cursor-pointer"
                    onClick={() => onPlaySong(song)}
                  >
                    <div className="w-8 text-gray-400 text-sm">
                      {index + 1}
                    </div>
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white truncate">{song.title}</div>
                      <div className="text-sm text-gray-400 truncate">{song.artist}</div>
                    </div>
                    <div className="text-sm text-gray-400">{song.album}</div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(song.id);
                      }}
                      className={`p-2 rounded-full hover:bg-gray-700 transition-colors ${
                        song.isLiked ? 'text-green-500' : 'text-gray-400'
                      }`}
                    >
                      <Heart size={16} fill={song.isLiked ? 'currentColor' : 'none'} />
                    </button>
                    <div className="text-sm text-gray-400">{formatTime(song.duration)}</div>
                    <button className="p-2 rounded-full hover:bg-gray-700 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Albums Results */}
          {searchResults.albums.length > 0 && (activeTab === 'all' || activeTab === 'albums') && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {searchResults.albums.slice(0, activeTab === 'albums' ? 50 : 6).map((album) => (
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
            </div>
          )}

          {/* Artists Results */}
          {searchResults.artists.length > 0 && (activeTab === 'all' || activeTab === 'artists') && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {searchResults.artists.slice(0, activeTab === 'artists' ? 50 : 6).map((artist) => (
                  <div
                    key={artist.id}
                    className="bg-gray-800/30 hover:bg-gray-700/50 rounded-lg p-4 cursor-pointer transition-colors group"
                    onClick={() => onViewChange(`artist-${artist.id}`)}
                  >
                    <div className="relative mb-4">
                      <img
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="w-full aspect-square rounded-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlaySong(artist.topSongs[0]);
                        }}
                        className="absolute bottom-2 right-2 p-3 rounded-full bg-green-500 hover:bg-green-400 text-black opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Play size={20} fill="currentColor" />
                      </button>
                    </div>
                    <h3 className="font-medium text-white truncate">{artist.name}</h3>
                    <p className="text-sm text-gray-400">Artist</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {searchResults.songs.length === 0 && searchResults.albums.length === 0 && searchResults.artists.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-white mb-4">No results found</h2>
              <p className="text-gray-400">Try searching for something else.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchView;