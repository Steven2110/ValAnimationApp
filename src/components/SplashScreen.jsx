import React, { useState, useEffect } from 'react';

const firstLine = "Distance means so little when someone means so much.";
const secondLine = "Miles apart, close at heart";

export default function SplashScreen({ onComplete }) {
  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState('');
  const [firstVisible, setFirstVisible] = useState(false);
  const [secondVisible, setSecondVisible] = useState(false);
  const [typing, setTyping] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setFirstVisible(true);

    let i = 0;
    const firstTimer = setInterval(() => {
      if (cancelled) return;
      i++;
      setFirstText(firstLine.slice(0, i));
      if (i >= firstLine.length) {
        clearInterval(firstTimer);
        setTimeout(() => {
          if (cancelled) return;
          setSecondVisible(true);
          let j = 0;
          const secondTimer = setInterval(() => {
            if (cancelled) return;
            j++;
            setSecondText(secondLine.slice(0, j));
            if (j >= secondLine.length) {
              clearInterval(secondTimer);
              setTyping(false);
              setTimeout(() => {
                if (cancelled) return;
                setFadeOut(true);
                setTimeout(() => {
                  if (cancelled) return;
                  onComplete();
                }, 1000);
              }, 1500);
            }
          }, 50);
        }, 500);
      }
    }, 50);

    return () => {
      cancelled = true;
      clearInterval(firstTimer);
    };
  }, [onComplete]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : 'fade-in'}`}>
      <div className="splash-content">
        <h1 className="splash-first-line" style={{ opacity: firstVisible ? 1 : 0 }}>
          {firstText}
          {typing && firstText.length > 0 && firstText.length < firstLine.length && (
            <span className="cursor">|</span>
          )}
        </h1>
        <p className="splash-second-line" style={{ opacity: secondVisible ? 1 : 0 }}>
          {secondText}
          {typing && secondVisible && secondText.length > 0 && secondText.length < secondLine.length && (
            <span className="cursor">|</span>
          )}
        </p>
      </div>
    </div>
  );
}
