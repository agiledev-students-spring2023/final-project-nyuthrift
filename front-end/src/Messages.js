import React, { useState, useEffect } from 'react';
import './styles/search_bar.css';
import ProfileList from './ProfileList';

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
  console.log('Messages component loaded.');
  const [conversations, setConversations] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [userId, setUserId] = useState(null); // add state variable for userId

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/conversations/`, {credentials: 'include',});
        const { conversations, userId } = await response.json(); // extract userId from JSON response
        setConversations(conversations);
        setUserId(userId); // store userId in state variable
        console.log('messages userId:' , userId);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };
  
    fetchConversations();
  }, []);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = conversations.filter((message) => {
      return message.content.toLowerCase().includes(searchValue);
    });
    setFilteredMessages(filteredData);
    console.log("Filtered messages:", filteredData);
  };

  return (
    <>
      <SearchBar handleSearchChange={handleSearchChange} />
      <ProfileList conversations={conversations} userId={userId} />


    </>
  );
};

export default Messages;
