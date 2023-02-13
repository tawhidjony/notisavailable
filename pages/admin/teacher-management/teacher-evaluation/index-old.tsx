import { Box, Button, FormControl, Grid, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import BreadCrumb from 'components/common/PageBreadCrumb/BreadCrumb';
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "Store";
import { translate } from "Utils/Handler";
import { LangSetUpForForm } from "Utils/Language/MasterData/Form";
import { LangSetUpForMenu } from "Utils/Language/Menu";
import { LangSetUpForTeacher } from "Utils/Language/TeacherManagement";
import { LangSetUpForTeacherEvaluation } from "Utils/Language/TeacherManagement/TeacherEvaluation";
// import { teacherAddStyle } from "../teachersAdd/teacherAddStyle";


type Props = {}

const TeascherEvaluation = (props: Props) => {
  const { lang, langData } = useSelector((state: RootState) => state.lang);
  const [centerSteps, setcenterSteps] = useState('');
  const [centerCode, setcenterCode] = useState('');
  const handleChange = (event: any) => {
    setcenterSteps(event.target.value);
    setcenterCode(event.target.value);
  };

  const breadcumLink: any = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.teacher_management.key) || 'Teachers' },
    {
      href: '/admin/system_configuration/language', label: translate(langData, lang, LangSetUpForMenu.teacher_management.submodule.teacher_evaluation
        .key) || 'Teacher Evaluation'
    }
  ]
  return (
    <>
      <Box /* sx={{ ...teacherAddStyle } as SxProps} */>
        <Box className="studentAddField">
          <Paper>
            <Box className="breadCrumbBg">
              <BreadCrumb listItems={breadcumLink} />
            </Box>
          </Paper>

          <Box className="studentMainContentField">

            <Box className="studentContentField">
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="space-around"
                alignItems="stretch"
              >
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="studentInput">
                    <FormControl fullWidth>
                      <Typography>
                        {translate(langData, lang, LangSetUpForTeacherEvaluation.form.teacherNameBn.key) || "Teachers Name (Bangla)"}
                      </Typography>
                      <TextField size="small" variant="outlined" />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="studentInput">
                    <FormControl fullWidth>
                      <Typography>
                        {translate(langData, lang, LangSetUpForTeacherEvaluation.form.teacherNameEn.key) || "Teachers Name (English)"}
                      </Typography>
                      <TextField size="small" variant="outlined" />
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="studentInput">
                    <FormControl fullWidth>
                      <Typography>
                        {translate(langData, lang, LangSetUpForTeacher.form.fatherNameBn.key) || "Father Name (Bangla)"}
                      </Typography>
                      <TextField size="small" variant="outlined" />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="studentInput">
                    <FormControl fullWidth>
                      <Typography>
                        {translate(langData, lang, LangSetUpForTeacherEvaluation.form.fatherNameEn.key) || "Father Name (English)"}
                      </Typography>
                      <TextField size="small" variant="outlined" />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="studentInput">
                    <FormControl fullWidth>
                      <Typography>
                        {translate(langData, lang, LangSetUpForTeacherEvaluation.form.motherNameBn.key) || "Mother Name (Bangla)"}
                      </Typography>
                      <TextField size="small" variant="outlined" />
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="studentInput">
                    <FormControl fullWidth>
                      <Typography>
                        {translate(langData, lang, LangSetUpForTeacherEvaluation.form.motherNameEn.key) || "Mother Name (English)"}
                      </Typography>
                      <TextField size="small" variant="outlined" />
                    </FormControl>
                  </Box>
                </Grid>




                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="studentInput">
                    <FormControl fullWidth>
                      <Typography>
                        {translate(langData, lang, LangSetUpForTeacherEvaluation.form.district.key) || "District"}
                      </Typography>
                      <Select
                        size="small"
                        value={centerCode}
                        label="centerCode"
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="studentInput">
                    <FormControl fullWidth>
                      <Typography>
                        {translate(langData, lang, LangSetUpForTeacherEvaluation.form.upazila.key) || "Upazila"}
                      </Typography>
                      <Select
                        size="small"
                        value={centerCode}
                        label="centerCode"
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="studentInput">
                    <FormControl fullWidth>
                      <Typography>
                        {translate(langData, lang, LangSetUpForTeacherEvaluation.form.centerCode.key) || "Center Code"}
                      </Typography>
                      <Select
                        size="small"
                        value={centerCode}
                        label="centerCode"
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="studentInput">
                    <FormControl fullWidth>
                      <Typography>
                        {translate(langData, lang, LangSetUpForTeacherEvaluation.form.centerName.key) || "Center Name"}
                      </Typography>
                      <Select
                        size="small"
                        value={centerCode}
                        label="centerCode"
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="studentInput">
                    <Typography>
                      {translate(langData, lang, LangSetUpForTeacherEvaluation.form.year.key) || "Year"}
                    </Typography>
                    <form className="dateField" noValidate>
                      <TextField
                        size="small"
                        id="date"
                        type="date"
                        defaultValue="2017-05-24"
                        className="textField"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </form>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>

                </Grid>
              </Grid>
            </Box>
          </Box>
          <Paper className="studentBottomField">
            <Box className="studentFieldBottom">
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
              >
                <Box className="clearBtnField">
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box className="stuLeftBtn">
                      <Box className="clearBtn">
                        <Button type="button"> {translate(langData, lang, LangSetUpForForm.reset.key) || "Reset"} </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box className="stuRightBtn">
                      <Box className="addBtn">
                        <Button type="button"> + {translate(langData, lang, LangSetUpForForm.submit.key) || "Submit"} </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Box>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  )
}

export default TeascherEvaluation