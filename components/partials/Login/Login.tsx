import { Box, SxProps, Typography } from "@mui/material"
import LoginForm from "./Form"
import { loginStyle } from "./LoginStyle"

const Login = () => {
  return (
    <Box sx={{ ...loginStyle } as SxProps}>
      <Box className="bgImage">
        <Box className="mainField">
          <Box className="minar">
            <img
              src="assets/minar.png"
              alt="gonoprojatontry bd logo"
              width="100%"
              height="700"
            />
          </Box>
          <Box className="loginBody">
            <Box className="logo">
              <img
                src="assets/bd-logo.png"
                alt="gonoprojatontry bd logo"
                width="100"
                height="100"
              />
            </Box>
            <Box className="loginBg">
              <Box className="iflogo">
                <img
                  src="assets/if.png"
                  alt="IFoundation Logo"
                  width="100"
                  height="100"
                />
                <Typography className="mosqueTitle">
                  মসজিদভিত্তিক শিশু ও গণশিক্ষা কার্যক্রম
                </Typography>
                <Typography>
                  Mosque Based Child and Mass Literacy Program
                </Typography>
              </Box>
              <Box className="loginField">
                <LoginForm />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
