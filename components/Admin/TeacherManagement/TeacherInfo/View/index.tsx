import { Button, Divider, Grid, List, ListItem, ListItemText, ListSubheader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormLayout, FormLayoutBody } from "components/layouts/FormLayout";
import moment from "moment";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "Store";
import { translate } from "Utils/Handler";
import { LangSetUpForEmployee } from "Utils/Language/EmployeeManagement";
import { LangSetUpForForm } from "Utils/Language/MasterData/Form";
import { LangSetUpForList } from "Utils/Language/MasterData/List";
import { LangSetUpForStudent } from "Utils/Language/StudentManagement";
import { LangSetUpForDistrict } from "Utils/Language/SystemConfiguration/District";
import { LangSetUpForEmployeeType } from "Utils/Language/SystemConfiguration/EmployeeType";
import { LangSetUpForTeacher } from "Utils/Language/TeacherManagement";


const ViewTeacherInfo = (props: any) => {
  const { data, isLoading } = props && props?.data;
  const { lang, langData } = useSelector((state: RootState) => state.lang);


  return (
    <FormLayout spinLoading={isLoading}>
      <FormLayoutBody>

        <Box p={5} sx={{ position: "relative" }}>
          <Button className="backBtn" sx={{
            position: 'absolute',
            top: '20px',
            right: '20px',
          }}
            type="button"
            LinkComponent={Link}
            href="/admin/teacher-management/teacher-info"
          >
            {translate(langData, lang, LangSetUpForForm.back.key) || "Back"} </Button>
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column', marginBottom: 5 }} >
            <Typography id="modal-modal-title" variant="h4" component="h2"> মসজিদভিত্তিক শিশু ও গণশিক্ষা কার্যক্রম </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2"> ইসলামিক ফাউন্ডেশন </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2"> আগারগাঁও শেরেবাংলানগর, ঢাকা-১২০৭ </Typography>
          </Box>
          <Divider />

          <Box className="textViewField">
            <List>
              <ListItem >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }} >
                      <span className="textProperty">{translate(langData, lang, LangSetUpForEmployeeType.list.name_en.key) || "Name (English)"}</span>
                      &nbsp; : {data?.data?.name_en}
                    </ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }} >
                      <span className="textProperty">{translate(langData, lang, LangSetUpForEmployeeType.list.name_bn.key) || "Name (Bangla)"}</span>
                      &nbsp; : {data?.data?.name_bn}
                    </ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }} >
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.teacherId.key) || "Teacher ID"}</span>
                      &nbsp; : {data?.data?.cluster_number}
                    </ListItemText>
                  </Grid>
                </Grid>
              </ListItem >

              <ListItem >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }} >
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.list.nid.key) || "NID"}</span>
                      &nbsp; : {data?.data?.nid}
                    </ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }} >
                      <span className="textProperty">{translate(langData, lang, LangSetUpForStudent.form.fatherName.key) || "Father Name"}</span>
                      &nbsp;: {data?.data?.father_name}</ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForStudent.form.mother.key) || "Mother Name"}</span>
                      &nbsp;: {data?.data?.mother_name}</ListItemText>
                  </Grid>
                </Grid>
              </ListItem >

              <ListItem >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.dateOfBirth.key) || "Date of birth"}</span>
                      &nbsp;: {moment(data?.data?.dob).format('DD-MM-YYYY')}</ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.list.mobile.key) || "Mobile No"}</span>
                      &nbsp;: {data?.data?.mobile}</ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForEmployee.form.dateOfJoining.key) || "Date of Join"}</span>
                      &nbsp;: {moment(data?.data?.doj).format('DD-MM-YYYY')}</ListItemText>
                  </Grid>
                </Grid>
              </ListItem >

              <ListItem >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }} >
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.startTime.key) || "Start Time"}</span>
                      &nbsp;: {moment(data?.data?.start_time).format('DD-MM-YYYY')}</ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.endTime.key) || "End Time"}</span>
                      &nbsp;: {moment(data?.data?.end_time).format('DD-MM-YYYY')}</ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.area.key) || "Area"}</span>
                      &nbsp;: {data?.data?.area}</ListItemText>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.bankName.key) || "Bank Name"}</span>
                      &nbsp;: {data?.data?.bank_name}</ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.branchName.key) || "Branch Name"}</span>
                      &nbsp;: {data?.data?.branch_name}</ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.accountNumber.key) || "Account No"}</span>
                      &nbsp;: {data?.data?.account}</ListItemText>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.routing.key) || "Routing"}</span>
                      &nbsp;: {data?.data?.routing}</ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.nature.key) || "Nature"}</span>
                      &nbsp;: {data?.data?.nature}</ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.training.key) || "Training"}</span>
                      &nbsp;: {data?.data?.training}</ListItemText>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.list.photo.key) || "Photo"}</span>
                      &nbsp;: {data?.data?.photo}</ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForList.status.key) || "Status"}</span>
                      &nbsp;: {data?.data?.status}</ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.gender.key) || "Gender"}</span>
                      &nbsp;: {data?.data?.gender_id?.name_en}</ListItemText>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.courseId.key) || "Course ID"}</span>
                      &nbsp;: {data?.data?.course_id?.name_en}</ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.upazila.key) || "Upazila"}</span>
                      &nbsp;: {data?.data?.upazilaId?.name_en}</ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForDistrict.list.division.key) || "Division"}</span>
                      &nbsp;: {data?.data?.divisionId?.name_en}</ListItemText>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.district.key) || "District"}</span>
                      &nbsp;: {data?.data?.districtId?.name_en}</ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }}>
                      <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.list.center.key) || "Center"}</span>
                      &nbsp;: {data?.data?.learning_center_id?.name_en}</ListItemText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <ListItemText sx={{ flexBasis: '33.33%', }} ></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            </List>

            <List>
              <ListSubheader sx={{ fontSize: 16, color: "#000" }}>
                <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.list.academicQualification.key) || "Academic Qualification"}</span>
              </ListSubheader>
              <TableContainer>
                <Table sx={{ border: '1px solid #f1f2f1' }} >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.nameOfDegree.key) || "Name of Degree"}</span>
                      </TableCell>
                      <TableCell>
                        <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.department.key) || "Department"}</span>
                      </TableCell>
                      <TableCell>
                        <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.list.instituteName.key) || "Institute Name"}</span>
                      </TableCell>
                      <TableCell>
                        <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.boardUniversity.key) || "Board/University"}</span>
                      </TableCell>
                      <TableCell>
                        <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.passingYear.key) || "Passing Year"}</span>
                      </TableCell>
                      <TableCell>
                        <span className="textProperty">{translate(langData, lang, LangSetUpForTeacher.form.cgpaGrade.key) || "CGPA/Grade"}</span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.data?.educations?.map((item: any, index: any) => (
                      <TableRow key={index} >
                        <TableCell>{item.degreeInfo.name_en}</TableCell>
                        <TableCell>{item.department}</TableCell>
                        <TableCell>{item.institute_name}</TableCell>
                        <TableCell>{item.board}</TableCell>
                        <TableCell>{item.passing_year}</TableCell>
                        <TableCell>{item.cgpa}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </List>
          </Box>
        </Box>
      </FormLayoutBody>
    </FormLayout>
  )
}

export default ViewTeacherInfo