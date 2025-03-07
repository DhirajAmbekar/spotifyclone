import React, { useContext } from "react";
import { ListGroup, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { MusicContext } from "../context/MusicContext";
import { getDominantColor } from "../utils/getDominantColor";

function SongList({
  songs,
  searchQuery,
  setSearchQuery,
  onPlay,
  favorites,
  activeTab,
  recentlyPlayed,
  setCurrentSongIndex,
}) {
  const { setCurrentSong, setBgColor } = useContext(MusicContext);

  const handleSongClick = async (song) => {
    setCurrentSong(song);
    // Extract dominant color from the song's thumbnail
    const color = await getDominantColor(song.thumbnail);
    setBgColor(color);
  };

  const filteredSongs = () => {
    let songList = songs;
    if (activeTab === "favorites") {
      songList = favorites;
    } else if (activeTab === "recent") {
      songList = recentlyPlayed;
    }
    return songList.filter((song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="section-song-list">
      <div className="section_title">For You</div>
      <div className="search-bar">
        <input
          type="search"
          className="search-input"
          aria-label="Search"
          placeholder="Search Song, Artist"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <g opacity="0.4">
            <path
              d="M25.6668 25.6666L20.6668 20.6666L25.6668 25.6666ZM6.33344 14.6666C6.33344 10.0643 10.0644 6.33331 14.6668 6.33331C19.2692 6.33331 23.0001 10.0643 23.0001 14.6666C23.0001 19.269 19.2692 23 14.6668 23C10.0644 23 6.33344 19.269 6.33344 14.6666Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      </div>
      <ListGroup>
        {filteredSongs().map((song, i) => (
          // <ListGroup.Item
          //   key={song.id}
          //   className="d-flex align-items-center"
          //   onClick={() => handleSongClick(song)}
          // >
          //   <img
          //     src={song.thumbnail}
          //     alt={song.title}
          //     className="song-thumbnail me-3"
          //   />
          //   <div className="flex-grow-1">
          //     <h5>{song.title}</h5>
          //     <p className="mb-0">{song.artistName}</p>
          //   </div>
          //   <div>
          //     <Button variant="link" onClick={() => onPlay(song)}>
          //       <FontAwesomeIcon icon={faPlay} />
          //     </Button>
          //     <Button
          //       variant="link"
          //       onClick={() => toggleFavorite(song)}
          //       className={
          //         favorites.some((fav) => fav.id === song.id)
          //           ? "text-danger"
          //           : ""
          //       }
          //     >
          //       <FontAwesomeIcon icon={faHeart} />
          //     </Button>
          //     <Button variant="link">
          //       <FontAwesomeIcon icon={faEllipsisV} />
          //     </Button>
          //   </div>
          // </ListGroup.Item>
          <div
            className="song-item"
            key={song.id}
            onClick={() => {
              handleSongClick(song);
              onPlay(song);
              setCurrentSongIndex(i);
            }}
          >
            <img
              src={song.thumbnail}
              alt={song.title}
              className="song-thumbnail"
            />
            <div className="song-info">
              <div className="-title">{song.title}</div>
              <div className="-artistname">{song.artistName}</div>
            </div>
            <div className="song-duration">{song.duration}</div>
          </div>
        ))}
      </ListGroup>
    </div>
  );
}

export default SongList;
