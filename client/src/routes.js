import App from "./App"
import LoginPage from './components/login/LoginPage'
import MainPage from './components/home/MainPage'
import Audio from './components/Audio'
import Stats from './components/stats/StatsPage'
import ChatPage from './components/chats/ChatPage'
const routes = [
    {
      path: "/",
      element: <App />,
      children: [
        {path: "/", element: <LoginPage /> },
        {path: "/MainPage", element: <MainPage /> },
        {path: '/Stats',element:<Stats/>},
        {path: '/chat/:roomId',element:<ChatPage/>}
      
      ],
    },
  ];
  
export default routes;