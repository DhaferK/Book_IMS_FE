import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string, sender: 'user' | 'bot' }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() !== '') {
      const userMessage = { text: input, sender: 'user' as const };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input, session_id: '1' }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response from the bot');
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder('utf-8');
        let botMessage = '';

        while (true) {
          const { done, value } = await reader!.read();
          if (done) break;
          botMessage += decoder.decode(value, { stream: true });
          setMessages(prevMessages => [
            ...prevMessages.filter(m => m.sender !== 'bot'),
            { text: botMessage, sender: 'bot' as const }
          ]);
        }

        setMessages(prevMessages => [
          ...prevMessages.filter(m => m.sender !== 'bot'),
          { text: botMessage, sender: 'bot' as const }
        ]);
      } catch (error) {
        console.error('Error fetching bot response:', error);
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'Failed to fetch response from the bot.', sender: 'bot' as const }
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2 className="chatbot-title">AI ChatBot</h2>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message-bubble ${message.sender}`}>
            {message.text}
          </div>
        ))}
        {loading && (
          <div className="message-bubble bot typing">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input-container">
        <input 
          type="text" 
          className="chatbot-input" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Insert text" 
        />
        <button onClick={handleSendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
