import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Box, Button, Dialog, DialogContent, DialogContentText, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Link from 'next/link';
import * as React from 'react';


const Transition = React.forwardRef(function Transition(props: TransitionProps & { children: React.ReactElement<any, any>; }, ref: React.Ref<unknown>,) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type IAlertDialog = {
    href?: any,
    onAction?: () => void
}
const useNotificationHook = () => {
    const [open, setOpen] = React.useState(false)
    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)

    const MessageAlert = ({ href, onAction }: IAlertDialog) => {
        return (
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent sx={{ position: 'relative', padding: '2rem 4rem' }}>
                    <Box sx={{ position: 'absolute', top: 15, right: 15, cursor: 'pointer' }} onClick={onClose} ><CloseIcon /></Box>
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
                                <Typography variant='subtitle1'>আপনি কি আরো যুক্ত করতে চান? </Typography>
                                <Link href={href} ><Button variant='text' sx={{ minWidth: '5px', border: '1px solid #3e9582', padding: '0 5px', marginLeft: '1rem' }} >না</Button></Link>
                                <Button type="button" variant='text' sx={{ minWidth: '5px', border: '1px solid #3e9582', padding: '0 5px', marginLeft: '1rem' }} onClick={onAction} >হ্যাঁ</Button>
                            </Box>
                        </Box>
                    </DialogContentText>
                </DialogContent>
            </Dialog>)
    }

    return { MessageAlert, onClose, onOpen, open }
}

export default useNotificationHook  