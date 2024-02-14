// ChatRoomList.js
// List component that renders each chat room card
import React from "react";
import ChatRoomCard from "./ChatRoomCard";

function ChatRoomList({ rooms, toggleComponent, user, deleteRoom }) {
  return (
    <ul id="chatroomlist">
      {rooms.map((room) => {
        return (
          <ChatRoomCard
            key={room.room_id}
            room={room}
            toggleComponent={toggleComponent}
            user={user}
            deleteRoom={deleteRoom}
          />
        );
      })}
    </ul>
  );
}
export default ChatRoomList;
