import React from "react";
function ChatRoomCard({ room, toggleComponent }) {
  return (
    <div onClick={() => toggleComponent(room)}>
      <li className="card">
        <h1>{room.room_name}</h1>
        <p>{"Created on " + room.created_at}</p>
        {room.participants && <p>{"People: " + room.participants.length}</p>}
      </li>
    </div>
  );
}
export default ChatRoomCard;
