import { Button, List, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useGetSessionListQuery } from "Api/Global/Session"
import { useCreateTeacherEvaluationMultipleMutation } from "Api/TeacherManagement/TeacherEvaluation"
import FormInputBootstrap from "components/common/FormItem/FormInputBootstrap"
import FormSelect from "components/common/FormItem/FormSelect"
import TitlePopUp from "components/common/Popover"
import { useHotNotification } from "context/HotNotificationProvider"
import { useEffect, useState } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { RootState } from "Store"
import { listSelectModify, translate } from "Utils/Handler"
import { LangSetUpForTeacher } from "Utils/Language/TeacherManagement"
import { LangSetUpForTeacherEvaluation } from "Utils/Language/TeacherManagement/TeacherEvaluation"

type Props = {
  teacherInfoList: any,
}

const CreateMark = (props: Props) => {

  const { setVisible, setNotification } = useHotNotification()
  const { teacherInfoList } = props
  const { data: sessionList } = useGetSessionListQuery()
  const [createTeacherEvaluationMultiple] = useCreateTeacherEvaluationMultipleMutation()

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const findCurrentYear = sessionList?.data?.find((data: any) => data.name_en === currentYear.toString())

  const teacherInfoEvaluationArray = teacherInfoList?.data?.map((data: any) => {
    let teacherEvaluationCheck = data?.teacherEvalution?.length
    let evaluationFilterWithYear = data?.teacherEvalution?.find((year: any) => year?.sessionInfo?.name_en === currentYear.toString())
    if (teacherEvaluationCheck === 0) {
      return {
        teacherId: data?.id,
        name_en: data?.name_en,
        father_name: data?.father_name,
        mother_name: data?.mother_name,
        districtId: data?.districtId?.name_en,
        upazilaId: data?.upazilaId?.name_en,
        learning_center_code: data?.learning_center_id?.code,
        learning_center_id: data?.learning_center_id?.name_en,
        sessionId: findCurrentYear?.id,
        tec_material: "",
        annual_attendance: "",
        cleanliness: "",
        check_lesson: "",
        discipline: "",
        no_meeting: "",
        lesson_plan: "",
        other_program: "",
        overall_consideration: "",
        total_mark: "",
      }
    } else {

      return {
        teacherId: data?.id,
        name_en: data?.name_en,
        father_name: data?.father_name,
        mother_name: data?.mother_name,
        districtId: data?.districtId?.name_en,
        upazilaId: data?.upazilaId?.name_en,
        learning_center_code: data?.learning_center_id?.code,
        learning_center_id: data?.learning_center_id?.name_en,
        sessionId: evaluationFilterWithYear?.sessionId,
        tec_material: evaluationFilterWithYear?.tec_material,
        annual_attendance: evaluationFilterWithYear?.annual_attendance,
        cleanliness: evaluationFilterWithYear?.cleanliness,
        check_lesson: evaluationFilterWithYear?.check_lesson,
        discipline: evaluationFilterWithYear?.discipline,
        no_meeting: evaluationFilterWithYear?.no_meeting,
        lesson_plan: evaluationFilterWithYear?.lesson_plan,
        other_program: evaluationFilterWithYear?.other_program,
        overall_consideration: evaluationFilterWithYear?.overall_consideration,
        total_mark: evaluationFilterWithYear?.total_mark,
      }
    }

  })

  const methods = useForm({
    defaultValues: {
      teacherEvaluations: teacherInfoEvaluationArray
    }
  })

  const { control, reset, watch, setValue } = methods
  const { fields } = useFieldArray({ control, name: "teacherEvaluations" });

  const teacherEvaluationSubmit = async (item: any) => {
    let modifyData = item?.teacherEvaluations?.map((val: any) => {
      return {
        teacherId: val?.teacherId,
        sessionId: val?.sessionId,
        tec_material: val?.tec_material,
        annual_attendance: val?.annual_attendance,
        cleanliness: val?.cleanliness,
        check_lesson: val?.check_lesson,
        discipline: val?.discipline,
        no_meeting: val?.no_meeting,
        lesson_plan: val?.lesson_plan,
        other_program: val?.other_program,
        overall_consideration: val?.overall_consideration,
        total_mark: val?.total_mark,
        comment: "",
      }
    })
    try {
      await createTeacherEvaluationMultiple(modifyData).unwrap().then((res) => {
        if (res) {
          setVisible(true);
          setNotification({
            autoClose: true,
          })
        }
      })
    } catch (error) {

    }
  }

  useEffect(() => {
    reset({
      teacherEvaluations: teacherInfoEvaluationArray
    })
  }, [reset, teacherInfoList])

  const { lang, langData } = useSelector((state: RootState) => state.lang);

  return (
    <FormProvider {...methods} >
      {teacherInfoList?.data === undefined ? "" : teacherInfoList?.data.length > 0 ? (
        <Paper className="paperBody">
          <Box className="tableField tableSpacing" sx={{ padding: '10px' }} component="form" onSubmit={methods.handleSubmit(teacherEvaluationSubmit)}>
            <TableContainer className='tableContentField' >
              <Table className='table'>
                <TableHead>
                  <TableRow>
                    <TableCell className="TableHead" width={'8%'} >
                      {translate(langData, lang, LangSetUpForTeacher.list.teacherName.key) || "Teacher Name"}
                    </TableCell>
                    <TableCell className="TableHead" width={'7%'} >
                      {translate(langData, lang, LangSetUpForTeacherEvaluation.form.centerCode.key) || "Center Code"}
                    </TableCell>

                    <TableCell className="TableHead" width={'7%'}>
                      {translate(langData, lang, LangSetUpForTeacherEvaluation.form.centerName.key) || "Center Name"}
                    </TableCell>

                    <TableCell className="TableHead" width={'7%'} >
                      {translate(langData, lang, LangSetUpForTeacherEvaluation.form.year.key) || "Year"}
                    </TableCell>

                    <TableCell className="TableHead" width={'7%'}>
                      <TitlePopUp sortTitle={translate(langData, lang, LangSetUpForTeacherEvaluation.list.educationMaterials.key) || "Educational materials and educational aids used correctly  Total=10"} longTitle={translate(langData, lang, LangSetUpForTeacherEvaluation.list.educationMaterialsHover.key) || "Signboard-1, blackboard-1, The Mat-1, Book and Shelt-1, Chalk and duster-1, Attendance Book-1, Textbook-1,  Total=10"} />
                    </TableCell>
                    <TableCell className="TableHead" width={'7%'} >
                      <TitlePopUp sortTitle='Average Annual  student attendance  Total=20' longTitle='100%-80%=20, 79%-75%=19, 74%-65%=18, 64%-60%=17, 59%-55%=16, Below 54%=15 Total=20 ' />

                    </TableCell>
                    <TableCell className="TableHead" width={'7%'} >
                      <TitlePopUp sortTitle=' Cleanliness  Total=10' longTitle='Center Environment=6, Cleanliness of students clothes, teeth, nails and hair=4 Total=10' />

                    </TableCell>
                    <TableCell className="TableHead" width={'5%'} >
                      <TitlePopUp sortTitle=' Whether the progress is  Total=15' longTitle='checked after the completion of the prescribed lessons (Total=15)' />

                    </TableCell>
                    <TableCell className="TableHead" width={'7%'}>
                      <TitlePopUp sortTitle='Discipline/Timely Center Open and Manage  Total=10' longTitle='Inspection Register=6, Center Committee=4 Total=10' />

                    </TableCell>
                    <TableCell className="TableHead" width={'7%'}>
                      <TitlePopUp sortTitle='Whether the prescribed number of meetings of the Central Monitoring Committee have been held or not  Total=10' longTitle='12 Meetings=10, 11 Meetings=9, 10 Meetings=8, 9 Meetings=7, 8 Meetings=6, 6-7 meetings=6=5, Below 6 meetings=0 Total=10' />

                    </TableCell>
                    <TableCell className="TableHead" width={'7%'} >
                      <TitlePopUp sortTitle=' Lesson plan followed properly' longTitle='Lesson plan followed properly (According to inspection register the number is provide) Total=15[Best=15, Better=12, Good=10, Avg=8]' />

                    </TableCell>
                    <TableCell className="TableHead" width={'7%'}>
                      <TitlePopUp sortTitle='Have you implemented anti-dowry programs, tree planting,  Total=10' longTitle='If the teacher is an imam then through Friday sermon and among the parents of the center students and if the teacher is an general teacher then among the adult center students and among the parents in the pre-primary center - Total=10' />

                    </TableCell>
                    <TableCell className="TableHead" width={'7%'}>
                      <TitlePopUp sortTitle='Overall Consideration- Total=5' longTitle='Overall Consideration- Total=5' />

                    </TableCell>
                    <TableCell className="TableHead" width={'7%'}>
                      <TitlePopUp sortTitle='Total Marks' longTitle='Total Marks' />

                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((val: any, index: any) => {
                    let tecMaterial = parseFloat(watch(`teacherEvaluations.${index}.tec_material`) || 0);
                    let annualAttendance = parseFloat(watch(`teacherEvaluations.${index}.annual_attendance`) || 0)
                    let cleanliness = parseFloat(watch(`teacherEvaluations.${index}.cleanliness`) || 0)
                    let checkLesson = parseFloat(watch(`teacherEvaluations.${index}.check_lesson`) || 0)
                    let discipline = parseFloat(watch(`teacherEvaluations.${index}.discipline`) || 0)
                    let noMeeting = parseFloat(watch(`teacherEvaluations.${index}.no_meeting`) || 0)
                    let lessonPlan = parseFloat(watch(`teacherEvaluations.${index}.lesson_plan`) || 0)
                    let otherProgram = parseFloat(watch(`teacherEvaluations.${index}.other_program`) || 0)
                    let overallConsideration = parseFloat(watch(`teacherEvaluations.${index}.overall_consideration`) || 0)
                    let evaluationTotalsMark = (tecMaterial + annualAttendance + cleanliness + checkLesson + discipline + noMeeting + lessonPlan + otherProgram + overallConsideration)
                    setValue(`teacherEvaluations.${index}.total_mark`, evaluationTotalsMark)

                    const Info = () => {
                      return (
                        <List key={index}>
                          <ListItemText>Father Name: {val.father_name}</ListItemText>
                          <ListItemText>Mother Name: {val.mother_name}</ListItemText>
                          <ListItemText>District: {val.districtId}</ListItemText>
                          <ListItemText>Upazila: {val.upazilaId}</ListItemText>
                        </List>
                      )
                    }
                    return (<>
                      <TableRow key={index}>
                        <TableCell className="TableContent">
                          <TitlePopUp sortTitle={val.name_en} component={<Info />} />
                        </TableCell>
                        <TableCell className="TableContent">{val.learning_center_code}</TableCell>
                        <TableCell className="TableContent">{val.learning_center_id}</TableCell>
                        <TableCell className="TableContent">
                          <FormSelect name={`teacherEvaluations.${index}.sessionId`} defaultValue={currentYear} size="small" id='Exam Name' dataSource={listSelectModify(sessionList?.data)} />
                        </TableCell>
                        <TableCell className="TableContent">
                          <FormInputBootstrap InputProps={{ inputProps: { min: 0, max: 10 } }} type="number" name={`teacherEvaluations.${index}.tec_material`} placeholder='tec_material' />
                        </TableCell>
                        <TableCell className="TableContent">
                          <FormInputBootstrap InputProps={{ inputProps: { min: 0, max: 20 } }} type="number" name={`teacherEvaluations.${index}.annual_attendance`} placeholder='annual_attendance' />
                        </TableCell>
                        <TableCell className="TableContent">
                          <FormInputBootstrap InputProps={{ inputProps: { min: 0, max: 10 } }} type="number" name={`teacherEvaluations.${index}.cleanliness`} placeholder='cleanliness' />
                        </TableCell>
                        <TableCell className="TableContent">
                          <FormInputBootstrap InputProps={{ inputProps: { min: 0, max: 15 } }} type="number" name={`teacherEvaluations.${index}.check_lesson`} placeholder='check_lesson' />
                        </TableCell>
                        <TableCell className="TableContent">
                          <FormInputBootstrap InputProps={{ inputProps: { min: 0, max: 10 } }} type="number" name={`teacherEvaluations.${index}.discipline`} placeholder='discipline' />
                        </TableCell>
                        <TableCell className="TableContent">
                          <FormInputBootstrap InputProps={{ inputProps: { min: 0, max: 10 } }} type="number" name={`teacherEvaluations.${index}.no_meeting`} placeholder='no_meeting' />
                        </TableCell>
                        <TableCell className="TableContent">
                          <FormInputBootstrap InputProps={{ inputProps: { min: 0, max: 10 } }} type="number" name={`teacherEvaluations.${index}.lesson_plan`} placeholder='lesson_plan' />
                        </TableCell>
                        <TableCell className="TableContent">
                          <FormInputBootstrap InputProps={{ inputProps: { min: 0, max: 10 } }} type="number" name={`teacherEvaluations.${index}.other_program`} placeholder='other_program' />
                        </TableCell>
                        <TableCell className="TableContent">
                          <FormInputBootstrap InputProps={{ inputProps: { min: 0, max: 5 } }} type="number" name={`teacherEvaluations.${index}.overall_consideration`} placeholder='overall_consideration' />
                        </TableCell>
                        <TableCell className="TableContent">
                          <FormInputBootstrap type="number" name={`teacherEvaluations.${index}.total_mark`} placeholder='total_mark' />
                        </TableCell>
                      </TableRow>
                    </>)
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={14} sx={{ border: "none", padding: "0px" }} >
                      <Box sx={{ padding: '5px 0px', display: "flex", justifyContent: 'flex-end', alignItems: "center", gap: 1 }}  >
                        <Button type="submit" className="searchBtn">Save</Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      ) : (
        <Paper className="paperBody">
          <TableContainer className='tableContentField' >
            <Table className='table'>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={13} align="center" >
                    <Typography variant="h4"  >Data Not Found!</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </FormProvider>
  )
}

export default CreateMark