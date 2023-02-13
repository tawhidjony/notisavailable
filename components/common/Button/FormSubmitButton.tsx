import { Box, Button, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useClasses = makeStyles({
  loginBtnContent: {
    background: '#fff',
    color: '#000',
  }
})




type Props = {
  isLoading: boolean;
  loadingText: string;
  buttonText: string;
  variant?: 'contained' | 'outlined';
  fullWidth?: boolean;
  type?: 'button' | 'submit';
}

const FormSubmitButton: React.FC<Props> = ({
  isLoading = false,
  loadingText = "Loading, Please wait.",
  buttonText = "Save",
  variant = "contained",
  fullWidth = false,
  type = "submit"
}) => {
  const classes = useClasses();
  return (
    <Button className={classes.loginBtnContent} variant={variant} color='primary' disabled={isLoading} fullWidth={fullWidth} type={type}>
      {
        isLoading ?
          <Box component={'span'} display="flex" alignItems={'center'} gap={1}>
            <CircularProgress size={15} color="inherit" />
            {loadingText}
          </Box>
          :
          buttonText
      }
    </Button>
  )
}

export default FormSubmitButton