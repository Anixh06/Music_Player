import React from 'react';
import { Home, Search, Library, Plus, Heart, Download } from 'lucide-react';
import { mockPlaylists } from '../data/mockData';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Your Library', icon: Library },
  ];

  const libraryItems = [
    { id: 'create-playlist', label: 'Create Playlist', icon: Plus },
    { id: 'liked-songs', label: 'Liked Songs', icon: Heart },
    { id: 'downloaded', label: 'Downloaded Music', icon: Download },
  ];

  return (
    <div className="w-64 bg-black text-white h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">Spotify</h1>
      </div>

      {/* Main Navigation */}
      <nav className="px-6 mb-8">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                    activeView === item.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon size={24} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Library Section */}
      <div className="px-6 mb-4">
        <ul className="space-y-2">
          {libraryItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                    activeView === item.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Playlists */}
      <div className="flex-1 px-6 overflow-y-auto">
        <div className="border-t border-gray-800 pt-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Your Playlists
          </h3>
          <ul className="space-y-2">
            {mockPlaylists.map((playlist) => (
              <li key={playlist.id}>
                <button
                  onClick={() => onViewChange(`playlist-${playlist.id}`)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeView === `playlist-${playlist.id}`
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <div className="text-sm font-medium">{playlist.title}</div>
                  <div className="text-xs text-gray-500">{playlist.songs.length} songs</div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;