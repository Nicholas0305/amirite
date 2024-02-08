import React from "react";
import ChatRoomCard from "./ChatRoomCard";

function ChatRoomList({ rooms, toggleComponent }) {
  return (
    <ul id="chatroomlist">
      {rooms.map((room) => {
        return (
          <ChatRoomCard
            key={room.room_id}
            room={room}
            toggleComponent={toggleComponent}
          />
        );
      })}
    </ul>
  );
}
export default ChatRoomList;
