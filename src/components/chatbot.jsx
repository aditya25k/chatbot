import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Chatbot({ messages }) {
  const messagesRef = useRef(null);

  useLayoutEffect(() => {
    if (messagesRef.current) {
      // Defer scroll to next tick to ensure DOM is updated
      setTimeout(() => {
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
      }, 0);
    }
  }, [messages]);

  useEffect(() => {
    if (messagesRef.current && messagesRef.current.lastChild) {
      gsap.fromTo(messagesRef.current.lastChild, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [messages]);

  return (
    <div className="chatbot">
      <div className="messages" ref={messagesRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <span className="sender">{msg.sender === 'user' ? 'You' : 'Bot'}:</span> {msg.text}
          </div>
        ))}
      </div>
    </div>
  )
}
