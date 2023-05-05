
import './App.css';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import Main from './components/Main';
import { ForgotPassword } from './components/ForgotPassword';
import { useRoutes, Navigate } from "react-router-dom";
import { checkIfLoggedIn } from "./components/checkIfLoggedIn";
import { AddNewCompany } from './components/AddNewCompany.js';
import { AddNewItem } from './components/AddNewItem';

console.log(document.cookie);

const routes = [
  {
    path: "/",
    element: checkIfLoggedIn() ? <Navigate to="/dashboard" /> : <Navigate to="/SignIn" />,
  },
  {
    path: "/dashboard",
    element: <Main /> ,
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },

  {
    path: "/SignUp",
    element:<SignUp />,
  },
  {
    path: "/ForgotPassword",
    element:<ForgotPassword />,
  },
  {
    path: "/AddNewCompany",
    element:<AddNewCompany />,
  },
  {
    path: "/AddNewItem",
    element:<AddNewItem />,
  },
  {
    path: "/Import",
    element: <Import />,
    },
    {
    path: "/ImportItem/:id",
    element: <ImportItem />,
    },
    {
    path: "/Export",
    element: <Export />,
    },
    {
    path: "/ExportItem/:id",
    element: <ExportItem />,
    },
];

function App() {
  const routing = useRoutes(routes);

  return <div className="App">{routing}</div>;
}

export default App;
