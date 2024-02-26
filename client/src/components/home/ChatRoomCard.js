import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
function ChatRoomCard({ room, toggleComponent, user, deleteRoom, rooms }) {
  const url = "http://127.0.0.1:5555";
  const [isUserOwner, setIsUserOwner] = useState(false); // State for checking if user is the owner of the room
  const [isUserParticipant, setIsUserParticipant] = useState(false);

  //Checks if the user is the owner of the room when the component mounts
  useEffect(() => {
    checkUserParticipant();
    checkUserOwner();
    console.log("hi");
  }, []);

  // Function that checks if the user is a participant of the room
  function checkUserParticipant() {
    if (user && user.user_id && room && room.participants) {
      const userIsParticipant = room.participants.some(
        (participant) => participant.user_id === user.user_id
      );
      setIsUserParticipant(userIsParticipant);
    } else {
      setIsUserParticipant(false);
    }
  }

  // Function that checks if the user is the owner of the room
  function checkUserOwner() {
    setIsUserOwner(user.user_id === room.user_id);
  }

  // Function that handles the deletion of a room
  function handleDelete() {
    deleteRoom(room.room_id);

    fetch(`${url}/chat_rooms/${room.room_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Room deleted successfully.");
        } else {
          console.error("Failed to delete room.");
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  // Function that handles the addition of a new participant
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
          setIsUserParticipant(true);
          return response;
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  // Function that handles the toggle of the chat room, managed via room state
  const handleClick = (e) => {
    // Toggle component only if clicked outside of the delete button
    if (e.target.tagName.toLowerCase() !== "button") {
      toggleComponent(room);
    }
  };

  return (
    <div onClick={handleClick}>
      <li className="card">
        <h3>{room.room_name}</h3>
        <p>{"Description: " + room.description}</p>
        {room.participants && <p>{"People: " + room.participants.length}</p>}
        <p>{"Created on: " + room.created_at}</p>
        <span>
          {isUserOwner && (
            <span>
              <FontAwesomeIcon
                title="Delete Room"
                id="delete-room-button"
                onClick={handleDelete}
                icon={faTrashAlt}
              />
              <FontAwesomeIcon
                title="Edit Room"
                className="edit-button"
                icon={faEdit}
              />
            </span>
          )}
          {!isUserOwner && !isUserParticipant && (
            <FontAwesomeIcon
              title="Join Room"
              onClick={addParticipant}
              id="join-room-button"
              icon={faUserPlus}
            />
          )}
        </span>
      </li>
    </div>
  );
}

export default ChatRoomCard;
