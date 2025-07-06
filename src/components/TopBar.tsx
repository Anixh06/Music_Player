import React from 'react';
import { ChevronLeft, ChevronRight, User, Bell, Settings } from 'lucide-react';

interface TopBarProps {
  title: string;
  showNavigation?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ title, showNavigation = true }) => {
  return (
    <div className="bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {showNavigation && (
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors">
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button className="p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors">
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>
        )}
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors">
          <Bell size={20} className="text-white" />
        </button>
        <button className="p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors">
          <Settings size={20} className="text-white" />
        </button>
        <button className="flex items-center space-x-2 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors">
          <User size={20} className="text-white" />
          <span className="text-white font-medium">John Doe</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;