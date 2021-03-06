import React, { useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Menu,
  Tooltip,
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import {
  faDatabase,
  faMoneyBill,
  faPlus,
  faSignOut,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { signOut } from "store/reducers/authReducer";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";

const drawerWidth = 240;

function PanelLayout(props: { children: any }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useAppSelector((state) => state.auth.value.email);
  const role = useAppSelector((state) => state.auth.value.role);
  const dispatch = useAppDispatch();
  const { children } = props;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Grid container spacing={3}>
            <Grid item xs>
              {role === 1 ? (
                <Typography variant="h6" noWrap component="div" color="white">
                  <Link to="/admin/dashboard" className="admin-nav">
                    Dash Board
                  </Link>
                </Typography>
              ) : (
                <Typography variant="h6" noWrap component="div">
                  Dash Board
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={4}>
              <Tooltip title="User Actions">
                <IconButton
                  className="header-icon m-2"
                  onClick={handleClick}
                  sx={{ p: 0, color: "wheat" }}
                >
                  <FontAwesomeIcon icon={faUserCircle} />
                </IconButton>
              </Tooltip>
              <Typography variant="body1" noWrap className="d-inline mr-2">
                Welcome {user}
              </Typography>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to="/my/profile" className="nav-link button">
                  <FontAwesomeIcon icon={faUser} /> Profile
                </Link>
                <Button
                  variant="text"
                  onClick={() => {
                    dispatch(signOut());
                    toast.success("See You Again!!", {
                      theme: "colored",
                    });
                  }}
                >
                  <Link to="/signin" className="nav-link">
                    <FontAwesomeIcon icon={faSignOut} /> Sign Out
                  </Link>
                </Button>
              </Menu>
            </Grid>
          </Grid>
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
        variant="permanent"
        anchor="left"
        className="drawer"
      >
        {" "}
        <Link to="/">
          <img
            className="header__icon"
            src="https://i.pinimg.com/736x/69/69/d9/6969d98d55bf6f2600153585a2b4ef9b--travel-logo-logo-design-inspiration.jpg"
            alt="World Tour"
            height="25px"
          />
        </Link>
        <Divider />
        <List>
          {role === 3 ? (
            <>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faPlus} />
                </ListItemIcon>
                <NavLink
                  to="/add/tours"
                  className={({ isActive }) =>
                    isActive ? "active" : "nav-link"
                  }
                >
                  Add Tour Package
                </NavLink>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faDatabase} />
                </ListItemIcon>
                <NavLink
                  to="/view/tours"
                  className={({ isActive }) =>
                    isActive ? "active" : "nav-link"
                  }
                >
                  View Tours
                </NavLink>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faMoneyBill} />
                </ListItemIcon>
                <NavLink
                  to="/tour/orders"
                  className={({ isActive }) =>
                    isActive ? "active" : "nav-link"
                  }
                >
                  Orders
                </NavLink>
              </ListItem>
            </>
          ) : (
            ""
          )}
          {role === 2 ? (
            <>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faPlus} />
                </ListItemIcon>
                <NavLink
                  to="/add/hotels"
                  className={({ isActive }) =>
                    isActive ? "active" : "nav-link"
                  }
                >
                  Add Hotel
                </NavLink>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faDatabase} />
                </ListItemIcon>
                <NavLink
                  to="/view/hotels"
                  className={({ isActive }) =>
                    isActive ? "active" : "nav-link"
                  }
                >
                  View Hotel
                </NavLink>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faMoneyBill} />
                </ListItemIcon>
                <NavLink
                  to="/hotel/orders"
                  className={({ isActive }) =>
                    isActive ? "active" : "nav-link"
                  }
                >
                  Orders
                </NavLink>
              </ListItem>
            </>
          ) : (
            ""
          )}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default PanelLayout;
