import { Box } from '@mui/material'
import React from 'react'

type PropType = {
  children: React.ReactNode
}

const WithoutAuthHome: React.FC<PropType> = ({ children }) => {

  return (
    <Box className="admin-template-home">
      <Box className='content'>
        {children}
      </Box>
    </Box>
  )

}

export default WithoutAuthHome