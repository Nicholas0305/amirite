import React, { useEffect, useState } from 'react';
import MainPageNav from './MainPageNav';
import ChatRoomList from './ChatRoomList'
import SearchBar from './SearchBar'
import Chat from './Chat'
function MainPage() {
    const url = 'http://127.0.0.1:5555'
    const [rooms, setRooms] = useState([]);
    const[selectedRoom,setSelectedRoom] = useState()
    const [search, setSearch] = useState('')
    const [showComponent, setShowComponent] = useState(false);
    useEffect(() => {
        fetch(url + "/chat_rooms")
          .then((res) => res.json())
          .then((chat_rooms) => {
            setRooms(chat_rooms);
            console.log("Chat Rooms:", chat_rooms)
          })
          .catch((error) => console.error("Error fetching data:", error));
      }, []);
  const toggleComponent = (room) => {
    // Update the selectedEmail state, always show EmailBody
    setSelectedRoom(room);
    setShowComponent(true)
    console.log(room)
  }

  const filtered = rooms.filter(room => room.room_name.toUpperCase().includes(search.toUpperCase()))

  const updateSearch = (e) => {
    setSearch(e.target.value)
  }
    return (
        <div id='mainPage-container'>
            <MainPageNav />
            <div id='search-container'><SearchBar search={search} updateSearch={updateSearch}/></div>
            <ChatRoomList  toggleComponent ={toggleComponent} rooms={filtered} />
            {showComponent && <Chat room={selectedRoom}/>}
        </div>
    );
}

export default MainPage;
