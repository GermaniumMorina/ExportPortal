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
import { BsCurrencyExchange } from "react-icons/bs";
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
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [message, setMessage] = useState("");

  const handleLogout = (ev) => {
    ev.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/Notify/${userId}`
        );
        if (response.data.original && response.data.original.length > 0) {
          const userNotifications = response.data.original.filter(
            (notification) => {
              const notificationData = JSON.parse(notification.data);
              return notificationData.notifiable_id === parseInt(userId, 10);
            }
          );

          setNotifications(userNotifications);

          let unread = 0;
          userNotifications.forEach((notification) => {
            if (!notification.read_at) {
              unread++;
            }
          });
          setUnreadCount(unread);

          setMessage("");
        } else {
          console.log("No notifications found.");
          setNotifications([]);
          setUnreadCount(0);

          setMessage("No new notifications.");
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
            >
              <DropdownToggle caret tag="span">
                <span role="img" aria-label="bell">
                  🔔
                </span>
                {unreadCount > 0 && <span>{unreadCount}</span>}
              </DropdownToggle>
              <DropdownMenu>
                <p>{message}</p>
                {notifications.map((notification, index) => {
                  const notificationData = JSON.parse(notification.data);
                  return (
                    <DropdownItem key={index}>
                      <p>{`${notificationData["Full Name"]} is interested in your product: ${notificationData["Product"]}`}</p>
                    </DropdownItem>
                  );
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
                <h5>Home</h5>
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
                <h5>Account</h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handleLanguageClick}>
              <ListItemIcon>
                <TranslateIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>Language</h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <Menu
            id="language-menu"
            anchorEl={anchorEl}
            open={openLanguageMenu}
            onClose={handleLanguageClose}
          >
            <MenuItem onClick={handleLanguageClose}>
              <img
                src={english}
                alt="english"
                width="30"
                height="20"
                className="m-1"
              />
              English
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLanguageClose}>
              <img
                src={spanish}
                alt="spanish"
                width="30"
                height="20"
                className="m-1"
              />
              Spanish
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLanguageClose}>
              <img
                src={albania}
                alt="albania"
                width="30"
                height="20"
                className="m-1"
              />
              Albanian
            </MenuItem>
          </Menu>
          <ListItem disablePadding onClick={handleLogout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>Logout</h5>
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
                <h5>Companies</h5>
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
                <h5>Register Company</h5>
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
                <h5>Products </h5>
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
                <h5>Add New Product</h5>
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
                <h5>Import Product</h5>
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
                <h5>Export Products</h5>
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
              <h5>Succes Stories </h5>
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
