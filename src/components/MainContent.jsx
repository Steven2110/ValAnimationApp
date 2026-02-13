import React, { useState, useEffect, useRef, useCallback } from 'react';
import LoveParticle from './LoveParticle';

const IMAGE_COUNT = 10;
const fullMessage =
  "Distance means so little when someone means so much. Happy Valentine's Day my love! ❤️";

export default function MainContent() {
  const [particles, setParticles] = useState([]);
  const [currentImage, setCurrentImage] = useState(1);
  const [imageOpacity, setImageOpacity] = useState(0);
  const [messageOpacity, setMessageOpacity] = useState(0);
  const particleId = useRef(0);

  // Spawn particles
  useEffect(() => {
    const interval = setInterval(() => {
      const id = particleId.current++;
      setParticles((prev) => {
        const next = [...prev, { id }];
        return next.length > 50 ? next.slice(-50) : next;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Fade in content on mount
  useEffect(() => {
    requestAnimationFrame(() => {
      setImageOpacity(1);
      setTimeout(() => setMessageOpacity(1), 500);
    });
  }, []);

  // Cycle images every 3s (after initial 3s delay)
  useEffect(() => {
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setImageOpacity(0);
        setTimeout(() => {
          setCurrentImage((prev) => (prev % IMAGE_COUNT) + 1);
          setImageOpacity(1);
        }, 500);
      }, 3000);
    }, 3000);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  const removeParticle = useCallback((id) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <div className="main-content">
      {/* Floating heart particles */}
      <div className="particles-container">
        {particles.map((p) => (
          <LoveParticle key={p.id} id={p.id} onDone={removeParticle} />
        ))}
      </div>

      {/* Centered content */}
      <div className="content-wrapper">
        <div className="spacer" />

        <div className="image-circle" style={{ opacity: imageOpacity }}>
          <img
            src={`${import.meta.env.BASE_URL}images/OurImage${currentImage}.jpg`}
            alt="Our memories"
            draggable={false}
          />
        </div>

        <p className="message" style={{ opacity: messageOpacity }}>
          {fullMessage}
        </p>

        <div className="spacer" />

        <div className="footer">
          <span className="footer-heart">❤️</span>
          <span className="footer-text">Miles apart, close at heart</span>
          <span className="footer-heart">❤️</span>
        </div>
      </div>
    </div>
  );
}
