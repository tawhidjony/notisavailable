import Typography from '@mui/material/Typography'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <Typography align='center' mb={0} paragraph={true} sx={
        {
          fontSize: '12px',
          color: 'text.secondary',
        }
      }>Copyright {new Date().getFullYear()} &copy; Design and Developed by : <a target="_blank" href="https://simecsystem.com/">SIMEC System Ltd.</a> </Typography>
    </footer>
  )
}

export default Footer