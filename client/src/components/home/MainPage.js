import React, { useEffect, useState } from "react";
import MainPageNav from "./MainPageNav";
import ChatRoomList from "./ChatRoomList";
import SearchBar from "./SearchBar";
import Chat from "./Chat";
import NewChatRoomForm from "./NewChatRoomForm";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

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
  const socket = io("http://127.0.0.1:5555"); // Replace with your server URL

  useEffect(() => {
    socket.emit("fetch_chat_rooms");

    socket.on("fetched_chat_rooms", (chatRooms) => {
      setRooms(chatRooms);
      console.log("Chat Rooms:", chatRooms);
    });

    socket.on("new_chat_room_created", (newRoom) => {
      setRooms((prevRooms) => [...prevRooms, newRoom]);
    });

    return () => {
      socket.off("fetched_chat_rooms");
      socket.off("new_chat_room_created");
    };
  }, []);

  useEffect(() => {
    const welcomeMessageTimer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 5000);

    return () => {
      clearTimeout(welcomeMessageTimer);
    };
  }, []);

  const toggleComponent = (room) => {
    setSelectedRoom(room);
    setShowComponent(true);
    console.log(room);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  function handleFormSubmit(newRoomData) {
    socket.emit("new_chat_room", newRoomData);
  }

  function handleFormClick() {
    showChatForm((prev) => !prev);
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
      {chatForm && (
        <NewChatRoomForm
          rooms={rooms}
          setRooms={setRooms}
          onFormSubmit={handleFormSubmit}
        />
      )}
      {user && showWelcomeMessage && (
        <div id="welcomeMessage-container">
          <p className="welcomeMessage">Welcome {user.username}</p>
        </div>
      )}
      <ChatRoomList toggleComponent={toggleComponent} rooms={rooms} />
      {showComponent && <Chat room={selectedRoom} user={user} url={url} />}
    </div>
  );
}

export default MainPage;
