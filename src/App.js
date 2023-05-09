
import './App.css';
import { useRoutes, Navigate } from "react-router-dom";

import { SignIn } from './components/Authentication/SignIn';
import { SignUp } from './components/Authentication/SignUp';
import { ForgotPassword } from './components/Authentication/ForgotPassword';

import Main from './components/Main';



import { AddNewCompany } from './components/Company/AddNewCompany';
import { AddNewItem } from './components/Products/AddNewItem';
import { checkIfLoggedIn } from './components/Authentication/checkIfLoggedIn';
import  Import  from './components/Products/Import';
import  ImportItem  from './components/Products/ImportItem';
import  Export from './components/Products/Export';
import  ExportItem  from './components/Products/ExportItem';
import Companies from './components/Company/Companies';
import Company from './components/Company/Company';
import  CompanyListing from './components/Company/CompanyListing';


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
    {
      path: "/Companies",
      element: <Companies />,
      },
    {
    path: "/Companies/:id",
    element: <Company />,
    },

    {
      path: "/CompanyListing",
      element: <CompanyListing />,
    }
  
  
];

function App() {
  const routing = useRoutes(routes);

  return <div className="App">{routing}</div>;
}

export default App;
