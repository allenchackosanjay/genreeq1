import React, { useState, useEffect } from 'react';

export default function NavBar(props) {
  const [showProfile, setShowProfile] = useState(false);
  const [songs, setSongs] = useState([]);

  // Load saved songs from localStorage when the component mounts
  useEffect(() => {
    const savedSongs = JSON.parse(localStorage.getItem('songs')) || [];
    setSongs(savedSongs);
  }, []);

  // Save songs to localStorage whenever songs state changes
  useEffect(() => {
    localStorage.setItem('songs', JSON.stringify(songs));
  }, [songs]);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newSong = {
        title: file.name,
        src: URL.createObjectURL(file),
      };
      setSongs((prevSongs) => [...prevSongs, newSong]);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#121212' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ color: '#FFFFFF' }}>{props.title}</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <button
              className="btn btn-outline-success"
              onClick={() => setShowProfile(!showProfile)}
            >
              Song Library
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      {showProfile && (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#222',
            color: '#fff',
            position: 'absolute',
            top: '56px', // Just below the navbar (navbar height is typically 56px)
            left: 0,
            right: 0,
            bottom: 0,
            maxHeight: '75vh', // Cover 75% of the page height
            overflowY: 'auto', // Allow scrolling if content exceeds 75% of the page
            zIndex: 1000, // Ensure it's above other content
          }}
        >
          <h3>Saved Songs</h3>
          <ul>
            {songs.map((song, index) => (
              <li key={index}>{song.title}</li>
            ))}
          </ul>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            style={{
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#333',
              color: '#fff',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          />
        </div>
      )}
    </div>
  );
}
