import App from "./App"
import LoginPage from './components/login/LoginPage'
import MainPage from './components/home/MainPage'
import Audio from './components/Audio'
import Stats from './components/stats/StatsPage'
const routes = [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <LoginPage /> },
        { path: "/MainPage", element: <MainPage /> },
        // {path: '/Chats',element:<Chats/>}
      
      ],
    },
  ];
  
export default routes;