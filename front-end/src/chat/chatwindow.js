import React, { useState, useEffect } from 'react';
//import './styles/search_bar.css';
import ProfileList from '../components/ProfileList';

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

const Messages = ({ currentUserId }) => {
  console.log('Messages component loaded.');
  const [messages, setConversations] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(`/api/conversations/${currentUserId}`);
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };
  
    fetchConversations();
  }, []);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = messages.filter((message) => {
      return message.content.toLowerCase().includes(searchValue);
    });
    setFilteredMessages(filteredData);
    console.log("Filtered messages:", filteredData);
  };

  return (
    <>
      <SearchBar handleSearchChange={handleSearchChange} />
      <ProfileList conversations={filteredMessages} currentUserId={currentUserId} />
    </>
  );
};

export default Messages;
