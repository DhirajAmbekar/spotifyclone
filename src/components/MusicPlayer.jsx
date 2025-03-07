import React, { useRef, useEffect, useState } from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';

function MusicPlayer({ song, isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, song]);

  const handleTimeUpdate = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    setProgress((currentTime / duration) * 100);
  };

  return (
    <Row className="align-items-center">
      <Col md={3}>
        <img src={song.thumbnail} alt={song.title} className="player-thumbnail" />
      </Col>
      <Col md={6}>
        <div className="song-info">
          <h4>{song.title}</h4>
          <p>{song.artistName}</p>
        </div>
        <ProgressBar now={progress} />
        <div className="controls">
          <FontAwesomeIcon icon={faStepBackward} className="control-icon" />
          <FontAwesomeIcon 
            icon={isPlaying ? faPause : faPlay} 
            className="control-icon"
            onClick={() => setIsPlaying(!isPlaying)}
          />
          <FontAwesomeIcon icon={faStepForward} className="control-icon" />
        </div>
        <audio
          ref={audioRef}
          src={song.musicUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      </Col>
    </Row>
  );
}

export default MusicPlayer;