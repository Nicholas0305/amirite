// ChatRoomList.js
// List component that renders each chat room card
import React from "react";
import ChatRoomCard from "./ChatRoomCard";

function ChatRoomList({ rooms, handlSelectRoom, user, deleteRoom }) {
  return (
    <ul id="public-rooms-list">
      {rooms.map((room) => {
        return (
          <ChatRoomCard
            key={room.room_id}
            room={room}
            handlSelectRoom={handlSelectRoom}
            user={user}
            deleteRoom={deleteRoom}
            rooms={rooms}
          />
        );
      })}
    </ul>
  );
}
export default ChatRoomList;
