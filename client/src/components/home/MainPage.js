import React, { useEffect, useState } from 'react';
import MainPageNav from './MainPageNav';
import SideBar from './SideBar'
function MainPage() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5555/chat_rooms');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const chatRooms = await response.json();
                setRooms(chatRooms);
                console.log(chatRooms);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run effect only once after initial render

    return (
        <div id='mainPage-container'>
            <MainPageNav />
            <SideBar/>
        </div>
    );
}

export default MainPage;
