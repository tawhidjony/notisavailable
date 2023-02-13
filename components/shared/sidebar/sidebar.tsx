import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Divider, Drawer, List, SxProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { reduxSetLangData, useGetLanguagesQuery } from "Api/SystemConfiguration/Language";
import dashboardStyle from "components/layouts/DashboardStyle";
import WindowSize from "hooks/windowSize";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store";
import { translate } from "Utils/Handler";
import MenuItem from "./menuItem";
import { MenuList } from "./menuItem/menu";
import { sideBarStyle } from "./sideBarStyle";

type props = {
  mobileOpen: boolean;
  setMobileOpen: (params: boolean) => void;
};

const Sidebar = ({ mobileOpen, setMobileOpen }: props) => {
  const classes = dashboardStyle();
  const { windowWidth } = WindowSize();
  const language = useSelector((state: RootState) => state.lang.lang);
  const { data: allLanguagesData } = useGetLanguagesQuery("");
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(reduxSetLangData({ langData: allLanguagesData?.data?.data }));
  }, [allLanguagesData?.data?.data]);


  return (

    <nav className={classes.drawer}>

      <Box sx={{ display: { xs: 'block', sm: "block", md: 'block', lg: 'none', xl: 'none' } }}>
        <Drawer
          className={classes.TemporaryDrawer}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(!mobileOpen)}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Box sx={{ ...sideBarStyle } as SxProps} className={`sidebar`}>
            <Box>
              <Box className="sideBarLogoField">
                <span className='closeButton' onClick={() => setMobileOpen(!mobileOpen)}>
                  <HighlightOffIcon />
                </span>
                <Box className="sidebar-header">
                  <Box className="iflogo">
                    <img
                      src="/assets/if.png"
                      alt="IFoundation Logo"
                      width="90"
                      height="90"
                    />
                    <Typography className="mosqueTitle">
                      ইসলামিক ফাউন্ডেশন বাংলাদেশ
                    </Typography>
                  </Box>
                  <Divider color="#8a9390" />
                </Box>
              </Box>
              <Box className="sidebar-menu">
                <List

                  sx={{ width: "100%", maxWidth: 360 }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  {MenuList
                    .map(menu => {
                      if (allLanguagesData?.data?.data) {
                        if (menu?.key) {
                          const translateLabel = translate(allLanguagesData?.data?.data, language, menu.key);
                          if (translateLabel) {
                            menu.title = translateLabel;
                          }
                        }
                        menu.items.map(item => {
                          if (item.key) {
                            const translateLabel = translate(allLanguagesData?.data?.data, language, item.key);
                            if (translateLabel) {
                              item.title = translateLabel;
                            }
                          }
                          item?.items?.map(subItem => {
                            if (subItem.key) {
                              const translateLabel = translate(allLanguagesData?.data?.data, language, subItem.key);
                              if (translateLabel) {
                                subItem.title = translateLabel;
                              }
                            }
                          })
                        });
                      }
                      return menu;
                    })
                    .map((item, index) => (
                      <MenuItem key={item.key} item={item} keyProp={index} />
                    ))
                  }

                </List>
              </Box>
            </Box>
          </Box>
        </Drawer>
      </Box>

      <Box sx={{ display: { xs: 'none', sm: "none", md: 'none', lg: 'block', xl: 'block' } }}>
        <Drawer
          variant="permanent"
          anchor="left"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Box sx={{ ...sideBarStyle } as SxProps} className={`sidebar`}>
            <Box>
              <Box className="sidebar-header">

                <Box className="iflogo">
                  <img
                    src="/assets/if.png"
                    alt="IFoundation Logo"
                    width="100"
                    height="100"
                  />
                  <Typography className="mosqueTitle">
                    ইসলামিক ফাউন্ডেশন বাংলাদেশ
                  </Typography>
                </Box>

              </Box>
              <Box className="sidebar-menu">
                <List

                  sx={{ width: "100%", maxWidth: 360 }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  {MenuList
                    .map(menu => {
                      if (allLanguagesData?.data?.data) {
                        if (menu?.key) {
                          const translateLabel = translate(allLanguagesData?.data?.data, language, menu.key);
                          if (translateLabel) {
                            menu.title = translateLabel;
                          }
                        }
                        menu.items.map(item => {
                          if (item.key) {
                            const translateLabel = translate(allLanguagesData?.data?.data, language, item.key);
                            if (translateLabel) {
                              item.title = translateLabel;
                            }
                          }
                          item?.items?.map(subItem => {
                            if (subItem.key) {
                              const translateLabel = translate(allLanguagesData?.data?.data, language, subItem.key);
                              if (translateLabel) {
                                subItem.title = translateLabel;
                              }
                            }
                          })
                        });
                      }
                      return menu;
                    })
                    .map((item, index) => (
                      <MenuItem key={index} item={item} keyProp={index} />
                    ))
                  }

                </List>
              </Box>
            </Box>
          </Box>

        </Drawer>
      </Box>

    </nav>
  );
};

export default Sidebar;
