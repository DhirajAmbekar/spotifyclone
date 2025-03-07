import React from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

function SongList({ 
  songs, 
  searchQuery, 
  setSearchQuery, 
  onPlay, 
  favorites, 
  setFavorites, 
  activeTab, 
  recentlyPlayed 
}) {
  const toggleFavorite = (song) => {
    const isFavorite = favorites.some(fav => fav.id === song.id);
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== song.id);
    } else {
      newFavorites = [...favorites, song];
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const filteredSongs = () => {
    let songList = songs;
    if (activeTab === 'favorites') {
      songList = favorites;
    } else if (activeTab === 'recent') {
      songList = recentlyPlayed;
    }
    return songList.filter(song => 
      song.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div>
      <Form.Control
        type="search"
        placeholder="Search songs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-3"
      />
      <ListGroup>
        {filteredSongs().map(song => (
          <ListGroup.Item key={song.id} className="d-flex align-items-center">
            <img 
              src={song.thumbnail} 
              alt={song.title} 
              className="song-thumbnail me-3" 
            />
            <div className="flex-grow-1">
              <h5>{song.title}</h5>
              <p className="mb-0">{song.artistName}</p>
            </div>
            <div>
              <Button variant="link" onClick={() => onPlay(song)}>
                <FontAwesomeIcon icon={faPlay} />
              </Button>
              <Button 
                variant="link" 
                onClick={() => toggleFavorite(song)}
                className={favorites.some(fav => fav.id === song.id) ? 'text-danger' : ''}
              >
                <FontAwesomeIcon icon={faHeart} />
              </Button>
              <Button variant="link">
                <FontAwesomeIcon icon={faEllipsisV} />
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default SongList;