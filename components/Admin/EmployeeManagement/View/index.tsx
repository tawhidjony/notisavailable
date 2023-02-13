import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, List, ListItem, ListItemText, Modal, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { PrintIcon } from "Utils/CustomIcons";
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 1024,
  bgcolor: 'background.paper',
  p: 4,
  '& .printButton': {
    position: 'absolute',
    top: '20px',
    right: '100px',
  },
  '& .printButtonClose': {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: ' 1px solid red',
    borderRadius: '100px',
    minWidth: ' 30px !important',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  }
};

type Props = {
  data: any;
  open: boolean;
  closeState: any
};


const ViewModal = ({ data, open, closeState }: Props) => {

  const componentRef = useRef(null)
  const [show, setHide] = useState(false);

  console.log(open);

  useEffect(() => {
    if (data) {
      setHide(open);
    }
  }, [data, open]);

  const handleClose = () => {
    setHide(false);
    closeState(false);
  };

  const handleClickToPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "React Print Islamic Foundation",
    onAfterPrint: () => console.log("Print Success")
  })

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Button type="button" className="printButton" onClick={handleClickToPrint} startIcon={<PrintIcon />}> Print </Button>
        <Typography className="printButtonClose" onClick={handleClose}> <CloseIcon /> </Typography>
        <Box ref={componentRef} sx={{ padding: '1rem' }} >
          {/* <Box style={{ display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column', marginBottom: 5 }} >
            <Typography id="modal-modal-title" variant="h4" component="h2"> মসজিদভিত্তিক শিশু ও গণশিক্ষা কার্যক্রম </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2"> ইসলামিক ফাউন্ডেশন </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2"> আগারগাঁও শেরেবাংলানগর, ঢাকা-১২০৭ </Typography>
          </Box>
          <Divider /> */}
          <Box >
            <List >
              <ListItem>
                <ListItemText sx={{ flexBasis: '50%' }} >কর্মকর্তার আইডিঃ {data?.employee_id}</ListItemText>
                <ListItemText sx={{ flexBasis: '50%' }} >পদবীঃ {data?.designationId?.name_en}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText sx={{ flexBasis: '50%' }} >কর্মকর্তার নামঃ {data?.name_en}</ListItemText>
                <ListItemText sx={{ flexBasis: '50%' }} >যোগদানের তারিখঃ {moment(data?.join_date).format('DD-MM-YYYY')}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText sx={{ flexBasis: '50%' }} > বাবার নামঃ {data?.father_name}</ListItemText>
                <ListItemText sx={{ flexBasis: '50%' }} > ই-মেইলঃ {data?.email}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText sx={{ flexBasis: '50%' }} >মায়ের নামঃ {data?.mother_name}</ListItemText>
                <ListItemText sx={{ flexBasis: '50%' }} >মোবাইল নম্বরঃ {data?.mobile}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText sx={{ flexBasis: '50%' }} >এনআইডিঃ {data?.nid}</ListItemText>
                <ListItemText sx={{ flexBasis: '50%' }} >ঠিকানাঃ {data?.address}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText sx={{ flexBasis: '50%' }} >কর্মকর্তার ধরনঃ {data?.employeetypeId?.name_en}</ListItemText>
                <ListItemText sx={{ flexBasis: '50%' }} >স্ট্যাটাসঃ {data?.status}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText sx={{ flexBasis: '50%' }} >অফিসঃ {data?.officeId?.name_en}</ListItemText>
                <ListItemText sx={{ flexBasis: '50%' }} >কেন্দ্র ব্যবস্থাপনার স্থানঃ আগারগাঁও শেরেবাংলানগর</ListItemText>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>

    </Modal>
  )
}

export default ViewModal