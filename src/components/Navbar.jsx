import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import BookIcon from "@mui/icons-material/Book";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../helpers/firebase";
import { searchBlog } from "../features/BlogSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {

 const { currentUser } = useSelector((state) => state?.auth); 
 const dispatch = useDispatch()
 const [blogsearch, setBlogsearch] = React.useState("")

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = ()=>{
    userLogout();
  }

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <BookIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MyBlogApp
          </Typography>

          <Search value={blogsearch || ""} onChange={(e)=>{setBlogsearch(e.target.value); dispatch(searchBlog(e.target.value))}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search with title"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {currentUser && <h6 style={{marginTop:"1rem"}}>{currentUser?.displayName}</h6>}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {currentUser?.photoURL ? <img src={currentUser?.photoURL} alt="profile" style={{width:"30px", borderRadius:"50%"}} referrerPolicy="no-referrer"/> :  <AccountCircle />}
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="primary-search-account-menu-mobile"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
            {/* //!Mobile Responsive */}
      {!currentUser && (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id="primary-search-account-menu-mobile"
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={handleMobileMenuClose}><Link style={{textDecoration:"none"}} to="/login">Login</Link></MenuItem>
          <MenuItem onClick={handleMobileMenuClose}><Link style={{textDecoration:"none"}} to="/register">Register</Link></MenuItem>
        </Menu>
      )}

      {currentUser && (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id="primary-search-account-menu-mobile"
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={handleMobileMenuClose}><Link style={{textDecoration:"none"}} to="/">Dashboard</Link></MenuItem>
          <MenuItem onClick={handleMobileMenuClose}><Link style={{textDecoration:"none"}} to="/profile">Profile</Link></MenuItem>
          <MenuItem onClick={handleMobileMenuClose}><Link style={{textDecoration:"none"}} to="/newblog">NewBlog</Link></MenuItem>
          <MenuItem onClick={()=>{ handleLogout(); handleMobileMenuClose()}}><Link style={{textDecoration:"none"}} to="/login">Logout</Link></MenuItem>
        </Menu>
      )}

      {/* //! Desktop View */}
      {!currentUser && (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id="primary-search-account-menu"
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}><Link style={{textDecoration:"none"}} to="/login">Login</Link></MenuItem>
          <MenuItem onClick={handleMenuClose}><Link style={{textDecoration:"none"}} to="/register">Register</Link></MenuItem>
        </Menu>
      )}

      {currentUser && (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id="primary-search-account-menu"
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}><Link style={{textDecoration:"none"}} to="/">Dashboard</Link></MenuItem>
          <MenuItem onClick={handleMenuClose}><Link style={{textDecoration:"none"}} to="/profile">Profile</Link></MenuItem>
          <MenuItem onClick={handleMenuClose}><Link style={{textDecoration:"none"}} to="/newblog">NewBlog</Link></MenuItem>
          <MenuItem onClick={()=>{handleMenuClose(); handleLogout();}}><Link style={{textDecoration:"none"}} to="/login">Logout</Link></MenuItem>
        </Menu>
      )}
    </Box>
  );
}
