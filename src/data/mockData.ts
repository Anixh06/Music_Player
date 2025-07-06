import { Song, Album, Playlist, Artist, Genre } from '../types';

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    isLiked: true,
    playCount: 1250000,
    genre: 'Pop'
  },
  {
    id: '2',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 174,
    coverUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    isLiked: false,
    playCount: 980000,
    genre: 'Pop'
  },
  {
    id: '3',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 178,
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    isLiked: true,
    playCount: 1450000,
    genre: 'Pop'
  },
  {
    id: '4',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    coverUrl: 'https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=400',
    isLiked: true,
    playCount: 1100000,
    genre: 'Pop'
  },
  {
    id: '5',
    title: 'Stay',
    artist: 'The Kid LAROI, Justin Bieber',
    album: 'Stay',
    duration: 141,
    coverUrl: 'https://images.pexels.com/photos/1644794/pexels-photo-1644794.jpeg?auto=compress&cs=tinysrgb&w=400',
    isLiked: false,
    playCount: 890000,
    genre: 'Hip-Hop'
  },
  {
    id: '6',
    title: 'Anti-Hero',
    artist: 'Taylor Swift',
    album: 'Midnights',
    duration: 200,
    coverUrl: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=400',
    isLiked: true,
    playCount: 1600000,
    genre: 'Pop'
  },
  {
    id: '7',
    title: 'As It Was',
    artist: 'Harry Styles',
    album: 'Harry\'s House',
    duration: 167,
    coverUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    isLiked: true,
    playCount: 1300000,
    genre: 'Pop'
  },
  {
    id: '8',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    duration: 238,
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    isLiked: false,
    playCount: 950000,
    genre: 'Alternative'
  }
];

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'After Hours',
    artist: 'The Weeknd',
    coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: 2020,
    songs: [mockSongs[0]],
    genre: 'Pop',
    totalDuration: 3456
  },
  {
    id: '2',
    title: 'Fine Line',
    artist: 'Harry Styles',
    coverUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: 2019,
    songs: [mockSongs[1]],
    genre: 'Pop',
    totalDuration: 2891
  },
  {
    id: '3',
    title: 'SOUR',
    artist: 'Olivia Rodrigo',
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: 2021,
    songs: [mockSongs[2]],
    genre: 'Pop',
    totalDuration: 2145
  },
  {
    id: '4',
    title: 'Future Nostalgia',
    artist: 'Dua Lipa',
    coverUrl: 'https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: 2020,
    songs: [mockSongs[3]],
    genre: 'Pop',
    totalDuration: 2234
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    title: 'Today\'s Top Hits',
    description: 'The most played songs right now',
    coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    songs: mockSongs.slice(0, 5),
    isPublic: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    followers: 4200000
  },
  {
    id: '2',
    title: 'Chill Vibes',
    description: 'Relaxing music for any time of day',
    coverUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    songs: mockSongs.slice(2, 6),
    isPublic: true,
    createdAt: '2024-01-02',
    updatedAt: '2024-01-14',
    followers: 1800000
  },
  {
    id: '3',
    title: 'My Favorites',
    description: 'Songs I can\'t stop listening to',
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    songs: mockSongs.filter(song => song.isLiked),
    isPublic: false,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-13',
    followers: 0
  }
];

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'The Weeknd',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    followers: 42000000,
    topSongs: [mockSongs[0]],
    albums: [mockAlbums[0]],
    genre: 'Pop'
  },
  {
    id: '2',
    name: 'Harry Styles',
    imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    followers: 38000000,
    topSongs: [mockSongs[1], mockSongs[6]],
    albums: [mockAlbums[1]],
    genre: 'Pop'
  }
];

export const mockGenres: Genre[] = [
  {
    id: '1',
    name: 'Pop',
    color: '#1DB954',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Hip-Hop',
    color: '#E22134',
    imageUrl: 'https://images.pexels.com/photos/1644794/pexels-photo-1644794.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Rock',
    color: '#FF6B35',
    imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'Electronic',
    color: '#8E44AD',
    imageUrl: 'https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    name: 'Jazz',
    color: '#F39C12',
    imageUrl: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '6',
    name: 'Alternative',
    color: '#2ECC71',
    imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];