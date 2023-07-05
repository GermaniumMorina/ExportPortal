import "./App.css";
import { useRoutes, Navigate } from "react-router-dom";
import { SignIn } from "./components/Authentication/SignIn";
import { SignUp } from "./components/Authentication/SignUp";
import { ForgotPassword } from "./components/Authentication/ForgotPassword";
import NavBar from "./components/Navigation/NavBar";
import Main from "./components/Main";
import { AddNewCompany } from "./components/Company/AddNewCompany";
import { AddNewItem } from "./components/Products/NewProductForm/AddNewItem";
import Import from "./components/Products/Import/Import";
import ImportItem from "./components/Products/Import/ImportItem";
import Export from "./components/Products/Export/Export";
import ExportItem from "./components/Products/Export/ExportItem";
import Companies from "./components/Company/Companies";
import Company from "./components/Company/Company";
import { Error400 } from "./components/Error/400";
import { Error401 } from "./components/Error/401";
import { Error403 } from "./components/Error/403";
import { Error404 } from "./components/Error/404";
import { Error500 } from "./components/Error/500";
import { Error502 } from "./components/Error/502";
import { Error503 } from "./components/Error/503";
import Footer from "./components/Footer/Footer";
import { Support } from "./components/Support/Support";
import NewsletterCreator from "./components/Admin/NewsletterCreator";
import { Marketplace } from "./components/Marketplace/Marketplace";
import AlertTest from "./components/TestPages/AlertTest";
import { ContactFrom } from "./components/Contact/ContactFrom";
import Navigation from "./components/CorporatePage/Navigation";
import MainCorporatePage from "./components/CorporatePage/MainCorporatePage";
import AllProduct from "./components/Products/AllProducts/AllProduct";
import Admin from "./components/Admin/Admin";
import SuccesStories from "./components/Admin/SuccesStories";
import ContactUs from "./components/ContactUs/ContactUs";
import Stories from "./components/SuccesStories/Stories";
import Account from "./components/ProfileManagment/Account";
import ImageComponent from './components/Products/NewProductForm/ImageComponent';
import axios from "axios";
import Summary from "./components/Summary/Summary";
import CreateAnnouncements from "./components/Admin/CreateAnnouncements";
import FindCompanies from "./components/Admin/FindCompanies";
import ManageCompanies from "./components/Admin/ManageCompanies";
import UserSearch from "./components/Admin/UserSearch";
import ManageUser from "./components/Admin/ManageUser";
import SelectChat from "./components/Chat/SelectChat";
import ChatIcon from "./components/Chat/ChatIcon";
axios.defaults.withCredentials = true;
console.log(document.cookie);

const routes = [
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/dashboard",
    element: <Main />,
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },

  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/ForgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/AddNewCompany",
    element: <AddNewCompany />,
  },
  {
    path: "/AddNewItem",
    element: <AddNewItem />,
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
    path: "/error/400",
    element: <Error400 />,
  },
  {
    path: "/error/401",
    element: <Error401 />,
  },
  {
    path: "/error/403",
    element: <Error403 />,
  },
  {
    path: "/error/404",
    element: <Error404 />,
  },
  {
    path: "/error/500",
    element: <Error500 />,
  },
  {
    path: "/error/502",
    element: <Error502 />,
  },
  {
    path: "*",
    element: <Navigate to="/error/404" />,
  },
  {
    path: "/error/503",
    element: <Error503 />,
  },
  {
    path: "/support",
    element: <Support />,
  },

  {
    path: "/Marketplace",
    element: <Marketplace />,
  },

  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/testpage",
    element: <AlertTest />,
  },
  {
    path: "/ContactFrom",
    element: <ContactFrom />,
  },
  {
    path: "/ContactFrom/:id",
    element: <ContactFrom />,
  },
  {
    path: "/Navigation",
    element: <Navigation />,
  },
  {
    path: "/Corporate",
    element: <MainCorporatePage />,
  },
  {
    path: "/products",
    element: <AllProduct />,
  },
  {
    path: "/admin/newsletter",
    element: <NewsletterCreator />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/success",
    element: <SuccesStories />,
  },
  {
    path: "/admin/search-user",
    element: <UserSearch />,
  },
  {
    path: "/contact",
    element: <ContactUs />,
  },
  {
    path: "/stories",
    element: <Stories />,
  },
  {
    path: "/ImageComponent",
    element: <ImageComponent/>,
  },
  {
    path:"/summary",
    element: <Summary/>,
  },
  {
    path:"/admin/announcements",
    element:<CreateAnnouncements/>
  },
  {
    path:"/admin/search-company",
    element:<FindCompanies/>
  },
  {
    path: "/managecompany/:id",
    element: <ManageCompanies />,
  },
  {
    path: "/manageuser/:id",
    element: <ManageUser />,
  },
  {
    path:"/test-chat",
    element:<SelectChat/>
  }
];

function App() {
  const routing = useRoutes(routes);
  return (
    <div className="App">
      <NavBar />
      {routing}
      <ChatIcon/>
      <Footer />
    </div>
  );
}

export default App;
