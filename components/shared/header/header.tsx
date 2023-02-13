import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AppBar, Avatar, Badge, Button, IconButton, List, ListItem, Menu, MenuItem, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { reduxSetLang } from "Api/SystemConfiguration/Language";
import dashboardStyle from "components/layouts/DashboardStyle";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EnumLangTypes } from "Utils/Enums/LangType";

type props = {
  mobileOpen: boolean;
  setMobileOpen: (params: boolean) => void;
};


const Header = ({ mobileOpen, setMobileOpen }: props) => {
  const classes = dashboardStyle();
  const dispatch = useDispatch();
  const toolbarStyle = {
    maxHeight: "60px",
    alignItems: "center",
    justifyContent: "flex-end",
  };

  const buttonStyle = {
    padding: "0",
    minWidth: "auto",
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [lang, setLang] = React.useState<string>(EnumLangTypes.BANGLA);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    Cookies.remove("_jwtToken")
    Cookies.remove("_user")
    localStorage.removeItem("_jwtToken");
    localStorage.removeItem("_user");
    window.location.href = "/login";
  };

  useEffect(() => {
    const localStorageLang = localStorage.getItem("lang");
    const language = localStorageLang === EnumLangTypes.ENGLISH ? EnumLangTypes.ENGLISH : EnumLangTypes.BANGLA;
    dispatch(reduxSetLang({ lang: language }));
    setLang(language);
  }, []);

  const handleLanguage = () => {
    const language = lang === EnumLangTypes.ENGLISH ? EnumLangTypes.BANGLA : EnumLangTypes.ENGLISH;
    dispatch(reduxSetLang({ lang: language }));
    localStorage.setItem("lang", language);
    setLang(language);
  };


  return (

    <AppBar position="fixed" className={classes.AppBar}>
      <Toolbar>
        <IconButton
          onClick={() => setMobileOpen(!mobileOpen)}
          color="inherit"
          edge="start"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Box className={classes.headerWrapper}>
          <Box sx={{ display: { xs: 'none', sm: "block", md: 'block', lg: 'block', xl: 'block' } }}>
            <Box className={classes.headTitle}>মসজিদ ভিত্তিক শিশু ও গণশিক্ষা কার্যক্রম</Box>
          </Box>
          <Box sx={{ display: { xs: 'block', sm: "none", md: 'none', lg: 'none', xl: 'none' } }}>
            <img
              src="/assets/if.png"
              alt="IFoundation Logo"
              width="50"
              height="50"
            />
          </Box>
          <Box className={classes.headerRight}>
            <Box className="bnEnBtn" sx={{ display: { xs: 'none', sm: "block", md: 'block', lg: 'block', xl: 'block' } }}>
              <List className={classes.langUl}>
                <ListItem className={`langLi ${lang === EnumLangTypes.BANGLA ? "langBg" : ""}`} onClick={handleLanguage}>বাংলা</ListItem>
                <ListItem className={`langLi ${lang === EnumLangTypes.ENGLISH ? "langBg" : ""}`} onClick={handleLanguage}>English</ListItem>
              </List>
            </Box>

            <Box className="bnEnBtn" sx={{ display: { xs: 'block', sm: "none", md: 'none', lg: 'none', xl: 'none' } }} >
              <List className={classes.langUl}>
                <ListItem className={`langLi ${lang === EnumLangTypes.BANGLA ? "langBg" : ""}`} onClick={handleLanguage}>BN</ListItem>
                <ListItem className={`langLi ${lang === EnumLangTypes.ENGLISH ? "langBg" : ""}`} onClick={handleLanguage}>EN</ListItem>
              </List>
            </Box>

            <Box sx={{ display: { xs: 'block', sm: "block", md: 'block', lg: 'block', xl: 'block' } }}>
              <Badge
                badgeContent={4}
                color="primary"
                sx={{ mr: 4, cursor: "pointer" }}
              >
                <NotificationsIcon fontSize="small" className="messageIcon" />
              </Badge>
            </Box>
            <Box>
              <Button
                type="button"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={buttonStyle}
              >
                <Avatar
                  src="#"
                  alt="Tareq"
                  sizes="small"
                  sx={{
                    bgcolor: "transparent",
                    border: "1px solid #fff",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                />

                <Box className="userNameBtn" sx={{
                  display: { xs: 'none', sm: "block", md: 'block', lg: 'block', xl: 'block' }, color: "#fff", fontWeight: "bold", "& :nth-of-type(2)": {
                    fontSize: "16px",
                    fontWeight: "bold",
                    lineHeight: "5px",
                    margin: "5px"
                  },
                }}>
                  <span>স্বাগতম</span> <br />
                  <span>আব্দুল হক</span> <br />
                  <span>ডেজিগনেশন</span>
                </Box>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem sx={{ fontSize: "13px" }}>Profile</MenuItem>
                <MenuItem sx={{ fontSize: "13px" }}>My account</MenuItem>
                <MenuItem sx={{ fontSize: "13px" }} onClick={logout}>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar >

  );
};

export default Header;
