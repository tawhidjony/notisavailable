import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, Grid, Paper } from "@mui/material"
import { useGetLearningCenterListQuery, useShowLearningCenterQuery } from "Api/Center/LearningCenter"
import { useGetCourseListQuery } from "Api/Global/Course"
import { useGetGenderListQuery } from "Api/Global/Gender"
import { useGetDistrictListQuery } from "Api/SystemConfiguration/District"
import { useGetDivisionListQuery } from "Api/SystemConfiguration/Division"
import { useGetUpazilaListQuery } from "Api/SystemConfiguration/Upazila"
import { useCreateTeacherInfoMutation } from "Api/TeacherManagement/TeacherInfo"
import FormAutocomplete from "components/common/FormItem/FormAutocomplete"
import FormDatePicker from "components/common/FormItem/FormDatePicker"
import FormFileUpload from "components/common/FormItem/FormFileUpload"
import FormInputBootstrap, { FormInputLabel } from "components/common/FormItem/FormInputBootstrap"
import BreadCrumb from "components/common/PageBreadCrumb/BreadCrumb"
import { FormLayout, FormLayoutBody, FormLayoutContent, FormLayoutFooter } from "components/layouts/FormLayout"
import { useHotNotification } from "context/HotNotificationProvider"
import moment from "moment"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { RootState } from "Store"
import { listArrayModify, translate } from "Utils/Handler"
import { LangSetUpForEmployee } from "Utils/Language/EmployeeManagement"
import { LangSetUpForForm } from "Utils/Language/MasterData/Form"
import { LangSetUpForMenu } from "Utils/Language/Menu"
import { LangSetUpForDesignation } from "Utils/Language/SystemConfiguration/Designation"
import { LangSetUpForTeacher } from "Utils/Language/TeacherManagement"
import { TypeOf } from "yup"
import { createSchemaValidation } from "../Schema"
import TeacherDegree from "./TeacherDegree"

type IGetDependencyData = {
  divisionId: {
    name_en: string,
    id: string,
  },
  districtId: {
    name_en: string,
    id: string,
  },
  upazilaId: {
    name_en: string,
    id: string,
  }
}

const CreateTeacherInfo = () => {

  const { setVisible, setNotification } = useHotNotification()
  const { lang, langData } = useSelector((state: RootState) => state.lang);
  const [getDependency, setGetDependencyData] = useState<IGetDependencyData | null>(null)

  type IFormTeacherInfoCreateSchema = TypeOf<typeof createSchemaValidation>;

  const defaultValues: IFormTeacherInfoCreateSchema = {
    learning_center_id: { label: "", value: "" },
    course_id: { label: "", value: "" },
    name_en: "",
    name_bn: "",
    cluster_number: "",
    gender_id: { label: "", value: "" },
    nid: "",
    father_name: "",
    mother_name: "",
    dob: "",
    mobile: "",
    doj: "",
    start_time: "",
    end_time: "",
    divisionId: { label: "", value: "" },
    districtId: { label: "", value: "" },
    upazilaId: { label: "", value: "" },
    area: "",
    bank_name: "",
    branch_name: "",
    account: "",
    routing: "",
    nature: "",
    training: "",
    photo: "",
    teacherEducations: [{ degreeId: "", department: "", institute_name: "", board: "", passing_year: "", cgpa: "" }]
  }

  const methods = useForm<IFormTeacherInfoCreateSchema>({ mode: "all", reValidateMode: "onChange", resolver: yupResolver(createSchemaValidation), defaultValues })



  const { data: genderList } = useGetGenderListQuery()
  const { data: courseList } = useGetCourseListQuery()
  const { data: divisionList } = useGetDivisionListQuery()
  const { data: districtList } = useGetDistrictListQuery("")
  const { data: upazilaList } = useGetUpazilaListQuery("")

  const { data: learningShowCenter, refetch } = useShowLearningCenterQuery(methods.watch('learning_center_id')?.value)
  const { data: learningCenterList } = useGetLearningCenterListQuery("")

  const [createTeacherInfo] = useCreateTeacherInfoMutation()

  const onSubmitHandler: SubmitHandler<IFormTeacherInfoCreateSchema> = async (item: any) => {


    const modifyData = {
      ...item,
      learning_center_id: item?.learning_center_id?.value,
      course_id: item?.course_id?.value,
      gender_id: item?.gender_id?.value,
      divisionId: item?.divisionId?.value,
      districtId: item?.districtId?.value,
      upazilaId: item?.upazilaId?.value,
      dob: moment(item.dob).format("YYYY-MM-DD"),
      doj: moment(item.doj).format("YYYY-MM-DD"),
      start_time: moment(item.start_time).format("YYYY-MM-DD"),
      end_time: moment(item.end_time).format("YYYY-MM-DD")
    }

    try {
      await createTeacherInfo(modifyData).unwrap().then((res) => {
        if (res.statusCode === 201) {
          setVisible(true)
          setNotification({
            url: '/admin/teacher-management/teacher-info',
            title: translate(langData, lang, LangSetUpForForm.create_message.key) || 'Created Successfully!!',
            autoClose: true,
          })
        }
      }).catch((err: any) => {
        return err?.errors?.forEach((value: any) => {
          return methods.setError(value?.field, { type: "required", message: value?.message })
        })
      })
    } catch (error) {

    }
  }

  const breadcrumbLink: any = [
    { href: 'admin/teacher-management/teacher-info', label: translate(langData, lang, LangSetUpForMenu.teacher_management.key) || 'Teachers' },
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.teacher_management.submodule.teacher_add.key) || 'Teacher Add' }
  ]

  useEffect(() => {
    setGetDependencyData(learningShowCenter?.data)
    methods.setValue("divisionId", { label: getDependency?.divisionId?.name_en || "", value: getDependency?.divisionId?.id || "" })
    methods.setValue("districtId", { label: getDependency?.districtId?.name_en || "", value: getDependency?.districtId?.id || "" })
    methods.setValue("upazilaId", { label: getDependency?.upazilaId?.name_en || "", value: getDependency?.upazilaId?.id || "" })
  }, [methods.setValue, learningShowCenter, getDependency])

  return (
    <FormLayout>
      <Paper className="breadHeadField">
        <Box className="breadCrumbBg">
          <BreadCrumb listItems={breadcrumbLink} />
        </Box>
        <Box className="backBtn">
          <Button LinkComponent={Link}
            href="/admin/teacher-management/teacher-info">
            {translate(langData, lang, LangSetUpForForm.back.key) || "Back"}
          </Button>
        </Box>
      </Paper>
      <FormLayoutBody>
        <FormProvider {...methods} >
          <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)} >
            <FormLayoutContent title={translate(langData, lang, LangSetUpForMenu.teacher_management.submodule.teacher_add.key) || 'Teacher Add'} >

              <Grid container spacing={2.5}>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="learning_center_id">
                    {translate(langData, lang, LangSetUpForTeacher.form.learningCenterId.key) || "Learning Center Id"}
                  </FormInputLabel>
                  <FormAutocomplete required name="learning_center_id" dataSource={listArrayModify(learningCenterList?.data)} id="learning_center_id" />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="course_id" >{translate(langData, lang, LangSetUpForTeacher.form.courseName.key) || "Course Name"}</FormInputLabel>
                  <FormAutocomplete required name="course_id" dataSource={listArrayModify(courseList?.data)} id="course_id" />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="nameEnglish" required={true} >{translate(langData, lang, LangSetUpForDesignation.list.name_en.key) || "Name EN"}</FormInputLabel>
                  <FormInputBootstrap name='name_en' id="nameEnglish" />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="nameBangla" >{translate(langData, lang, LangSetUpForDesignation.list.name_bn.key) || "Name BN"}</FormInputLabel>
                  <FormInputBootstrap name='name_bn' id='nameBangla' />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="cluster_number" >{translate(langData, lang, LangSetUpForTeacher.form.teacherId.key) || "Teacher ID"}</FormInputLabel>
                  <FormInputBootstrap name='cluster_number' type="number" id='cluster_number' />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="Gender" >{translate(langData, lang, LangSetUpForTeacher.form.gender.key) || "Gender"}</FormInputLabel>
                  <FormAutocomplete required name="gender_id" dataSource={listArrayModify(genderList?.data)} />
                </Grid>

                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="nid" >{translate(langData, lang, LangSetUpForTeacher.list.nid.key) || "NID"}</FormInputLabel>
                  <FormInputBootstrap name='nid' type="text" id='nid' />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="father_name" >{translate(langData, lang, LangSetUpForEmployee.list.fathersNameEn.key) || "Father Name English"}</FormInputLabel>
                  <FormInputBootstrap name='father_name' type="text" id='father_name' />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="mother_name" >{translate(langData, lang, LangSetUpForEmployee.list.motherEn.key) || "Mother Name (English)"}</FormInputLabel>
                  <FormInputBootstrap name='mother_name' type="text" id='mother_name' />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="dob" >{translate(langData, lang, LangSetUpForTeacher.form.dateOfBirth.key) || "Date of birth"}</FormInputLabel>
                  <FormDatePicker name='dob' id='dob' size="small" />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="mobile" >{translate(langData, lang, LangSetUpForTeacher.list.mobile.key) || "Mobile"}</FormInputLabel>
                  <FormInputBootstrap name='mobile' type="text" id='mobile' />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="doj" >{translate(langData, lang, LangSetUpForTeacher.form.joinDate.key) || "Joining Date"}</FormInputLabel>
                  <FormDatePicker name='doj' size='small' id='doj' />
                </Grid>

                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="start_time">
                    {translate(langData, lang, LangSetUpForTeacher.form.startTime.key) || "Start Time"}
                  </FormInputLabel>
                  <FormDatePicker name='start_time' size="small" id='start_time' />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="end_time">
                    {translate(langData, lang, LangSetUpForTeacher.form.endTime.key) || "End Time"}
                  </FormInputLabel>
                  <FormDatePicker name='end_time' size="small" id='end_time' />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="divisionId" >{translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || 'Division'}</FormInputLabel>
                  <FormAutocomplete required name="divisionId" dataSource={listArrayModify(divisionList?.data)} />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="districtId" >{translate(langData, lang, LangSetUpForTeacher.form.district.key) || "District"}</FormInputLabel>
                  <FormAutocomplete required name="districtId" dataSource={listArrayModify(districtList?.data)} />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="upazilaId" >{translate(langData, lang, LangSetUpForTeacher.form.upazila.key) || "Upazila"}</FormInputLabel>
                  <FormAutocomplete required name="upazilaId" dataSource={listArrayModify(upazilaList?.data)} />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="area" >
                    {translate(langData, lang, LangSetUpForTeacher.form.area.key) || "area"}
                  </FormInputLabel>
                  <FormInputBootstrap name="area" multiline id="area" />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="bank_name" >{translate(langData, lang, LangSetUpForTeacher.form.bankName.key) || "Bank name"}</FormInputLabel>
                  <FormInputBootstrap name="bank_name" id="bank_name" />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="branch_name" >{translate(langData, lang, LangSetUpForTeacher.form.branchName.key) || "Branch name"}</FormInputLabel>
                  <FormInputBootstrap name="branch_name" id="branch_name" />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="account" >{translate(langData, lang, LangSetUpForTeacher.form.accountNumber.key) || "Account number"}</FormInputLabel>
                  <FormInputBootstrap name="account" id="account" />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="routing">
                    {translate(langData, lang, LangSetUpForTeacher.form.routing.key) || "routing"}
                  </FormInputLabel>
                  <FormInputBootstrap name="routing" id="routing" />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="nature">
                    {translate(langData, lang, LangSetUpForTeacher.form.nature.key) || "Nature"}
                  </FormInputLabel>
                  <FormInputBootstrap name="nature" id="nature" />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="training">
                    {translate(langData, lang, LangSetUpForTeacher.form.training.key) || "Training"}
                  </FormInputLabel>
                  <FormInputBootstrap name="training" id="training" />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="photo" >
                    {translate(langData, lang, LangSetUpForEmployee.form.image.key) || "Image:"}
                  </FormInputLabel>
                  <FormFileUpload name='photo' />
                </Grid>
                <Grid item xs={12}>
                  <TeacherDegree />
                </Grid>
              </Grid>
              <FormLayoutFooter>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>

                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="submitBtnField">
                    <Box className="stuLeftBtn">
                      <Box className="clearBtn">
                        <Button type="button" onClick={() => methods.reset()} >  {translate(langData, lang, LangSetUpForForm.reset.key) || "Reset"} </Button>
                      </Box>
                    </Box>
                    <Box className="stuRightBtn">
                      <Box className="addBtn">
                        <Button type="submit"> + {translate(langData, lang, LangSetUpForForm.submit.key) || "Submit"} </Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </FormLayoutFooter>
            </FormLayoutContent>
          </Box>
        </FormProvider>
      </FormLayoutBody>
    </FormLayout>
  )
}

export default CreateTeacherInfo