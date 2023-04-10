import './Chat.css'
import React from 'react'
import ChatWindow from './chatwindow'

const Chat = ({contact_name}) => {
    return(
        <div className = "Chat" >
            <div className = "chatWindow" >
                <ChatWindow name={contact_name}/>
            </div>

        </div>


    );
};

export default Chat;