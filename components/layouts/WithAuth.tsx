import { Box, Grid, Paper } from "@mui/material";
import Skeletons from "components/Admin/Skeletons";
import Footer from "components/shared/footer/footer";
import React, { Suspense, useState } from "react";
import dashboardStyle from "./DashboardStyle";
const Sidebar = React.lazy(() => import('components/shared/sidebar/sidebar'));
const Header = React.lazy(() => import('components/shared/header/header'));




type PropType = {
  children: React.ReactNode
}

const WithAuth = ({ children }: PropType) => {
  const classes = dashboardStyle();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);


  return (


    <Grid container>
      <Suspense fallback={<Skeletons />} >
        <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      </Suspense>
      <Suspense fallback={<Skeletons />} >
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      </Suspense>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper>
          <Box p={1}>
            {children}
            <Footer />
          </Box>
        </Paper>
      </main>
    </Grid>
  )
}

export default WithAuth