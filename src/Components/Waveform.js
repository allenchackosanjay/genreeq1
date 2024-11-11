// Waveform.js

import React, { useRef, useEffect } from 'react';

export default function Waveform() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  let waveOffset = 0; // Controls the wave animation

  const drawWave = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    const amplitude = 100; // Wave height
    const frequency = 0.5; // Wave frequency
    for (let x = 0; x < width; x++) {
      const y = height / 2 + amplitude * Math.sin(x * frequency + waveOffset);
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = '#5C1690';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const animateWave = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    waveOffset += 0.1; // Adjust speed of the wave by changing this value
    drawWave(ctx, width, height);

    animationRef.current = requestAnimationFrame(animateWave);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 2400; // Canvas width
    canvas.height = 200; // Canvas height

    // Start the animation
    animateWave();

    // Clean up the animation on component unmount
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20px',
    }}>
      <canvas ref={canvasRef} style={{ border: '1px solid #ddd', borderRadius: '10px' }} />
    </div>
  );
}
