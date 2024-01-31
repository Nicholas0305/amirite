import React from 'react'
import {useNavigate} from 'react-router-dom'
function StatsNav(){
    const navigate = useNavigate();
      
        const navigateToHome = () => {
          navigate('/MainPage')
        };
        const navigateToStats = () => {
            navigate('/Stats')
          };
    
        return(
       <nav className='navbar'>
        <h1 onClick={navigateToHome}>Amirite</h1>
        <button onClick={navigateToStats}>Statistics</button>
        <button></button>
        <button></button>
       
       
       
       </nav>
    )
}
export default StatsNav;