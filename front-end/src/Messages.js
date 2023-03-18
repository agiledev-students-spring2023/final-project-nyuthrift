import './Messages.css'
import ProfileList from './ProfileList';

const Messages = () => {
    const profiles = [
        { profileUrl: '/chat', name: "John Doe", imageUrl: 'https://via.placeholder.com/200' }, 
        { profileUrl: '/chat', name: "Jane Doe", imageUrl: 'https://via.placeholder.com/200' },
        { profileUrl: '/chat', name: "Zach Doe", imageUrl: 'https://via.placeholder.com/200' },
        { profileUrl: '/chat', name: "Tom Doe", imageUrl: 'https://via.placeholder.com/200' },
        { profileUrl: '/chat', name: "Zara Doe", imageUrl: 'https://via.placeholder.com/200' }
    ];
   
    return(
        <ProfileList profiles = {profiles} />

    );
};

export default Messages