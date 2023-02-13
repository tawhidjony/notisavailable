import { Grid, Paper } from "@mui/material"
import { Box } from "@mui/system"

type Props = {
  children: React.ReactNode
}

const FormLayoutFooter = (props: Props) => {
  return (
    <Paper className="studentBottomField">
      <Box className="studentFieldBottom">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="stretch"
        >
          <Box className="clearBtnField">
            {props.children}
          </Box>

        </Grid>
      </Box>
    </Paper>
  )
}

export default FormLayoutFooter