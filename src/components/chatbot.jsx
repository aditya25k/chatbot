import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Chatbot({ messages, loading }) {
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
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messagesRef}>
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            <p className="text-lg">Welcome to the Chatbot!</p>
            <p className="text-sm">Start a conversation by typing a message below.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
              }`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 max-w-xs lg:max-w-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
