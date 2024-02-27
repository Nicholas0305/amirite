import App from "./App";
import LoginPage from "./components/login/LoginPage";
import MainPage from "./components/home/MainPage";
import Audio from "./components/Audio";
import Stats from "./components/stats/StatsPage";
import RegisterPage from "./components/register/RegisterPage";
import LeaderboardsPage from "./components/leaderboards/LeaderboardsPage";
import UpdatePage from "./updates/UpdatePage";
import WelcomePage from "./components/welcome/WelcomePage";
import Room from "./components/room/Room";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <WelcomePage /> },
      { path: "/Login", element: <LoginPage /> },
      { path: "/Register", element: <RegisterPage /> },
      { path: "/MainPage", element: <MainPage /> },
      { path: "/Room", element: <Room /> },
      { path: "/Stats", element: <Stats /> },
      { path: "/Leaderboards", element: <LeaderboardsPage /> },
      { path: "/about", element: <UpdatePage /> },
    ],
  },
];

export default routes;
