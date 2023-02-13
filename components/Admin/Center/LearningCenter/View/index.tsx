import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Divider, List, ListItem, ListItemText, Modal, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { RootState } from "Store";
import { PrintIcon } from "Utils/CustomIcons";
import { translate } from "Utils/Handler";
import { LangSetUpForCenter } from "Utils/Language/CenterManagement";
import { LangSetUpForList } from "Utils/Language/MasterData/List";
import { LangSetUpForMenu } from "Utils/Language/Menu";
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 1024,
  padding: '5px 32px 32px;',
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
const ViewLearningCenter = ({ data, open, closeState }: Props) => {
  const componentRef = useRef(null)
  // const [open, setOpen] = useState(false);
  const [show, setHide] = useState(false);
  const { lang, langData } = useSelector((state: RootState) => state.lang);

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
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="modalDesign">
        <Button type="button" className="printButton" onClick={handleClickToPrint} startIcon={<PrintIcon />}>
          {translate(langData, lang, LangSetUpForList.print.key) || "Print"}
        </Button>
        <Typography className="printButtonClose" onClick={handleClose}> <CloseIcon /> </Typography>
        <Box ref={componentRef} sx={{ padding: '1rem' }} >
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column', marginBottom: 5 }} >
            <Typography id="modal-modal-title" variant="h4" component="h2"> মসজিদভিত্তিক শিশু ও গণশিক্ষা কার্যক্রম </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2"> ইসলামিক ফাউন্ডেশন </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2"> আগারগাঁও শেরেবাংলানগর, ঢাকা-১২০৭ </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h3">  শিক্ষা কেন্দ্রের বিস্তারিত </Typography>
          </Box>
          <Divider />
          <Box >
            <List >
              <ListItem>
                <ListItemText><Typography component="span" className="label">
                  {translate(langData, lang, LangSetUpForCenter.list.centerCode.key) || "কেন্দ্রের কোড"}
                </Typography><Typography component="span" className="details">{data?.code}</Typography></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText><Typography component="span" className="label">
                  {translate(langData, lang, LangSetUpForCenter.list.centerName.key) || "রিসোর্স সেন্টার নামঃ (বাংলা)"}
                </Typography><Typography component="span" className="details">{data?.name_bn}</Typography></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText><Typography component="span" className="label">
                  {translate(langData, lang, LangSetUpForCenter.list.centerName.key) || "রিসোর্স সেন্টার নামঃ  (ইংরেজি)"}
                </Typography><Typography component="span" className="details">{data?.name_en}</Typography></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText><Typography component="span" className="label">
                  {translate(langData, lang, LangSetUpForCenter.list.centerLevel.key) || "কেন্দ্রের ধরন"}
                </Typography><Typography component="span" className="details">{data?.centertypeId.name_bn}</Typography></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText><Typography component="span" className="label">
                  {translate(langData, lang, LangSetUpForCenter.form.center_location.key) || "কেন্দ্রের ভৌগলিক অবস্থানঃ"}
                </Typography><Typography component="span" className="details">{data?.latitude} - {data?.longitude}</Typography></ListItemText>
              </ListItem>
              <hr />
              <ListItem>
                <ListItemText sx={{ flexBasis: '50%' }} ><Typography component="span" className="label">
                  {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "বিভাগঃ"}
                </Typography><Typography component="span" className="details">{data?.divisionId?.name_en}</Typography></ListItemText>
                <ListItemText sx={{ flexBasis: '50%' }} ><Typography component="span" className="label">
                  {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "জেলাঃ"}
                </Typography><Typography component="span" className="details">{data?.districtId?.name_en}</Typography></ListItemText>
              </ListItem>

              <ListItem>
                <ListItemText sx={{ flexBasis: '50%' }} ><Typography component="span" className="label">
                  {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "উপজেলাঃ"}
                </Typography><Typography component="span" className="details">{data?.upazilaId?.name_bn}</Typography></ListItemText>
                <ListItemText sx={{ flexBasis: '50%' }} ><Typography component="span" className="label">
                  {translate(langData, lang, LangSetUpForCenter.form.union.key) || "ইউনিয়ন/ওয়ার্ড নংঃ"}
                </Typography><Typography component="span" className="details">{data?.union}</Typography></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText sx={{ flexBasis: '50%' }} ><Typography component="span" className="label">
                  {translate(langData, lang, LangSetUpForCenter.form.village.key) || "এলাকা / গ্রামঃ"}
                </Typography><Typography component="span" className="details">{data?.area}</Typography></ListItemText>
              </ListItem>
              <hr />
              <ListItem>
                <ListItemText sx={{ flexBasis: '50%' }} ><Typography component="span" className="label">
                  {translate(langData, lang, LangSetUpForCenter.form.center_place.key) || " কেন্দ্র ব্যবস্থাপনার স্থানঃ"}
                </Typography><Typography component="span" className="details">{data?.address}</Typography></ListItemText>
              </ListItem>

              <ListItem>
                <ListItemText sx={{ flexBasis: '50%' }} ><Typography component="span" className="label">
                  {translate(langData, lang, LangSetUpForCenter.form.center_description.key) || "কেন্দ্রের বিবরণঃ"}
                </Typography><Typography component="span" className="details">{data?.description}</Typography></ListItemText>
                <ListItemText sx={{ flexBasis: '50%' }} ><Typography component="span" className="label">
                  {translate(langData, lang, LangSetUpForCenter.form.center_picture.key) || "ছবি"}
                </Typography>
                  <img
                    className='previewImg showImage'
                    src={process.env.FILE_URL + '/' + data?.photo}
                    alt=""
                  />
                </ListItemText>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>

    </Modal>
  )
}

export default ViewLearningCenter