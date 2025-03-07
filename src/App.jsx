import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import MusicPlayer from "./components/MusicPlayer";
import SongList from "./components/SongList";
import { songs } from "./data/songs";
import { MusicContext } from "./context/MusicContext";

function App() {
  const { bgColor } = useContext(MusicContext);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume is 1 (max)

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    // Load recently played from sessionStorage
    const storedRecent =
      JSON.parse(sessionStorage.getItem("recentlyPlayed")) || [];
    setRecentlyPlayed(storedRecent);
  }, []);

  const handlePlay = (song) => {
    setCurrentSong(song);
    setIsPlaying(false);

    // Update recently played
    const updatedRecent = [
      song,
      ...recentlyPlayed.filter((s) => s.id !== song.id),
    ].slice(0, 10);
    setRecentlyPlayed(updatedRecent);
    sessionStorage.setItem("recentlyPlayed", JSON.stringify(updatedRecent));
  };

  return (
    <Container
      fluid
      className="app-container"
      style={{ background: bgColor, transition: "background 0.5s ease" }}
    >
      <Row className="app-row">
        <Col md={3} className="sidebar">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </Col>
        <div className="main-content">
          <SongList
            songs={songs}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onPlay={handlePlay}
            favorites={favorites}
            setFavorites={setFavorites}
            activeTab={activeTab}
            recentlyPlayed={recentlyPlayed}
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
          />
        </div>
        {currentSong && (
          <div className="music-player-container">
            <MusicPlayer
              songsList={songs}
              song={currentSong}
              isPlaying={isPlaying}
              favorites={favorites}
              setFavorites={setFavorites}
              setIsPlaying={setIsPlaying}
              currentSongIndex={currentSongIndex}
              setCurrentSongIndex={setCurrentSongIndex}
            />
          </div>
        )}
      </Row>
    </Container>
  );
}

export default App;
