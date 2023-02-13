import { Button, Card, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useGetDegreeListQuery } from 'Api/Global/Degree';
import FormInputBootstrap, { FormInputLabel } from 'components/common/FormItem/FormInputBootstrap';
import FormSelect from 'components/common/FormItem/FormSelect';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from 'Store';
import { DeleteIcon } from 'Utils/CustomIcons';
import { listSelectModify, translate } from 'Utils/Handler';
import { LangSetUpForTeacher } from 'Utils/Language/TeacherManagement';

const DeleteButton = styled(Button)({
  padding: 0,
  minWidth: '32px',
  height: '36px',
  '& .MuiButton-startIcon': {
    marginRight: 0,
    marginLeft: 0
  }
})


const TeacherDegree = () => {

  const { control, register, watch } = useFormContext();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({ control, name: "teacherEducations" });
  const { currentData } = useGetDegreeListQuery()
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  return (
    <Card sx={{ padding: '1rem' }} >
      {fields.map((field, index) => (
        <Grid container spacing={2} key={index} >
          <Grid item md={2} >
            <FormInputLabel htmlFor="Exam Name" >Name of Degree</FormInputLabel>
            <FormSelect name={`teacherEducations.${index}.degreeId`} size="small" id='Exam Name' dataSource={listSelectModify(currentData?.data)} />
          </Grid>
          <Grid item md={2} >
            <FormInputLabel htmlFor="Roll Number" >Department</FormInputLabel>
            <FormInputBootstrap name={`teacherEducations.${index}.department`} size="small" id='Roll Number' />
          </Grid>
          <Grid item md={2} >
            <FormInputLabel htmlFor="Roll Number" >Institute Name </FormInputLabel>
            <FormInputBootstrap name={`teacherEducations.${index}.institute_name`} size="small" id='Exam Name' />
          </Grid>
          <Grid item md={2} >
            <FormInputLabel htmlFor="Roll Number" >  Board/University  </FormInputLabel>
            <FormInputBootstrap name={`teacherEducations.${index}.board`} size="small" id='Exam Name' />
          </Grid>
          <Grid item md={2} >
            <FormInputLabel htmlFor="Roll Number" >  Passing Year </FormInputLabel>
            <FormInputBootstrap name={`teacherEducations.${index}.passing_year`} size="small" id='Exam Name' />
          </Grid>
          <Grid item md={1.4} >
            <FormInputLabel htmlFor="Roll Number" >  CGPA/Grade  </FormInputLabel>
            <FormInputBootstrap name={`teacherEducations.${index}.cgpa`} size="small" id='Exam Name' />
          </Grid>
          <Grid item md={.5} >
            <FormInputLabel sx={{ marginBottom: '2rem' }} ></FormInputLabel>
            <DeleteButton startIcon={<DeleteIcon />} variant="outlined" onClick={() => { remove(index) }} />
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ marginTop: '1rem' }}
          onClick={() => {
            append({ degreeId: "", department: "", institute_name: "", board: "", passing_year: "", cgpa: "" });
          }}
        >
          {translate(langData, lang, LangSetUpForTeacher.form.addTeacherDegree.key) || "Add Teacher Degree"}
        </Button>
      </Grid>
    </Card>
  )
}

export default TeacherDegree