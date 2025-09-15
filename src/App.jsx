import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import Chatbot from './components/chatbot.jsx';
import Footer from './components/Footer';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('https://chabotbackend-wsaf.onrender.com/bot/v1/message', {
        text: input
      });

      if (res.status === 200) {
        setMessages([
          ...messages,
          { text: res.data.userMessage, sender: 'user' },
          { text: res.data.botMessage, sender: 'bot' }
        ]);
      }
      console.log(res.data);
    } catch (err) {
      console.log("error sending message:", err);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <div className="app">
      <Navbar />
      <Chatbot messages={messages} />
      <Footer 
        input={input} 
        setInput={setInput} 
        handleSend={handleSendMessage} 
        loading={loading} 
      />
    </div>
  );
}

export default App;
