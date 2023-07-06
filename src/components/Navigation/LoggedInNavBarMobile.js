import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from "./logo.png";
import "./NavBar.css";
import TranslateIcon from "@mui/icons-material/Translate";
import LogoutIcon from "@mui/icons-material/Logout";
import StoreIcon from "@mui/icons-material/Store";
import GetAppIcon from "@mui/icons-material/GetApp";
import PublishIcon from "@mui/icons-material/Publish";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import avatar from "./avatar.jpg";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import { BsCurrencyExchange, BsBell } from "react-icons/bs";
import axios from "axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import english from "./en.png";
import spanish from "./es.png";
import albania from "./al.png";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const drawerWidth = 290;
const user = localStorage.getItem("userName");
const userId = localStorage.getItem("userId");

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function LoggedInNavBarMobile() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [unreadCounts, setUnreadCount] = useState({
    notifications: [],
    unread_count: 0,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [message, setMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [notificationsActive, setNotificationsActive] = useState(true);
  const { i18n, t } = useTranslation();
  const handleLogout = (ev) => {
    ev.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchNotifications = async (language) => {
      try {
        let languageId;

        switch (language) {
          case "en":
            languageId = 1;
            break;
          case "es":
            languageId = 2;
            break;
          case "al":
            languageId = 3;
            break;
          default:
            languageId = 1;
            break;
        }
        const response = await axios.get(
          `http://localhost:8000/api/showUnReadNotify/${userId}/${languageId}`
        );
        console.log(response.data);
        const { notifications, unread_count } = response.data.original;
        if (notifications && notifications.length > 0) {
          const userNotifications = notifications.filter((notification) => {
            return notification.notifiable_id === parseInt(userId, 10);
          });
          setNotifications(userNotifications);
        }
        setUnreadCount({
          notifications: notifications,
          unread_count: unread_count,
        });
        if (
          response.data.original &&
          response.data.original.error === "Not found"
        ) {
          console.log("No notifications found.");
          setNotifications([]);
          setUnreadCount({
            notifications: [],
            unread_count: 0,
          });
          setMessage("No new notifications.");
        } else {
          setMessage("");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotifications();
  }, []);
  const [openLanguageMenu, setOpenLanguageMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenLanguageMenu(true);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
    setOpenLanguageMenu(false);
  };
  const [tokens, setTokens] = useState(localStorage.getItem("tokens") || 0);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fetchTokenValue = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/token/${userId}`
      );
      setTokens(response.data.original.amount);
      localStorage.setItem("tokens", response.data.original.amount);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTokenValue();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLanguageChange = async (language) => {
    let languageId;

    switch (language) {
      case "en":
        languageId = 1;
        break;
      case "es":
        languageId = 2;
        break;
      case "al":
        languageId = 3;
        break;
      default:
        languageId = 1;
        break;
    }

    setSelectedLanguage(language);
    localStorage.setItem("language", language);
    console.log("Selected language:", language);
    try {
      const userId = localStorage.getItem("userId");

      const response = await axios.get(
        `http://localhost:8000/api/updateLanguage/${userId}/${languageId}`
      );
      console.log(
        "Language updated successfully on the server:",
        response.data
      );

      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : {};
      user.languageId = languageId;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Failed to update language on the server:", error);
    }
  };
  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [i18n, selectedLanguage]);
  const toggleNotifications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/notificatiOnOff/${userId}`
      );

      setNotificationsActive(
        (prevNotificationsActive) => !prevNotificationsActive
      );

      console.log("Notifications toggled successfully for user:", response);
    } catch (error) {
      console.error("Failed to toggle notifications:", error);
      // Handle the error
    }
  };
  const markAsReadNotifications = async (language) => {
    let languageId;

    switch (language) {
      case "en":
        languageId = 1;
        break;
      case "es":
        languageId = 2;
        break;
      case "al":
        languageId = 3;
        break;
      default:
        languageId = 1;
        break;
    }

    try {
      await axios.get(
        `http://localhost:8000/api/MarkAsReadNotify/${userId}/${languageId}`
      );

      setUnreadCount({ ...unreadCounts, unread_count: 0 });
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
      // Handle the error
    }
  };
  const handleBellIconClick = () => {
    markAsReadNotifications(selectedLanguage);
  };
  return (
    <Box>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="main-navbar-box">
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={logo}
            alt="logo"
            className="d-inline-block align-top logo"
          />
          <div className="bell-icon">
            <Dropdown
              className="bell-icon"
              isOpen={dropdownOpen}
              toggle={toggle}
              onClick={handleBellIconClick}
            >
              <DropdownToggle caret tag="span">
                <span role="img" aria-label="bell">
                  <BsBell style={{ color: "black" }} />
                </span>
                <span className="unread-count">
                  {unreadCounts.unread_count}
                </span>
              </DropdownToggle>
              <DropdownMenu className="message1">
                <div className="notification-header">
                  <h5>Notifications</h5>
                  {user && (
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={notificationsActive}
                        onChange={toggleNotifications}
                      />
                      <div className="slider"></div>
                    </label>
                  )}
                </div>
                <p>{message}</p>
                {notifications.map((notification, index) => {
                  const hasFullNameAndProduct =
                    notification.hasOwnProperty("Full Name") &&
                    notification.hasOwnProperty("Product");
                  const hasCompanyAndProduct =
                    notification.hasOwnProperty("Company") &&
                    notification.hasOwnProperty("Product");
                  const hasOnlyName = notification.hasOwnProperty("Full Name");
                  if (hasFullNameAndProduct) {
                    return (
                      <DropdownItem className="new-message" key={index}>
                        <p>{`${notification["Full Name"]} is interested in your product: ${notification["Product"]}`}</p>
                      </DropdownItem>
                    );
                  } else if (hasCompanyAndProduct) {
                    if (notification["Product"] === "N/A") {
                      return (
                        <DropdownItem className="new-message" key={index}>
                          <p>{`Admin has deleted your Company: ${notification["Company"]}`}</p>
                        </DropdownItem>
                      );
                    } else if (notification["Company"] !== "N/A") {
                      return (
                        <DropdownItem className="new-message" key={index}>
                          <p>{`Admin has deleted your Product: ${notification["Product"]}, from your Company: ${notification["Company"]}`}</p>
                        </DropdownItem>
                      );
                    }
                  } else if (hasOnlyName) {
                    return (
                      <DropdownItem className="new-message" key={index}>
                        <p>{`Admin has updated your Profile: ${notification["Full Name"]}`}</p>
                      </DropdownItem>
                    );
                  }
                  return null;
                })}
              </DropdownMenu>
            </Dropdown>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader className="drawer-header-inside">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Avatar alt="Avatar" src={avatar} className="profile-picture" />
              </ListItemIcon>
              <ListItemText>
                <span className="ms-2">
                  {user} · <BsCurrencyExchange /> {tokens}
                </span>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem
            disablePadding
            onClick={() => {
              handleDrawerClose();
              navigate("/");
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>{t("footer.Home")}</h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              handleDrawerClose();
              navigate("/account");
            }}
          >
            {" "}
            <ListItemButton>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>{t("navbar.Account")}</h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handleLanguageClick}>
              <ListItemIcon>
                <TranslateIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>{t("navbar.Language")}</h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <Menu
            id="language-menu"
            anchorEl={anchorEl}
            open={openLanguageMenu}
            onClose={handleLanguageClose}
          >
            <MenuItem
              onClick={() => {
                handleLanguageChange("en");
                handleLanguageClose();
              }}
            >
              <img
                src={english}
                alt="english"
                width="30"
                height="20"
                className="m-1"
              />
              {t("navbar.English")}
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                handleLanguageChange("es");
                handleLanguageClose();
              }}
            >
              <img
                src={spanish}
                alt="spanish"
                width="30"
                height="20"
                className="m-1"
              />
              {t("navbar.Spanish")}
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                handleLanguageChange("al");
                handleLanguageClose();
              }}
            >
              <img
                src={albania}
                alt="albania"
                width="30"
                height="20"
                className="m-1"
              />
              {t("navbar.Albanian")}
            </MenuItem>
          </Menu>
          <ListItem disablePadding onClick={handleLogout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>{t("navbar.Logout")}</h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            disablePadding
            onClick={() => {
              handleDrawerClose();
              navigate("/companies");
            }}
          >
            {" "}
            <ListItemButton>
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>{t("navbar.Companies")}</h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              handleDrawerClose();
              navigate("/summary");
            }}
          >
            {" "}
            <ListItemButton>
              <ListItemIcon>
                <DocumentScannerIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>Your Company</h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              handleDrawerClose();
              navigate("/addnewcompany");
            }}
          >
            {" "}
            <ListItemButton>
              <ListItemIcon>
                <AddBusinessIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>{t("navbar.Register Company")}</h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              handleDrawerClose();
              navigate("/products");
            }}
          >
            {" "}
            <ListItemButton>
              <ListItemIcon>
                <LocalMallIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>{t("navbar.Products")} </h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              handleDrawerClose();
              navigate("/addnewitem");
            }}
          >
            {" "}
            <ListItemButton>
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>{t("navbar.Add New Product")}</h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              handleDrawerClose();
              navigate("/import");
            }}
          >
            {" "}
            <ListItemButton>
              <ListItemIcon>
                <GetAppIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>{t("import.Import Product")}</h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              handleDrawerClose();
              navigate("/export");
            }}
          >
            {" "}
            <ListItemButton>
              <ListItemIcon>
                <PublishIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>{t("import.Export Product")}</h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              handleDrawerClose();
              navigate("/marketplace");
            }}
          >
            {" "}
            <ListItemButton>
              <ListItemIcon>
                <StorefrontIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>Marketplace </h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <ListItem
          disablePadding
          onClick={() => {
            handleDrawerClose();
            navigate("/stories");
          }}
        >
          {" "}
          <ListItemButton>
            <ListItemIcon>
              <AutoStoriesIcon />
            </ListItemIcon>
            <ListItemText>
              <h5>{t("navbar.Succes Stories")} </h5>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
