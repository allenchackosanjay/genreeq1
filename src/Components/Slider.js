import React, { useState, useRef, useEffect } from 'react';

export default function SongPlayer() {
  // Define the list of songs
  const songs = [
    { title: 'Song 1', src: '/song1.mp3' }, // Update this path based on your setup
    { title: 'Song 2', src: '/song2.mp3' },
    { title: 'Song 3', src: '/song3.mp3' }
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Track current song
  const [isPlaying, setIsPlaying] = useState(false); // Track play state
  const [progress, setProgress] = useState(0); // Track progress of the song
  const [currentTime, setCurrentTime] = useState(0); // Track current time of the song
  const [duration, setDuration] = useState(0); // Track total duration of the song
  const audioRef = useRef(null); // Ref to the audio element

  // Play or pause the current song based on state
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.load(); // Force reload of the new audio file
      
      // Set the duration when the metadata is loaded
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };

      if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error('Play was prevented:', error);
          });
        }
      } else {
        audio.pause();
      }
    }
  }, [currentSongIndex, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNext = () => {
    const nextSongIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextSongIndex);
    setProgress(0);
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    const prevSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevSongIndex);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
    const duration = audio.duration;
    setProgress((audio.currentTime / duration) * 100);
  };

  const handleSliderChange = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div style={{
      width: '2000px',
      backgroundColor: '#333', 
      color: '#fff', 
      borderRadius: '20px',
      padding: '20px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      textAlign: 'center',
      margin: '20px auto'
    }}>
      <h2>{songs[currentSongIndex].title}</h2>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      >
        <source src={songs[currentSongIndex].src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Display current time and total time left */}
      <div style={{ marginBottom: '10px' }}>
        <span>{formatTime(currentTime)} / {formatTime(duration - currentTime)}</span>
      </div>

      {/* Slider for song progress */}
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSliderChange}
        style={{ width: '100%', marginBottom: '20px' }}
      />

      {/* Controls */}
      <div>
        <button 
          onClick={handlePrevious} 
          style={{ marginRight: '10px', backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '30px' }}
        >
          &#9664;
        </button>
        <button 
          onClick={handlePlayPause} 
          style={{ marginRight: '10px', backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '30px' }}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button 
          onClick={handleNext} 
          style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '30px' }}
        >
          &#9654;
        </button>
      </div>
    </div>
  );
}
