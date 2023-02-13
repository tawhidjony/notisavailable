import { Box, Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useExportToPrimaryAdmissionListPDFMutation } from "Api/StudentManagement/PrimaryAdmission";
import { FormLayout, FormLayoutBody } from "components/layouts/FormLayout";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "Store";
import { ExcelIcon, PdfIcon, PrintIcon } from "Utils/CustomIcons";
import { translate } from "Utils/Handler";
import { LangSetUpForList } from "Utils/Language/MasterData/List";
import { ViewStyle } from "./viewStyle";



const ViewPrimaryAdmission = (props: any) => {
  const admissionData = props && props?.data;

  const { lang, langData } = useSelector((state: RootState) => state.lang);

  const [exportToPDF] = useExportToPrimaryAdmissionListPDFMutation();

  const handleExportToPdf = async () => {
    const headerColumns = [
      "SL",
      "Student Name",
      "Father Name",
      "Mother Name",
      "Roll No",
      "Village Name",
      "Admitted Institution Name",
      "Admission on: 1st/2nd class"
    ];
    const panelSearch = `learningCenterId: ${admissionData?.[0]?.learningCenterId}$sessionId=${admissionData?.[0]?.sessionInfo?.id}`;
    const data = {
      headerColumns,
      totalColumns: headerColumns.length,
      panelSearch
    };
    try {
      await exportToPDF(data);
    } catch (error) {
      console.error("PDF err ", error);
    }
  };


  return (
    <>
      <FormLayout>
        <FormLayoutBody>
          <Box className="downloadField">
            <ul className="exportSec">
              <li>
                <Button type="button" startIcon={<ExcelIcon />}>
                  {translate(langData, lang, LangSetUpForList.export_to_excel.key) || "Export to Excel"}
                </Button>
              </li>
              <li>
                <Button onClick={handleExportToPdf} type="button" startIcon={<PdfIcon />}>
                  {translate(langData, lang, LangSetUpForList.export_to_pdf.key) || "Export to Pdf"}
                </Button>
              </li>
              <li>
                <Button type="button" startIcon={<PrintIcon />}>
                  {translate(langData, lang, LangSetUpForList.print.key) || "Print"}
                </Button>
              </li>
            </ul>
          </Box>
          <Box p={5} sx={{ ...ViewStyle }}>
            <Button sx={{
              position: 'absolute',
              top: '20px',
              left: '20px',
            }}
              type="button"
              LinkComponent={Link}
              href="/admin/student-management/primary-school-admission"
            > Back </Button>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column', marginBottom: 5 }} >
              <Typography id="modal-modal-title" variant="h4" component="h2">মসজিদভিত্তিক শিশু ও গণশিক্ষা কার্যক্রম</Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">ইসলামিক ফাউন্ডেশন</Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">ধর্ম বিষয়ক মন্ত্রণালয়</Typography>
              <Typography id="modal-modal-title" variant="h5" component="h2">{admissionData?.length && admissionData[0]?.sessionInfo?.name_bn} শিক্ষাবর্ষে শিক্ষার্থীদের বিদ্যালয় / মাদ্রাসার ভর্তি ছক</Typography>
            </Box>
            <Box>
              <span>কেন্দ্রের নামঃ</span>
              <span className="colorText">{admissionData?.length && admissionData[0]?.learningCenterInfo?.name_bn}</span>
              <span> কোড নম্বরঃ </span>
              <span className="colorText">{admissionData?.length && admissionData[0]?.learningCenterInfo?.code}</span>
              <span> উপজেলাঃ </span>
              <span className="colorText">{admissionData?.length && admissionData[0]?.learningCenterInfo?.upazilaId?.name_bn}</span>
              <span> জেলাঃ </span>
              <span className="colorText">{admissionData?.length && admissionData[0]?.learningCenterInfo?.districtId?.name_bn} </span>
            </Box>
            <Divider />
            <Box>
              <TableContainer className='tableContentField' >
                <Table className='table'>
                  <TableHead>
                    <TableRow>
                      <TableCell className="TableHead" width={'2%'} >
                        SL
                      </TableCell>
                      <TableCell className="TableHead" width={'8%'} >
                        Student Name
                      </TableCell>
                      <TableCell className="TableHead" width={'7%'} >
                        Father Name
                      </TableCell>
                      <TableCell className="TableHead" width={'7%'} >
                        Mother Name
                      </TableCell>
                      <TableCell className="TableHead" width={'5%'} >
                        Roll No
                      </TableCell>
                      <TableCell className="TableHead" width={'7%'} >
                        Village Name
                      </TableCell>
                      <TableCell className="TableHead" width={'20%'} >
                        Admitted Institution Name
                      </TableCell>
                      <TableCell className="TableHead" width={'10%'} >
                        Admission on: 1st/2nd class
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {admissionData?.map((val: any, index: any) => (
                      <TableRow key={val.id}>
                        <TableCell className="TableContent">{index + 1}</TableCell>
                        <TableCell className="TableContent">
                          {val.studentInfo.name_en}
                        </TableCell>
                        <TableCell className="TableContent">{val.studentInfo.father_name_bn}</TableCell>
                        <TableCell className="TableContent">{val.studentInfo.mother_name_bn}</TableCell>
                        <TableCell className="TableContent">{val.studentInfo.roll_number}</TableCell>
                        <TableCell className="TableContent">{val.studentInfo.village}</TableCell>
                        <TableCell className="TableContent">
                          {val.institute_name}
                        </TableCell>
                        <TableCell className="TableContent">
                          {val.admission_on}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </FormLayoutBody>
      </FormLayout>
    </>
  )
}

export default ViewPrimaryAdmission