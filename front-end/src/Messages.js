import React, { useState, useEffect } from 'react';
import './styles/search_bar.css';
import ProfileList from './components/ProfileList';

const SearchBar = ({ handleSearchChange }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search Messages"
        onChange={handleSearchChange}
        className="search-bar-input"
      />
    </div>
  );
};

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        const data = await response.json();
        setMessages(data);
        setFilteredMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = messages.filter((message) => {
      return message.content.toLowerCase().includes(searchValue);
    });
    setFilteredMessages(filteredData);
  };

  return (
    <>
      <SearchBar handleSearchChange={handleSearchChange} />
      <ProfileList messages={filteredMessages} />
    </>
  );
};

export default Messages;
