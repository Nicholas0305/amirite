import React from "react";

function ChatRoomCard({ room, toggleComponent, user, deleteRoom }) {
  const url = "http://127.0.0.1:5555";
  const isUserOwner = user.user_id === room.user_id;
  const isUserParticipant =
    room.participants.filter(
      (participant) => participant.user_id === user.user_id
    ).length > 0;

  function handleDelete() {
    // Delete the room locally
    deleteRoom(room.room_id);

    // Delete the room on the server
    fetch(`${url}/chat_rooms/${room.room_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Room deleted successfully.");
          // Optionally, you can provide feedback to the user
        } else {
          console.error("Failed to delete room.");
          // Optionally, you can display an error message to the user
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  function addParticipant() {
    fetch(`${url}/room_participants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_id: room.room_id,
        user_id: user.user_id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Joined room successfully.");
        } else {
          console.error("Failed to join room.");
          // Optionally, you can display an error message to the user
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  const handleClick = (e) => {
    // Toggle component only if clicked outside of the delete button
    if (e.target.tagName.toLowerCase() !== "button") {
      if (isUserParticipant) {
        toggleComponent(room);
        console.log(room);
      }
    }
  };

  // Debugging
  console.log("user.user_id:", user.user_id);
  console.log("room.participants:", room.participants);
  console.log("isUserParticipant:", isUserParticipant);

  return (
    <div onClick={handleClick}>
      <li className="card">
        <h3>{room.room_name}</h3>
        <p>{"Description: " + room.description}</p>
        {room.participants && <p>{"People: " + room.participants.length}</p>}
        <p>{"Created on: " + room.created_at}</p>
        <span>
          {isUserOwner && <button onClick={handleDelete}>Delete</button>}
          {!isUserParticipant && (
            <button onClick={addParticipant}>Join room</button>
          )}
        </span>
      </li>
    </div>
  );
}

export default ChatRoomCard;
