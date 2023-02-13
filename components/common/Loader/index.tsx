import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'

type Props = {}

const Loader = (props: Props) => {
  return (
    <Box sx={{ height: '100vh', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
      <CircularProgress thickness={3} />
    </Box>
  )
}

export default Loader