//MainPage.js
//Main page component that houses all the sub components within the home directory
import React, { useEffect, useState } from "react";
import MainPageNav from "./MainPageNav";
import ChatRoomList from "./ChatRoomList";
import SearchBar from "./SearchBar";
import Chat from "./Chat";
import NewChatRoomForm from "./NewChatRoomForm";
import { useLocation } from "react-router-dom";

function MainPage() {
  const url = "http://127.0.0.1:5555";
  const location = useLocation();
  const user = location.state && location.state.user;
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState();
  const [search, setSearch] = useState("");
  const [showComponent, setShowComponent] = useState(false);
  const [chatForm, showChatForm] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  //Fetches all chat rooms on component mount
  useEffect(() => {
    fetch(url + "/chat_rooms")
      .then((res) => res.json())
      .then((chat_rooms) => {
        setRooms(chat_rooms);
        console.log("Chat Rooms:", chat_rooms);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  //Welcome message for the user, lasts 5 seconds
  useEffect(() => {
    const welcomeMessageTimer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 5000);

    return () => {
      clearTimeout(welcomeMessageTimer);
    };
  }, []);
  //Function that toggles a room if clicked on
  const toggleComponent = (room) => {
    setSelectedRoom(room);
    setShowComponent(true);
    console.log(room);
  };
  //State that allows the chat rooms to be searched
  const filtered = rooms.filter((room) =>
    room.room_name.toUpperCase().includes(search.toUpperCase())
  );
  //Search state
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  //Function that toggles new chat room form
  function handleFormClick() {
    showChatForm((prev) => !prev);
  }
  //Function that allows for the deletion of a chat room
  function deleteRoom(id) {
    const room = filtered.filter((room) => room.room_id !== id);
    setRooms(room);
  }

  return (
    <div id="mainPage-container">
      <MainPageNav user={user} />
      <div id="search-container">
        <SearchBar search={search} updateSearch={updateSearch} />
        <button onClick={handleFormClick} id="toggleFormButton">
          +
        </button>
      </div>
      {chatForm && <NewChatRoomForm rooms={rooms} setRooms={setRooms} />}
      {user && showWelcomeMessage && (
        <div id="welcomeMessage-container">
          <p className="welcomeMessage">Welcome {user.username}</p>
        </div>
      )}
      <ChatRoomList
        toggleComponent={toggleComponent}
        rooms={filtered}
        user={user}
        deleteRoom={deleteRoom}
      />
      {showComponent && <Chat room={selectedRoom} user={user} url={url} />}
    </div>
  );
}

export default MainPage;
