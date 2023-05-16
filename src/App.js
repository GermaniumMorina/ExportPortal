
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
import { ProductSellTest } from './components/Products/ProductSellTest';
import { Error400 } from './components/Error/400';
import { Error401 } from './components/Error/401';
import { Error403 } from './components/Error/403';
import { Error404 } from './components/Error/404';
import { Error500 } from './components/Error/500';
import { Error502 } from './components/Error/502';
import { Error503 } from './components/Error/503';


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
    },
    {
      path: "/Buy",
      element: <ProductSellTest />,
    },
    {
      path: "/error/400",
      element: < Error400/>,
    },
    {
      path: "/error/401",
      element: < Error401/>,
    },
    {
      path: "/error/403",
      element: < Error403/>,
    },
    {
      path: "/error/404",
      element: < Error404/>,
    },
    {
      path: "/error/500",
      element: < Error500/>,
    },
    {
      path: "/error/502",
      element: < Error502/>,
      
    },
    {
      path: "*",
      element: <Navigate to="/error/404" />,
    },
    {
      path: '/error/503',
      element: <Error503 />,
    }


  
  
];

function App() {
  const routing = useRoutes(routes);

  return <div className="App">{routing}</div>;
}

export default App;
