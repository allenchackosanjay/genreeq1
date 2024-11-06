import React, { useEffect, useState } from 'react';

export default function Waveform() {
  const [lines, setLines] = useState([]);
  const lineCount = 30; // Number of lines in the waveform
  const animationDuration = 2; // Animation duration for the wave

  // Generate initial line data
  useEffect(() => {
    const initialLines = Array.from({ length: lineCount }, () => ({
      height: Math.random() * 30 + 10, // Random initial height between 10 and 40
    }));
    setLines(initialLines);
  }, []);

  // Update line heights to create the waveform effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prevLines) =>
        prevLines.map(() => ({
          height: Math.random() * 30 + 10, // Randomize heights for animation
        }))
      );
    }, animationDuration * 500); // Change height every half duration
    return () => clearInterval(interval);
  }, [animationDuration]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000',
        height: '200px',
        width: '100%',
      }}
    >
      {lines.map((line, index) => (
        <div
          key={index}
          style={{
            width: '4px', // Thickness of each line
            height: `${line.height}px`,
            backgroundColor: '#fff',
            margin: '2px',
            animation: `wave ${animationDuration}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      {/* Add keyframes for the wave animation */}
      <style>
        {`
          @keyframes wave {
            0% {
              transform: scaleY(0.8);
            }
            100% {
              transform: scaleY(1.2);
            }
          }
        `}
      </style>
    </div>
  );
}
