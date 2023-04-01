import React, { useState } from 'react';
import './search_bar.css';
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
 const profiles = [
   { profileUrl: '/chat', name: "John Doe", imageUrl: 'https://via.placeholder.com/200' },
   { profileUrl: '/chat', name: "Jane Doe", imageUrl: 'https://via.placeholder.com/200' },
   { profileUrl: '/chat', name: "Zach Doe", imageUrl: 'https://via.placeholder.com/200' },
   { profileUrl: '/chat', name: "Tom Doe", imageUrl: 'https://via.placeholder.com/200' },
   { profileUrl: '/chat', name: "Zara Doe", imageUrl: 'https://via.placeholder.com/200' }
 ];
 const [filteredProfiles, setFilteredProfiles] = useState(profiles);


 const handleSearchChange = (event) => {
   const searchValue = event.target.value.toLowerCase();
   const filteredData = profiles.filter((profile) => {
     return profile.name.toLowerCase().includes(searchValue);
   });
   setFilteredProfiles(filteredData);
 };


 return (
   <>
     <SearchBar handleSearchChange={handleSearchChange} />
     <ProfileList profiles={filteredProfiles} />
   </>
 );
};


export default Messages;
