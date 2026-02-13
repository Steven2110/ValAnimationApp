import React, { useState, useRef, useCallback } from 'react';
import SplashScreen from './components/SplashScreen';
import MainContent from './components/MainContent';

function App() {
  const [started, setStarted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const audioRef = useRef(null);

  const handleStart = useCallback(() => {
    if (started) return;
    setStarted(true);

    const audio = new Audio(`${import.meta.env.BASE_URL}power_of_love.mp3`);
    audio.loop = true;
    audio.volume = 0.5;
    audio.play().catch(() => {});
    audioRef.current = audio;

    const handleVisibility = () => {
      if (document.hidden) {
        audio.pause();
      } else {
        audio.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
  }, [started]);

  if (!started) {
    return (
      <div className="screen gradient-bg" onClick={handleStart}>
        <div className="tap-content">
          <div className="tap-heart">❤️</div>
          <p className="tap-text">Tap to begin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="gradient-bg-layer" />
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <MainContent />
      )}
    </div>
  );
}

export default App;
