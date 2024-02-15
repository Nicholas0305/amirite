//ChatCard.js
import React, { useState, useEffect } from "react";

function ChatCard({ message, user }) {
  const url = "http://127.0.0.1:5555";
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [userLikes, setUserLikes] = useState(user.likes);
  const [userDislikes, setUserDislikes] = useState(user.dislikes);

  useEffect(() => {
    setUserLikes(user.likes);

    setUserDislikes(user.dislikes);
  }, []);
  function handleLikes() {
    setUserLikes((prev) => prev + 1);
    updateLikes(userLikes);
  }
  function handleDislikes() {
    setUserDislikes((prev) => prev + 1);
    updateDislikes(userDislikes);
  }
  function updateLikes(userLikes) {
    fetch(`${url}/users/${message.user_id}`, {
      method: "PATCH",
      body: JSON.stringify({ likes: userLikes + 1 }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLiked(true);
      })
      .catch((error) => console.error("Error:", error));
  }

  function updateDislikes(userDislikes) {
    fetch(`${url}/users/${message.user_id}`, {
      method: "PATCH",
      body: JSON.stringify({ dislikes: userDislikes + 1 }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDisliked(true);
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <li>
      <p>{message.message}</p>
      {/* {!liked && !disliked && ( */}
      <>
        <button className="like-button" onClick={handleLikes}>
          Like
        </button>
        <button className="dislike-button" onClick={handleDislikes}>
          Dislike
        </button>
      </>
      {/* // )} */}
    </li>
  );
}

export default ChatCard;
