import React from 'react'

export default function Chatbot({ messages }) {
  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <span className="sender">{msg.sender === 'user' ? 'You' : 'Bot'}:</span> {msg.text}
          </div>
        ))}
      </div>
    </div>
  )
}
