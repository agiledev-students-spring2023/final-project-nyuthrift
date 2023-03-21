import './Messages.css'
import ProfileList from './ProfileList';
import SearchBar from './search_bar';

const Messages = () => {
    const profiles = [
        { profileUrl: '/chat', name: "John Doe", imageUrl: 'https://via.placeholder.com/200' }, 
        { profileUrl: '/chat', name: "Jane Doe", imageUrl: 'https://via.placeholder.com/200' },
        { profileUrl: '/chat', name: "Zach Doe", imageUrl: 'https://via.placeholder.com/200' },
        { profileUrl: '/chat', name: "Tom Doe", imageUrl: 'https://via.placeholder.com/200' },
        { profileUrl: '/chat', name: "Zara Doe", imageUrl: 'https://via.placeholder.com/200' }
    ];
    let search_data = profiles.map((el)=> el.name)
    return(
        <>
         <SearchBar products={search_data}/>
         <ProfileList profiles = {profiles} />
        </>
       

    );
};

export default Messages