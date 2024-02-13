import React, { useState, useEffect } from "react";

function ChatCard({ message, user }) {
  const url = "http://127.0.0.1:5555";
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [userLikes, setUserLikes] = useState(user.likes); // Initialize to 0 if user.likes is undefined
  const [userDislikes, setUserDislikes] = useState(user.dislikes); // Initialize to 0 if user.dislikes is undefined

  useEffect(() => {
    setUserLikes(user.likes);

    setUserDislikes(user.dislikes);
  }, []); // Only re-run the effect if user object changes
  function handleLikes() {
    setUserLikes((prev) => prev + 1);
    updateLikes(userLikes);
    console.log(userLikes);
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
        setLiked(true); // Optionally, update liked state if needed
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
        <button onClick={handleLikes}>Like</button>
        <button onClick={handleDislikes}>Dislike</button>
      </>
      {/* // )} */}
    </li>
  );
}

export default ChatCard;
