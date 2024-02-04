import React, { useState, useEffect } from 'react';

function Chat({ room }) {
 



    return (
        <div id='chat-container'>
        <p>Chat Room:{room.room_name}</p>
        </div>
    );
}

export default Chat;
