import React, { useState, useEffect } from 'react';

declare global {
  interface Window {
    openSantaInterface: () => void;
  }
}

export default function App() {
  const [showSantaChat, setShowSantaChat] = useState(false);

  // Store callback for Three.js scripts
  useEffect(() => {
    window.openSantaInterface = () => setShowSantaChat(true);
  }, []);

  return (
    <>
      {showSantaChat && (
        <div className="santa-modal open">
          <div className="santa-modal-content">
            <button
              className="santa-modal-close"
              onClick={() => setShowSantaChat(false)}
            >
              ✕
            </button>
            <iframe
              src="http://localhost:5175"
              className="santa-iframe"
              title="Santa's Gift Assistant"
            />
          </div>
        </div>
      )}
      <ThreeJsScene />
    </>
  );
}

function ThreeJsScene() {
  React.useEffect(() => {
    // Dynamically load the Three.js scripts
    const script1 = document.createElement('script');
    script1.type = 'module';
    script1.src = '/script.js';
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'module';
    script2.src = '/christmas-button.js';
    document.body.appendChild(script2);

    return () => {
      script1.remove();
      script2.remove();
    };
  }, []);

  return <main className="layout" />;
}
