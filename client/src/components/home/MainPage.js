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

  useEffect(() => {
    fetch(url + "/chat_rooms")
      .then((res) => res.json())
      .then((chat_rooms) => {
        setRooms(chat_rooms);
        console.log("Chat Rooms:", chat_rooms);
      })
      .catch((error) => console.error("Error fetching data:", error));
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

  const filtered = rooms.filter((room) =>
    room.room_name.toUpperCase().includes(search.toUpperCase())
  );

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

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
      {chatForm && <NewChatRoomForm />}
      {user && showWelcomeMessage && (
        <div id="welcomeMessage-container">
          <p className="welcomeMessage">Welcome {user.username}</p>
        </div>
      )}
      <ChatRoomList toggleComponent={toggleComponent} rooms={filtered} />
      {showComponent && <Chat room={selectedRoom} user={user} />}
    </div>
  );
}

export default MainPage;
