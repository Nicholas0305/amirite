import App from "./App"
const routes = [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <MainPage /> },
        { path: "/Replies", element: <Page /> },
        { path: "/Contacts", element: <ContactsPage /> },
        { path: "/Statistics", element: <StatsPage /> },
        { path: "/Companies", element: <CompaniesPage /> },
      ],
    },
  ];
  
  export default routes;