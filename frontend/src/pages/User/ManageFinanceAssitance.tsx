import { useState, useEffect } from 'react';

import Sidebar from '../../components/User/Sidebar';
import Navbar from '../../components/User/Navbar';
import ChatMessage from '../../components/User/ChatMessage';

const ManageFinanceAssistance = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [userProfile, setUserProfile] = useState<{
    image: string;
    full_name: string;
    email: string;
    password: string;
    address: string;
  } | null>(null);

  // Fetch user profile (for user-specific messages)
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      fetch(`${import.meta.env.VITE_API_URL}/api/user/${userId}`)
        .then(res => res.json())
        .then(data => {
          setUserProfile(data || null);
        })
        .catch(err => {
          console.error('Failed to fetch user profile:', err);
        });
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    // Finance-related keywords
    const financeKeywords = ["finance", "investment", "loan", "mortgage", "debt", "interest", "savings", "stocks", "taxes", "budget", "financial", "economy"];
    
    // Check if the input contains any finance-related keywords
    const isFinanceRelated = financeKeywords.some(keyword => input.toLowerCase().includes(keyword));
  
    if (!isFinanceRelated) {
      // If not a finance-related question, show a message
      const botReplyMessage: { role: 'bot'; content: string } = {
        role: 'bot',
        content: "Please ask a finance-related question.",
      };
      setMessages(prevMessages => [...prevMessages, botReplyMessage]);
      setInput('');
      return;
    }
  
    const userMessage: { role: 'user'; content: string } = {
      role: 'user',
      content: input,
    };
  
    setMessages(prevMessages => [...prevMessages, userMessage]);
  
    try {
      const API_KEY = "AIzaSyCS9TTNTGt9RGDgC5LUwldcmEONzEGrur0";  // Replace with your actual API key
  
      // Construct the request payload for the free model "gemini-2.0-flash"
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: input }],
            },
          ],
        }),
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Extract response text from the candidates array
      const responseText: string = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't understand that.";
  
      const botReplyMessage: { role: 'bot'; content: string } = {
        role: 'bot',
        content: responseText,
      };
  
      setMessages(prevMessages => [...prevMessages, botReplyMessage]);
    } catch (error) {
      console.error('Gemini API error:', error);
  
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'bot', content: "I'm currently facing some issues. Please try again later." },
      ]);
    }
  
    setInput('');
  };
  
  

  return (
    <div>
      <Sidebar />
      <section id="content">
        <Navbar />
        <main>
          <h1 className="title">Chatbot Finance Assistance</h1>
          <ul className="breadcrumbs">
            <li><a href="#">Chatbot Finance Assistance</a></li>
            <li className="divider">/</li>
            <li><a href="#" className="active">Chatbot Finance Assistance</a></li>
          </ul>

          <div className="chatbot-container">
            <div className="chat-area">
              {messages.map((msg, idx) => (
                <ChatMessage key={idx} message={msg} userProfile={userProfile} />
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage}>SEND</button>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default ManageFinanceAssistance;
