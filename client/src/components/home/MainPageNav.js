import React from 'react'
import { useNavigate } from "react-router-dom";

function MainPageNav(){
    
        const navigate = useNavigate();
      
        const navigateToHome = () => {
          navigate('/')
        };
       
    
    
    
    
    
    return(
       <nav id='navbar'>
        <h1 onClick={navigateToHome}>Amirite</h1>
        
        <button>Chats</button>
        <button>Statistics</button>
        <button></button>
        <button></button>
       
       
       
       </nav>
    )
}
export default MainPageNav;