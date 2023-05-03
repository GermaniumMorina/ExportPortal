
import { useRoutes, Navigate } from "react-router-dom";
import {SignUp} from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Companies } from "./components/Companies";
import { AddNewCompany } from "./components/AddNewCompany";



  

    const routes = [
      {
        path: "/",
        element: <SignUp />,
      },
      {
        path: "/Company",
        element: <Companies />,
      },
      {
      path: "/SignIn",
      element: <SignIn />
      },
       {
    path: "/AddNewCompany",
    element: <AddNewCompany />,
  },
    ];

function App() {
  const routing = useRoutes(routes);

  return <div className="App">{routing}</div>;
}

export default App;
