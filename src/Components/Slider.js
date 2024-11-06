import React, { useState, useRef, useEffect } from 'react';

export default function SongPlayer() {
  const songs = [
    { title: 'Song 1', src: '/song1.mp3' },
    { title: 'Song 2', src: '/song2.mp3' },
    { title: 'Song 3', src: '/song3.mp3' }
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showEqualizer, setShowEqualizer] = useState(false);
  const [equalizerSettings, setEqualizerSettings] = useState({
    bass: 50,
    mid: 50,
    treble: 50,
    genre: 'pop'
  });
  
  const frequencies = [63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
  const genres = ['Pop', 'Classic', 'Jazz', 'Rock'];
  
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.load();
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
    setProgress((audio.currentTime / audio.duration) * 100);
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

  const handleEqualizerChange = (frequency, value) => {
    setEqualizerSettings((prevSettings) => ({
      ...prevSettings,
      [frequency]: value
    }));
  };

  const handleGenreChange = (e) => {
    setEqualizerSettings((prevSettings) => ({
      ...prevSettings,
      genre: e.target.value
    }));
  };

  return (
    <div style={{
      width: '2000px',
      backgroundColor: '#333', 
      color: '#fff', 
      borderRadius: '20px',
      padding: '100px',
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

      {/* Equalizer Button */}
      <button
        onClick={() => setShowEqualizer(true)}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#444',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer'
        }}
      >
        Customize
      </button>

      {/* Equalizer Modal */}
      {showEqualizer && (
        <div style={{
          position: 'fixed',
          top: '5%',
          left: '5%',
          width: '90%',
          height: '90%',
          backgroundColor: '#222',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          color: '#fff',
          overflowY: 'auto',
          display: 'flex'
        }}>
          <div style={{ flex: 2, padding: '10px' }}>
            <h3>Frequency Adjustment</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '300px' }}>
              {frequencies.map((freq) => (
                <div key={freq} style={{ textAlign: 'center' }}>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    value={equalizerSettings[freq] || 0}
                    onChange={(e) => handleEqualizerChange(freq, e.target.value)}
                    style={{
                      width: '30px',
                      height: '200px',
                      writingMode: 'bt-lr',
                      WebkitAppearance: 'slider-vertical'
                    }}
                  />
                  <div>{freq} Hz</div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ flex: 1, padding: '10px', borderLeft: '1px solid #555' }}>
            <h3>Genre</h3>
            <div>
              {genres.map((genre) => (
                <label key={genre} style={{ display: 'block', marginBottom: '10px' }}>
                  <input
                    type="radio"
                    name="genre"
                    value={genre.toLowerCase()}
                    checked={equalizerSettings.genre === genre.toLowerCase()}
                    onChange={handleGenreChange}
                  />
                  {genre}
                </label>
              ))}
            </div>
            <button
              onClick={() => setShowEqualizer(false)}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#444',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Save Equalizer Settings
            </button>
          </div>
        </div>
      )}

      {/* Display current time and total time left */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '24px' }}>{formatTime(currentTime)}</span>
        <span style={{ fontSize: '24px' }}>{formatTime(duration)}</span>
      </div>

      {/* Slider for song progress */}
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSliderChange}
        style={{ width: '100%', height: '8px', marginBottom: '20px' }}
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
