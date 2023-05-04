import { useRoutes, Navigate } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Companies } from "./components/Companies";
import { AddNewCompany } from "./components/AddNewCompany";
import { ModifyItem } from "./components/ModifyItem";
import { EditItem } from "./components/EditItem";

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
    element: <SignIn />,
  },
  {
    path: "/AddNewCompany",
    element: <AddNewCompany />,
  },
  {
    path: "/ModifyItem",
    element: <ModifyItem/>
  },
  {
    path: "/EditItem",
    element: <EditItem/>
  }
];

function App() {
  const routing = useRoutes(routes);

  return <div className="App">{routing}</div>;
}

export default App;
