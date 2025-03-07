import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import SongList from './components/SongList';
import { songs } from './data/songs';
import './styles/App.css';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);

    // Load recently played from sessionStorage
    const storedRecent = JSON.parse(sessionStorage.getItem('recentlyPlayed')) || [];
    setRecentlyPlayed(storedRecent);
  }, []);

  const handlePlay = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    
    // Update recently played
    const updatedRecent = [song, ...recentlyPlayed.filter(s => s.id !== song.id)].slice(0, 10);
    setRecentlyPlayed(updatedRecent);
    sessionStorage.setItem('recentlyPlayed', JSON.stringify(updatedRecent));
  };

  return (
    <Container fluid className="app-container">
      <Row>
        <Col md={3} className="sidebar">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </Col>
        <Col md={9} className="main-content">
          <SongList 
            songs={songs}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onPlay={handlePlay}
            favorites={favorites}
            setFavorites={setFavorites}
            activeTab={activeTab}
            recentlyPlayed={recentlyPlayed}
          />
        </Col>
      </Row>
      {currentSong && (
        <div className="music-player-container">
          <MusicPlayer 
            song={currentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </div>
      )}
    </Container>
  );
}

export default App;