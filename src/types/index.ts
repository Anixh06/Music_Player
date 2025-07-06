export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl?: string;
  isLiked?: boolean;
  playCount?: number;
  genre?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  year: number;
  songs: Song[];
  genre: string;
  totalDuration: number;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  songs: Song[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  followers?: number;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  followers: number;
  topSongs: Song[];
  albums: Album[];
  genre: string;
}

export interface Genre {
  id: string;
  name: string;
  color: string;
  imageUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  recentlyPlayed: Song[];
  likedSongs: Song[];
  playlists: Playlist[];
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isShuffled: boolean;
  isRepeated: boolean;
  queue: Song[];
  currentIndex: number;
}