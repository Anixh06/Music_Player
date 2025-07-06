# Music Player Web Application

## Overview
This project is a modern music player web application built using React and TypeScript. It provides users with an interactive interface to browse, search, and play music tracks, albums, and playlists. The app uses mock data to simulate a music streaming experience.

## Features
- Multiple views including Home, Search, Library, Liked Songs, Playlists, and Downloaded Music.
- Play, pause, skip, and previous controls for music playback.
- Like/unlike songs and view liked songs.
- Browse featured playlists, new releases, and recently played songs.
- Navigate through playlists and albums.
- Responsive UI styled with Tailwind CSS.

## Architecture
- **React Functional Components** with hooks for state management.
- **TypeScript** for type safety and better developer experience.
- **Tailwind CSS** for styling and layout.
- **Component-based structure** with reusable UI components such as Sidebar, TopBar, MusicPlayer, and various view components.

## Key Components
- `App.tsx`: Main application component managing global state and view routing.
- `HomeView.tsx`: Displays featured playlists, recently played songs, and new releases.
- `SearchView.tsx`: Allows searching for songs and playlists (implementation details not covered here).
- `PlaylistView.tsx`: Displays songs within a selected playlist.
- `MusicPlayer.tsx`: Controls music playback including play/pause, next, previous, and like toggling.
- `Sidebar.tsx` and `TopBar.tsx`: Navigation and header components.

## Data Model
The app uses mock data defined in `src/data/mockData.ts` including:
- **Songs**: Each song has id, title, artist, album, duration, cover image URL, like status, play count, and genre.
- **Albums**: Collections of songs with metadata like title, artist, year, cover image, and total duration.
- **Playlists**: User or system-generated playlists with title, description, cover image, songs, and follower count.
- **Artists** and **Genres**: Metadata about artists and music genres.

## Development Setup
- Uses **Vite** as the build tool and development server.
- ESLint and TypeScript configurations for code quality and type checking.
- Tailwind CSS for utility-first styling.

## Future Enhancements
- Implement playlist creation and management.
- Add real backend integration for dynamic data.
- Enhance search functionality.
- Add user authentication and personalized libraries.
- Make all music playable by integrating with music streaming services or backend.

---

This documentation provides a high-level understanding of the project's purpose, structure, and functionality.
