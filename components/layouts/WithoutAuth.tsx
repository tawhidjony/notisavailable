import { Box } from '@mui/material'
import React from 'react'

type PropType = {
  children: React.ReactNode
}

const WithoutAuth: React.FC<PropType> = ({ children }) => {

  return (
    <Box className="admin-template-login">
      <Box className='content'>
        {children}
      </Box>
    </Box>
  )

}

export default WithoutAuth