import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
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
import StoreIcon from "@mui/icons-material/Store";
import GetAppIcon from "@mui/icons-material/GetApp";
import PublishIcon from "@mui/icons-material/Publish";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import axios from "axios";
import albania from "./al.png";
import english from "./en.png";
import spanish from "./es.png";
const drawerWidth = 280;

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

export default function CombinedMenuDrawer() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openLanguageMenu = Boolean(anchorEl);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const { i18n, t } = useTranslation();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

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
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

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

        <Divider />
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

        <List>
          <ListItem
            disablePadding
            onClick={() => {
              handleDrawerClose();
              navigate("/signup");
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>{t("navbar.Sign Up")}</h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            onClick={() => {
              handleDrawerClose();
              navigate("/signin");
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>{t("navbar.Log In")}</h5>
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
            <ListItemButton>
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText>
                <h5> {t("navbar.Companies")}</h5>
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
            <ListItemButton>
              <ListItemIcon>
                <LocalMallIcon />
              </ListItemIcon>
              <ListItemText>
                <h5> {t("navbar.Products")} </h5>
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
            <ListItemButton>
              <ListItemIcon>
                <StorefrontIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>{t("marketplace.Marketplace")}</h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            onClick={() => {
              handleDrawerClose();
              navigate("/stories");
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <AutoStoriesIcon />
              </ListItemIcon>
              <ListItemText>
                <h5>{t("navbar.Stories")}</h5>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
