import { Box, CircularProgress, SxProps } from '@mui/material';
import { FC } from 'react';
import { FormLayoutStyle } from './FormLayoutStyle';

type IFormLayout = {
  spinLoading?: boolean
  children: React.ReactNode
}

const FormLayout: FC<IFormLayout> = ({ children, spinLoading = false }) => {

  return (
    <Box sx={{ ...FormLayoutStyle } as SxProps}>
      <Box className="studentAddField">

        {spinLoading === true && <Box className='defaultInnerForm'>
          <Box className='defaultLoading'>
            <CircularProgress />
          </Box>
        </Box>}

        {children}
      </Box>
    </Box>
  )
}

export default FormLayout