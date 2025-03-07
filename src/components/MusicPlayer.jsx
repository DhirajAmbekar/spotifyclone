import React, { useRef, useEffect, useState } from "react";
import { Row, Col, ProgressBar, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
} from "@fortawesome/free-solid-svg-icons";

function MusicPlayer({
  songsList,

  isPlaying,
  favorites,
  setFavorites,
  setIsPlaying,
  currentSongIndex,
  setCurrentSongIndex,
}) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume is 1 (max)
  const [showVolumeBar, setShowVolumeBar] = useState(false); // Show/hide volume bar
  const [ctrMenu, setCtrMenu] = useState(false); // Show/hide volume bar
  // const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const song = songsList[currentSongIndex];
  const toggleFavorite = (song) => {
    const isFavorite = favorites.some((fav) => fav.id === song.id);
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((fav) => fav.id !== song.id);
    } else {
      newFavorites = [...favorites, song];
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setProgress(0)
  }, [isPlaying, currentSongIndex]);

  const handleTimeUpdate = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    setProgress((currentTime / duration) * 100);
  };
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };
  // Skip to Next Song
  const handleNextSong = () => {
    if (currentSongIndex < songsList.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0); // Loop back to first song
    }
  };

  // Skip to Previous Song
  const handlePreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      setCurrentSongIndex(songsList.length - 1); // Go to last song
    }
  };
  return (
    <div className="music-player-section">
      <div className="music-player-title">{song.title}</div>
      <div className="music-player-artistname">{song.artistName}</div>
      <img src={song.thumbnail} />
      <ProgressBar now={progress} />
      <audio
        ref={audioRef}
        src={song.musicUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="music-player-controls">
        <div
          className="menu-container"
          onClick={() => {
            setCtrMenu(!ctrMenu);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7.20002 12C7.20002 12.6365 6.94717 13.2469 6.49708 13.697C6.04699 14.1471 5.43654 14.4 4.80002 14.4C4.1635 14.4 3.55306 14.1471 3.10297 13.697C2.65288 13.2469 2.40002 12.6365 2.40002 12C2.40002 11.3635 2.65288 10.753 3.10297 10.3029C3.55306 9.85283 4.1635 9.59998 4.80002 9.59998C5.43654 9.59998 6.04699 9.85283 6.49708 10.3029C6.94717 10.753 7.20002 11.3635 7.20002 12ZM14.4 12C14.4 12.6365 14.1472 13.2469 13.6971 13.697C13.247 14.1471 12.6365 14.4 12 14.4C11.3635 14.4 10.7531 14.1471 10.303 13.697C9.85288 13.2469 9.60002 12.6365 9.60002 12C9.60002 11.3635 9.85288 10.753 10.303 10.3029C10.7531 9.85283 11.3635 9.59998 12 9.59998C12.6365 9.59998 13.247 9.85283 13.6971 10.3029C14.1472 10.753 14.4 11.3635 14.4 12ZM19.2 14.4C19.8365 14.4 20.447 14.1471 20.8971 13.697C21.3472 13.2469 21.6 12.6365 21.6 12C21.6 11.3635 21.3472 10.753 20.8971 10.3029C20.447 9.85283 19.8365 9.59998 19.2 9.59998C18.5635 9.59998 17.9531 9.85283 17.503 10.3029C17.0529 10.753 16.8 11.3635 16.8 12C16.8 12.6365 17.0529 13.2469 17.503 13.697C17.9531 14.1471 18.5635 14.4 19.2 14.4Z"
              fill="white"
            />
          </svg>
          {ctrMenu && (
            <div
              className="menu"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="menu-item" onClick={() => toggleFavorite(song)}>
                <div
                  className={
                    favorites.some((fav) => fav.id === song.id)
                      ? "text-danger"
                      : ""
                  }
                >
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                Favoriate
              </div>
            </div>
          )}
        </div>
        <div onClick={handlePreviousSong}>
          <FontAwesomeIcon color="white" shake={true} icon={faStepBackward} />
        </div>
        <div onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? (
            <FontAwesomeIcon color="white" bounce={true} icon={faPause} />
          ) : (
            <FontAwesomeIcon color="white" shake={true} icon={faPlay} />
          )}
        </div>
        <div onClick={handleNextSong}>
          <FontAwesomeIcon color="white" shake={true} icon={faStepForward} />
        </div>
        <div onClick={() => setShowVolumeBar(!showVolumeBar)}>
          {showVolumeBar && (
            <div className="volume-bar-container">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-bar"
              />
            </div>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.31444 0.478175C9.51743 0.560531 9.6909 0.699934 9.81292 0.87876C9.93495 1.05758 10.0001 1.2678 10 1.48283V14.5303C9.99995 14.7453 9.93476 14.9555 9.81267 15.1342C9.69057 15.313 9.51706 15.4523 9.31406 15.5346C9.11106 15.6169 8.88769 15.6384 8.67218 15.5965C8.45668 15.5545 8.25872 15.451 8.10333 15.299L3.98444 11.2684H1.11111C0.816426 11.2684 0.53381 11.1539 0.325437 10.95C0.117063 10.7461 0 10.4695 0 10.1811V5.83199C0 5.54362 0.117063 5.26706 0.325437 5.06316C0.53381 4.85925 0.816426 4.7447 1.11111 4.7447H3.98444L8.10333 0.714117C8.25871 0.561969 8.45672 0.458341 8.67231 0.416342C8.88789 0.374343 9.11136 0.395862 9.31444 0.478175ZM15.1744 0.318343C15.3828 0.114508 15.6654 0 15.96 0C16.2546 0 16.5372 0.114508 16.7456 0.318343C17.7787 1.32697 18.598 2.52538 19.1565 3.84476C19.715 5.16413 20.0017 6.57848 20 8.00657C20.0017 9.43465 19.715 10.849 19.1565 12.1684C18.598 13.4877 17.7787 14.6862 16.7456 15.6948C16.536 15.8928 16.2553 16.0024 15.964 16C15.6727 15.9975 15.394 15.8831 15.188 15.6815C14.982 15.4799 14.8651 15.2072 14.8626 14.9222C14.86 14.6371 14.972 14.3624 15.1744 14.1574C16.0013 13.3507 16.6569 12.3919 17.1037 11.3363C17.5505 10.2807 17.7796 9.14911 17.7778 8.00657C17.7778 5.60366 16.7844 3.43125 15.1744 1.85577C14.9661 1.65187 14.8491 1.37537 14.8491 1.08706C14.8491 0.798747 14.9661 0.52224 15.1744 0.318343ZM12.0311 3.3932C12.1343 3.2921 12.2568 3.21191 12.3917 3.15719C12.5266 3.10247 12.6712 3.07431 12.8172 3.07431C12.9632 3.07431 13.1078 3.10247 13.2427 3.15719C13.3776 3.21191 13.5001 3.2921 13.6033 3.3932C14.2232 3.99845 14.7148 4.71759 15.0498 5.50929C15.3848 6.30099 15.5567 7.14967 15.5556 8.00657C15.5566 8.86345 15.3847 9.71211 15.0497 10.5038C14.7147 11.2955 14.2232 12.0146 13.6033 12.6199C13.3948 12.824 13.1121 12.9386 12.8172 12.9386C12.5224 12.9386 12.2396 12.824 12.0311 12.6199C11.8226 12.4159 11.7055 12.1392 11.7055 11.8507C11.7055 11.5621 11.8226 11.2854 12.0311 11.0814C12.4446 10.6782 12.7726 10.199 12.9961 9.67127C13.2196 9.14356 13.3342 8.5778 13.3333 8.00657C13.3342 7.43532 13.2196 6.86955 12.9962 6.34183C12.7727 5.8141 12.4447 5.33487 12.0311 4.93171C11.9278 4.83073 11.8458 4.71082 11.7899 4.57882C11.734 4.44683 11.7052 4.30534 11.7052 4.16245C11.7052 4.01957 11.734 3.87808 11.7899 3.74609C11.8458 3.61409 11.9278 3.49418 12.0311 3.3932Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
