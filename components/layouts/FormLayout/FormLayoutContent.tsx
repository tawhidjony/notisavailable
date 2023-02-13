import { Box, Paper, Typography } from '@mui/material'
import { FC } from 'react'

type IFormLayoutContent = {
  title?: string
  children: React.ReactNode
}

const FormLayoutContent: FC<IFormLayoutContent> = ({ children, title }) => {
  return (
    <Box className="studentMainContentField">
      <Paper className="paperField">
        <Box className="studentFieldHead">
          <Typography>{title}</Typography>
        </Box>
      </Paper>
      <Box className="studentContentField" style={{ padding: '1.5rem 1.5rem' }} >
        {children}
      </Box>
    </Box>
  )
}

export default FormLayoutContent