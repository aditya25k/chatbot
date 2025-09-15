import React, { useRef } from 'react';
import gsap from 'gsap';

const Footer = ({ input, setInput, handleSend, loading }) => {
  const inputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSend();
    }
  };

  const handleFocus = () => {
    gsap.to(inputRef.current, { boxShadow: '0 0 10px #667eea', duration: 0.3 });
  };

  const handleBlur = () => {
    gsap.to(inputRef.current, { boxShadow: '0 0 5px rgba(118, 75, 162, 0.7)', duration: 0.3 });
  };

  return (
    <footer className="footer">
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Enter your query..."
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading || !input.trim()}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
