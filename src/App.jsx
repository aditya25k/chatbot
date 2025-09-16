import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Chatbot from './components/chatbot.jsx';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';

function ChatApp() {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // Load chat history
      loadChatHistory();
    }
  }, [user]);

  const loadChatHistory = async () => {
    try {
      const response = await axios.get('https://chabotbackend-wsaf.onrender.com/bot/v1/history');
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setChatLoading(true);
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
    setChatLoading(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <Chatbot messages={messages} loading={chatLoading} />
      <Footer
        input={input}
        setInput={setInput}
        handleSend={handleSendMessage}
        loading={chatLoading}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/chat" element={<ChatApp />} />
            <Route path="/" element={<Navigate to="/chat" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
