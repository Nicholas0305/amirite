import App from "./App"
import LoginPage from './components/login/LoginPage'
import MainPage from './components/home/MainPage'
import Audio from './components/Audio'
const routes = [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <MainPage /> },
        { path: "/MainPage", element: <MainPage /> },
        // {path: '/Chats',element:<Chats/>}
      
      ],
    },
  ];
  
export default routes;