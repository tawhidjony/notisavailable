import CloseIcon from '@mui/icons-material/Close';
import DangerousIcon from '@mui/icons-material/Dangerous';
import DoneIcon from '@mui/icons-material/Done';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box } from '@mui/system';
import Link from 'next/link';
import * as React from 'react';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type IAlertDialog = {
  open: boolean,
  modeType: string,
  message?: string,
  href?: any,
  closeDialog: () => void,
  actionFunction?: () => void

}

const AlertDialog = ({ open, closeDialog, modeType, href, actionFunction, message = "আপনি কি আরো যুক্ত করতে চান? " }: IAlertDialog) => {

  if (modeType === 'message') {
    return (
      <Box>
        <Dialog
          open={true}
          TransitionComponent={Transition}
          keepMounted
          onClose={closeDialog}
          aria-describedby="alert-dialog-slide-description"

        >
          <DialogContent sx={{ position: 'relative', padding: '2rem 4rem' }}>
            <Box sx={{ position: 'absolute', top: 15, right: 15 }} ><CloseIcon /></Box>
            <DialogContentText id="alert-dialog-slide-description">
              <Box sx={{ marginTop: '2rem' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1.5rem' }} >
                  <Box sx={{ width: 60, height: 60, backgroundColor: "#3e9582", borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <DoneIcon sx={{ color: '#FFFFFF' }} fontSize='medium' />
                  </Box>
                </Box>
                <Box sx={{ marginTop: '1.5rem' }}>
                  <Typography variant='subtitle1' align='center' >সফল হয়েছে</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }} >
                  <Typography variant='subtitle1'>{message}</Typography>
                  <Link href={href} ><Button type="button" variant='text' sx={{ minWidth: '5px', border: '1px solid #3e9582', padding: '0 5px', marginLeft: '1rem' }} >না</Button></Link>
                  <Button type="button" variant='text' sx={{ minWidth: '5px', border: '1px solid #3e9582', padding: '0 5px', marginLeft: '1rem' }} onClick={actionFunction} >হ্যাঁ</Button>
                </Box>
              </Box>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Box>
    )
  } else if (modeType === 'delete') {
    return (
      <Box>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={closeDialog}
          aria-describedby="alert-dialog-slide-description"

        >
          <DialogContent sx={{ position: 'relative', padding: '2rem 4rem' }}>
            <Box sx={{ position: 'absolute', top: 15, right: 15, cursor: 'pointer' }} onClick={closeDialog} ><CloseIcon /></Box>
            <DialogContentText id="alert-dialog-slide-description">
              <Box sx={{ marginTop: '2rem' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1.5rem' }} >
                  <Box sx={{ width: 60, height: 60, backgroundColor: "red", borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <DangerousIcon sx={{ color: '#FFFFFF' }} fontSize='medium' />
                  </Box>
                </Box>
                <Box sx={{ marginTop: '1.5rem' }}>
                  <Typography variant='subtitle1' align='center' >আপনি এটি মুছে ফেলার সিদ্ধান্ত নিয়েছেন </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }} >
                  <Typography variant='subtitle1'>আপনি কি এটি মুছে ফেলতে চান? </Typography>
                  <Button type="button" variant='text' sx={{ minWidth: '5px', border: '1px solid #3e9582', padding: '0 5px', marginLeft: '1rem' }} onClick={closeDialog}>না</Button>
                  <Button type="button" variant='text' sx={{ minWidth: '5px', border: '1px solid #3e9582', padding: '0 5px', marginLeft: '1rem' }} onClick={actionFunction}>হ্যাঁ</Button>
                </Box>
              </Box>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Box>
    )
  } else {
    return null
  }

}


export default AlertDialog

// else if (modeType === 'delete') {
//   return (

//     <Box>
//       <Dialog
//         open={open}
//         TransitionComponent={Transition}
//         keepMounted
//         onClose={closeDialog}
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <DialogTitle>{"Use Google's location service?"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-slide-description">
//             Let Google help apps determine location. This means sending anonymous
//             location data to Google, even when no apps are running.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeDialog}>Disagree</Button>
//           <Button onClick={deleteFunction}>Agree</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }