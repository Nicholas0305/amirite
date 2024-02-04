import React from 'react'
import ChatRoomCard from './ChatRoomCard'
import { useNavigate,useState } from 'react-router-dom'
function ChatRoomList({rooms, toggleComponent}){
   
    return(
        <ul id='chatroomlist'>
        {rooms.map((room)=>{
            return <ChatRoomCard 
            key={room.room_id}
            room ={room}
            toggleComponent = {toggleComponent}/>
        })}
    </ul>
    )
}
export default ChatRoomList;