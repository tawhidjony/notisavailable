import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Box, Button, Typography } from "@mui/material";
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const buttonStyles = { minWidth: '5px', border: '1px solid #3e9582', padding: '0 5px', marginLeft: '1rem' }

type IProps = {
  items: {
    title?: string,
    message?: string
    icon?: string,
    url: string,
    button: boolean,
    autoClose: boolean,
    action?: () => void
  },
  open: boolean,
  close: React.Dispatch<React.SetStateAction<boolean>>,

}

const MessageDialog = ({ items, close, open }: IProps) => {
  let delay: number = 1
  const router = useRouter()
  const methods = useForm()

  const onClickClose = () => {
    close(!open)
  }

  const onClickRoute = () => {
    onClickClose()
    router.push(items.url)
    close(false)
  }

  useEffect(() => {
    const timer1 = items.autoClose !== false ? setTimeout(() => onClickRoute(), delay * 1000) : undefined;
    return () => {
      clearTimeout(timer1);
    };
  }, [])

  return (
    <DialogContent sx={{ position: 'relative', minWidth: "350px" }}>
      <Box sx={{ position: 'absolute', top: 15, right: 15 }} ><CloseIcon onClick={onClickClose} /></Box>
      <DialogContentText id="alert-dialog-slide-description"  >
        <Box sx={{ marginTop: '2rem' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1.5rem' }} >
            <Box sx={{ width: 60, height: 60, backgroundColor: "#3e9582", borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
              <DoneIcon sx={{ color: '#FFFFFF' }} fontSize='medium' />
            </Box>
          </Box>
          <Box sx={{ marginTop: '1.5rem' }}>
            <Typography variant='subtitle1' align='center' >{items?.title}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }} >
            <Typography variant='subtitle1'>{items?.message}</Typography>
            {items.button !== false &&
              (<>
                <Button onClick={onClickRoute} type="button" variant='text' sx={buttonStyles} >না</Button>
                <Button type="button" onClick={() => { methods.reset(); onClickClose() }} variant='text' sx={buttonStyles} >হ্যাঁ</Button>
              </>)
            }
          </Box>
        </Box>
      </DialogContentText>
    </DialogContent >
  )
}

export default MessageDialog