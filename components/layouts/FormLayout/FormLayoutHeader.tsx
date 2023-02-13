import { Box, Paper } from "@mui/material"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const FormLayoutHeader = (props: Props) => {
  return (
    <Paper>
      <Box className="breadCrumbBg">
        {props.children}
      </Box>
    </Paper>
  )
}

export default FormLayoutHeader