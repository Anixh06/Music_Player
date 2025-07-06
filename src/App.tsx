import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import PlaylistView from './components/PlaylistView';
import MusicPlayer from './components/MusicPlayer';
import { Song } from './types';
import { mockSongs } from './data/mockData';

function App() {
  const [activeView, setActiveView] = useState('home');
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState(mockSongs);

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleTogglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex(song => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % songs.length;
      setCurrentSong(songs[nextIndex]);
    }
  };

  const handlePrevious = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex(song => song.id === currentSong.id);
      const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
      setCurrentSong(songs[prevIndex]);
    }
  };

  const handleToggleLike = (songId: string) => {
    setSongs(prevSongs => 
      prevSongs.map(song => 
        song.id === songId 
          ? { ...song, isLiked: !song.isLiked }
          : song
      )
    );
  };

  const getViewTitle = () => {
    switch (activeView) {
      case 'home':
        return 'Home';
      case 'search':
        return 'Search';
      case 'library':
        return 'Your Library';
      case 'liked-songs':
        return 'Liked Songs';
      case 'create-playlist':
        return 'Create Playlist';
      case 'downloaded':
        return 'Downloaded Music';
      default:
        if (activeView.startsWith('playlist-')) {
          return 'Playlist';
        }
        return 'Music';
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return (
          <HomeView 
            onPlaySong={handlePlaySong}
            onViewChange={setActiveView}
            onToggleLike={handleToggleLike}
          />
        );
      case 'search':
        return (
          <SearchView 
            onPlaySong={handlePlaySong}
            onViewChange={setActiveView}
            onToggleLike={handleToggleLike}
          />
        );
      case 'library':
        return (
          <div className="p-6 pb-32">
            <h2 className="text-2xl font-bold text-white mb-4">Your Library</h2>
            <p className="text-gray-400">Your music library will appear here.</p>
          </div>
        );
      case 'liked-songs':
        return (
          <div className="p-6 pb-32">
            <h2 className="text-2xl font-bold text-white mb-4">Liked Songs</h2>
            <div className="space-y-2">
              {songs.filter(song => song.isLiked).map((song, index) => (
                <div
                  key={song.id}
                  className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800/50 group cursor-pointer"
                  onClick={() => handlePlaySong(song)}
                >
                  <div className="w-8 text-gray-400 text-sm">{index + 1}</div>
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-white">{song.title}</div>
                    <div className="text-sm text-gray-400">{song.artist}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'create-playlist':
        return (
          <div className="p-6 pb-32">
            <h2 className="text-2xl font-bold text-white mb-4">Create Playlist</h2>
            <p className="text-gray-400">Playlist creation feature coming soon.</p>
          </div>
        );
      case 'downloaded':
        return (
          <div className="p-6 pb-32">
            <h2 className="text-2xl font-bold text-white mb-4">Downloaded Music</h2>
            <p className="text-gray-400">Your downloaded music will appear here.</p>
          </div>
        );
      default:
        if (activeView.startsWith('playlist-')) {
          const playlistId = activeView.replace('playlist-', '');
          return (
            <PlaylistView 
              playlistId={playlistId}
              onPlaySong={handlePlaySong}
              onToggleLike={handleToggleLike}
            />
          );
        }
        return (
          <div className="p-6 pb-32">
            <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-gray-400">This feature is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-black text-white overflow-hidden">
      <div className="flex h-full">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar title={getViewTitle()} />
          <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black">
            {renderView()}
          </main>
        </div>
      </div>
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlayPause={handleTogglePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onToggleLike={handleToggleLike}
      />
    </div>
  );
}

export default App;