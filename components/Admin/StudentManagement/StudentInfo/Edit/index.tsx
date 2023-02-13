import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Grid, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { useGetLearningCenterListQuery, useShowLearningCenterQuery } from "Api/Center/LearningCenter"
import { useGetLearningcentertypeAllListQuery } from "Api/Center/LearningCenterType"
import { useGetBloodGroupListQuery } from "Api/Global/BloodGroup"
import { useGetGenderListQuery } from "Api/Global/Gender"
import { useGetSessionListQuery } from "Api/Global/Session"
import { useShowStudentInfoQuery, useUpdateStudentInfoMutation } from "Api/StudentManagement/StudentInfo"
import { useGetDistrictListQuery } from "Api/SystemConfiguration/District"
import { useGetDivisionListQuery } from "Api/SystemConfiguration/Division"
import { useGetUpazilaListQuery } from "Api/SystemConfiguration/Upazila"
import FormAutocomplete from "components/common/FormItem/FormAutocomplete"
import FormCheckBox from "components/common/FormItem/FormCheckbox"
import FormDatePicker from "components/common/FormItem/FormDatePicker"
import FormFileUpload from "components/common/FormItem/FormFileUpload"
import FormInputBootstrap, { FormInputLabel } from "components/common/FormItem/FormInputBootstrap"
import BreadCrumb from "components/common/PageBreadCrumb/BreadCrumb"
import { FormLayout, FormLayoutBody, FormLayoutContent, FormLayoutFooter } from "components/layouts/FormLayout"
import { useHotNotification } from "context/HotNotificationProvider"
import moment from "moment"
import Link from "next/link"
import { useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { RootState } from "Store"
import { listArrayModify, listArrayModifyCenterNameCode, translate } from "Utils/Handler"
import { LangSetUpForCenter } from "Utils/Language/CenterManagement"
import { LangSetUpForEmployee } from "Utils/Language/EmployeeManagement"
import { LangSetUpForForm } from "Utils/Language/MasterData/Form"
import { LangSetUpForMenu } from "Utils/Language/Menu"
import { LangSetUpForStudent } from "Utils/Language/StudentManagement"
import { TypeOf } from "yup"
import { updateSchemaValidation } from "../Schema"

const EditNewStudentManagement = (props: any) => {
  const { id } = props?.data
  const { setVisible, setNotification } = useHotNotification();
  const { lang, langData } = useSelector((state: RootState) => state.lang);
  const { data: getStudentInfo, isLoading } = useShowStudentInfoQuery(id)

  type IFormStudentUpdateSchema = TypeOf<typeof updateSchemaValidation>;
  const defaultValues: IFormStudentUpdateSchema = {
    learningcentertypeId: { label: getStudentInfo?.data?.data?.learning_center_id?.centertypeId?.name_en, value: getStudentInfo?.data?.data?.learning_center_id?.centertypeId?.id },
    learning_center_id: { label: getStudentInfo?.data?.data?.learning_center_id?.name_en, value: getStudentInfo?.data?.data?.learning_center_id?.id },
    learningcentername: { label: getStudentInfo?.data?.data?.learning_center_id?.code, value: getStudentInfo?.data?.data?.learning_center_id?.id },
    name_en: getStudentInfo?.data?.data?.name_en,
    name_bn: getStudentInfo?.data?.data?.name_bn,
    roll_number: getStudentInfo?.data?.data?.roll_number,
    dob: getStudentInfo?.data?.data?.dob,
    age: getStudentInfo?.data?.data?.age,
    bcn: getStudentInfo?.data?.data?.bcn,
    nid: getStudentInfo?.data?.data?.nid,
    sessionId: { label: getStudentInfo?.data?.data?.session?.name_en, value: getStudentInfo?.data?.data?.session?.id },
    divisionId: { label: getStudentInfo?.data?.data?.divisionId?.name_en, value: getStudentInfo?.data?.data?.divisionId?.id },
    districtId: { label: getStudentInfo?.data?.data?.districtId?.name_en, value: getStudentInfo?.data?.data?.districtId?.id },
    upazilaId: { label: getStudentInfo?.data?.data?.upazilaId?.name_en, value: getStudentInfo?.data?.data?.upazilaId?.id },

    union: getStudentInfo?.data?.data?.union,
    ward: getStudentInfo?.data?.data?.ward,
    village: getStudentInfo?.data?.data?.village,
    doa: getStudentInfo?.data?.data?.doa,
    bloodgroupId: { label: "", value: "" },
    gender_id: { label: "", value: "" },
    is_another_institute: getStudentInfo?.data?.data?.is_another_institute,
    institute_name: getStudentInfo?.data?.data?.institute_name,
    profession: getStudentInfo?.data?.data?.profession,
    father_name_bn: getStudentInfo?.data?.data?.father_name_bn,
    father_name_en: getStudentInfo?.data?.data?.father_name_en,
    father_nid: getStudentInfo?.data?.data?.father_nid,
    father_occupation: getStudentInfo?.data?.data?.father_occupation,
    father_mobile: getStudentInfo?.data?.data?.father_mobile,
    mother_name_bn: getStudentInfo?.data?.data?.mother_name_bn,
    mother_name_en: getStudentInfo?.data?.data?.mother_name_en,
    mother_nid: getStudentInfo?.data?.data?.mother_nid,
    mother_occupation: getStudentInfo?.data?.data?.mother_occupation,
    mother_mobile: getStudentInfo?.data?.data?.mother_mobile,
    is_guardian_absent: getStudentInfo?.data?.data?.is_guardian_absent,
    guardian_name_bn: getStudentInfo?.data?.data?.guardian_name_bn,
    guardian_name_en: getStudentInfo?.data?.data?.guardian_name_en,
    guardian_nid: getStudentInfo?.data?.data?.guardian_nid,
    guardian_occupation: getStudentInfo?.data?.data?.guardian_occupation,
    guardian_mobile: getStudentInfo?.data?.data?.guardian_mobile,
    photo: getStudentInfo?.data?.data?.photo,
    status: undefined
  }

  const methods = useForm<IFormStudentUpdateSchema>({
    mode: "all", reValidateMode: "onChange",
    resolver: yupResolver(updateSchemaValidation), defaultValues
  })

  const { data: divisionList } = useGetDivisionListQuery()
  const { data: districtList } = useGetDistrictListQuery("")
  const { data: upazila } = useGetUpazilaListQuery("")
  const { data: session } = useGetSessionListQuery()
  const { data: bloodGroup } = useGetBloodGroupListQuery()
  const { data: gender } = useGetGenderListQuery()

  const { data: learningCenterTypeList } = useGetLearningcentertypeAllListQuery()
  const learningCenterTypeListId = methods.watch()?.learningcentertypeId?.value

  const { data: learningCenterList } = useGetLearningCenterListQuery({ centertypeId: learningCenterTypeListId })
  const { data: learningShowCenter } = useShowLearningCenterQuery(methods.watch().learning_center_id?.value)



  const [updateStudentInfo] = useUpdateStudentInfoMutation()



  const onSubmitHandler: SubmitHandler<IFormStudentUpdateSchema> = async (data: IFormStudentUpdateSchema) => {
    const modifiedData = {
      ...data,
      learningcentertypeId: data.learningcentertypeId.value,
      learning_center_id: data.learning_center_id.value,
      learningcentername: data.learningcentername.value,
      sessionId: data.sessionId.value,
      divisionId: data.divisionId.value,
      districtId: data.districtId.value,
      upazilaId: data.upazilaId.value,
      bloodgroupId: data.bloodgroupId.value,
      gender_id: data.gender_id.value,
      dob: moment(data.dob).format("YYYY-MM-DD"),
      doa: moment(data.dob).format("YYYY-MM-DD"),
      institute_name: data?.is_another_institute === true ? data?.institute_name : "",
      guardian_name_bn: data?.is_guardian_absent === true ? data?.guardian_name_bn : "",
      guardian_name_en: data?.is_guardian_absent === true ? data?.guardian_name_en : "",
      guardian_nid: data?.is_guardian_absent === true ? data?.guardian_nid : "",
      guardian_occupation: data?.is_guardian_absent === true ? data?.guardian_occupation : "",
      guardian_mobile: data?.is_guardian_absent === true ? data?.guardian_mobile : "",
      id: props?.data?.id
    }
    console.log('modifydata', modifiedData);
    try {
      await updateStudentInfo(modifiedData).unwrap()
        .then((res: any) => {
          if (res.statusCode === 200) {
            setVisible(true)
            setNotification({
              url: '/admin/student-management/student-info',
              title: translate(langData, lang, LangSetUpForForm.update_message.key) || 'Updated Successfully!!',
              autoClose: true,
            })
          }
        })
        .catch((err: any) => {
          return err?.errors?.forEach((value: any) => {
            return methods.setError(value?.field, { type: "required", message: value?.message })
          })
        })
    } catch (error) { }
  }
  useEffect(() => {
    methods.setValue("divisionId", { label: learningShowCenter?.data?.divisionId?.name_en || '', value: learningShowCenter?.data?.divisionId?.id })
    methods.setValue("districtId", { label: learningShowCenter?.data?.districtId?.name_en || '', value: learningShowCenter?.data?.districtId?.id })
    methods.setValue("upazilaId", { label: learningShowCenter?.data?.upazilaId?.name_en || '', value: learningShowCenter?.data?.upazilaId?.id })
    methods.setValue("union", learningShowCenter?.data?.union)
    methods.setValue("village", learningShowCenter?.data?.area)
  }, [methods.setValue, learningShowCenter, methods.watch])

  useEffect(() => {
    methods.reset({
      learningcentertypeId: { label: getStudentInfo?.data?.data?.learning_center_id?.centertypeId?.name_en, value: getStudentInfo?.data?.data?.learning_center_id?.centertypeId?.id },
      learning_center_id: { label: getStudentInfo?.data?.data?.learning_center_id?.name_en, value: getStudentInfo?.data?.data?.learning_center_id?.id },
      learningcentername: { label: getStudentInfo?.data?.data?.learning_center_id?.code, value: getStudentInfo?.data?.data?.learning_center_id?.id },
      name_en: getStudentInfo?.data?.data?.name_en,
      name_bn: getStudentInfo?.data?.data?.name_bn,
      roll_number: getStudentInfo?.data?.data?.roll_number,
      dob: getStudentInfo?.data?.data?.dob,
      age: getStudentInfo?.data?.data?.age,
      bcn: getStudentInfo?.data?.data?.bcn,
      nid: getStudentInfo?.data?.data?.nid,
      sessionId: { label: getStudentInfo?.data?.data?.session?.name_en, value: getStudentInfo?.data?.data?.session?.id },
      divisionId: { label: getStudentInfo?.data?.data?.divisionId?.name_en || "", value: getStudentInfo?.data?.data?.divisionId?.id },
      districtId: { label: getStudentInfo?.data?.data?.districtId?.name_en || "", value: getStudentInfo?.data?.data?.districtId?.id },
      upazilaId: { label: getStudentInfo?.data?.data?.upazilaId?.name_en || "", value: getStudentInfo?.data?.data?.upazilaId?.id },
      union: getStudentInfo?.data?.data?.union,
      ward: getStudentInfo?.data?.data?.ward,
      village: getStudentInfo?.data?.data?.village,
      doa: getStudentInfo?.data?.data?.doa,
      bloodgroupId: { label: getStudentInfo?.data?.data?.bloodgroup?.name_en, value: getStudentInfo?.data?.data?.bloodgroup?.id },
      gender_id: { label: getStudentInfo?.data?.data?.gender_id?.name_en, value: getStudentInfo?.data?.data?.gender_id?.id },
      is_another_institute: getStudentInfo?.data?.data?.is_another_institute,
      institute_name: getStudentInfo?.data?.data?.institute_name,
      profession: getStudentInfo?.data?.data?.profession,
      father_name_bn: getStudentInfo?.data?.data?.father_name_bn,
      father_name_en: getStudentInfo?.data?.data?.father_name_en,
      father_nid: getStudentInfo?.data?.data?.father_nid,
      father_occupation: getStudentInfo?.data?.data?.father_occupation,
      father_mobile: getStudentInfo?.data?.data?.father_mobile,
      mother_name_bn: getStudentInfo?.data?.data?.mother_name_bn,
      mother_name_en: getStudentInfo?.data?.data?.mother_name_en,
      mother_nid: getStudentInfo?.data?.data?.mother_nid,
      mother_occupation: getStudentInfo?.data?.data?.mother_occupation,
      mother_mobile: getStudentInfo?.data?.data?.mother_mobile,
      is_guardian_absent: getStudentInfo?.data?.data?.is_guardian_absent,
      guardian_name_bn: getStudentInfo?.data?.data?.guardian_name_bn,
      guardian_name_en: getStudentInfo?.data?.data?.guardian_name_en,
      guardian_nid: getStudentInfo?.data?.data?.guardian_nid,
      guardian_occupation: getStudentInfo?.data?.data?.guardian_occupation,
      guardian_mobile: getStudentInfo?.data?.data?.guardian_mobile,
      photo: getStudentInfo?.data?.data?.photo,
      status: getStudentInfo?.data?.data?.status
    })
  }, [methods.reset, getStudentInfo])


  const breadcumLink = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.student_management.key) || 'Student' },

    {
      href: '#', label: translate(langData, lang, LangSetUpForStudent.form.updateStudent.key) || "Update Student"
    }
  ]

  return (
    <>
      <FormLayout spinLoading={isLoading} >
        {/* <FormLayoutHeader>
          <BreadCrumb listItems={breadcumLink} />
        </FormLayoutHeader> */}
        <Paper className="breadHeadField">
          <Box className="breadCrumbBg">
            <BreadCrumb listItems={breadcumLink} />
          </Box>
          <Box className="backBtn">
            <Button LinkComponent={Link}
              href="/admin/student-management/student-info">
              {translate(langData, lang, LangSetUpForForm.back.key) || "Back"}
            </Button>
          </Box>
        </Paper>

        <FormLayoutBody>
          <FormProvider {...methods} >
            <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)} >
              <FormLayoutContent title={translate(langData, lang, LangSetUpForStudent.form.updateStudent.key) || "Update Student"} >
                <Grid container spacing={2.5}>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="learningcentertypeId">
                      {translate(langData, lang, LangSetUpForStudent.list.centerLevel.key) || "Center Level"}
                    </FormInputLabel>
                    <FormAutocomplete name='learningcentertypeId' id='learningcentertypeId' dataSource={listArrayModify(learningCenterTypeList?.data)} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="learning_center_id">
                      {translate(langData, lang, LangSetUpForStudent.list.centerCode.key) || "Center Code"}
                    </FormInputLabel>
                    <FormAutocomplete name='learning_center_id' id='learning_center_id' dataSource={listArrayModifyCenterNameCode(learningCenterList?.data)} />
                  </Grid>

                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="divisionId">
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division"}
                    </FormInputLabel>
                    <FormAutocomplete name='divisionId' id='divisionId' dataSource={listArrayModify(divisionList?.data)} disabled={true} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="districtId">
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District"}
                    </FormInputLabel>
                    <FormAutocomplete name='districtId' id='districtId' dataSource={listArrayModify(districtList?.data)} disabled={true} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="upazilaId">
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila"}
                    </FormInputLabel>
                    <FormAutocomplete name='upazilaId' id='upazilaId' dataSource={listArrayModify(upazila?.data)} disabled={true} />
                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="union">
                      {translate(langData, lang, LangSetUpForCenter.form.union.key) || "Union"}
                    </FormInputLabel>
                    <FormInputBootstrap name='union' id="union" disabled />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="village">
                      {translate(langData, lang, LangSetUpForStudent.form.village.key) || "Village"}
                    </FormInputLabel>
                    <FormInputBootstrap name='village' id="village" disabled />
                  </Grid>
                </Grid>
                <Grid container spacing={2.5} marginTop={2.5}>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="name_en">
                      {translate(langData, lang, LangSetUpForStudent.list.studentName.key) || "Student Name"}
                    </FormInputLabel>
                    <FormInputBootstrap name='name_en' id="name_en" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="name_bn">
                      {translate(langData, lang, LangSetUpForStudent.list.studentName.key) || "Student Name"} (Bn)
                    </FormInputLabel>
                    <FormInputBootstrap name='name_bn' id="name_bn" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="roll_number">
                      {translate(langData, lang, LangSetUpForStudent.list.studentRoll.key) || "Student Roll"}
                    </FormInputLabel>
                    <FormInputBootstrap name='roll_number' id="roll_number" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="dob">
                      {translate(langData, lang, LangSetUpForStudent.form.dateOfBirth.key) || "Date of Birth"}
                    </FormInputLabel>
                    <FormDatePicker name='dob' size='small' />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="age">
                      {translate(langData, lang, LangSetUpForStudent.form.age.key) || "Age"}
                    </FormInputLabel>
                    <FormInputBootstrap name='age' id="age" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="bcn">
                      {translate(langData, lang, LangSetUpForStudent.form.birthRegNumber.key) || "Birth Registration Number"}
                    </FormInputLabel>
                    <FormInputBootstrap name='bcn' id="bcn" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="nid">
                      {translate(langData, lang, LangSetUpForEmployee.form.nid.key) || "NID"}
                    </FormInputLabel>
                    <FormInputBootstrap name='nid' id="nid" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="sessionId">
                      {translate(langData, lang, LangSetUpForStudent.form.educationYear.key) || "Educational Year"}
                    </FormInputLabel>
                    <FormAutocomplete name='sessionId' id='sessionId' dataSource={listArrayModify(session?.data)} />
                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="doa">
                      {translate(langData, lang, LangSetUpForStudent.form.admissionDate.key) || "Admission Date"}
                    </FormInputLabel>
                    <FormDatePicker name='doa' size='small' />
                  </Grid>
                  {learningCenterTypeListId === '798855e2-a869-4074-921d-5a7c91cad00f' ?
                    <Grid item xs={12} md={6} lg={4}>
                      <FormInputLabel htmlFor="profession">
                        {translate(langData, lang, LangSetUpForStudent.form.studentOccupation.key) || "Student Occupation"}
                      </FormInputLabel>
                      <FormInputBootstrap name='profession' id="profession" />
                    </Grid>
                    : ''}
                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="bloodgroupId">
                      {translate(langData, lang, LangSetUpForStudent.form.bloodGroup.key) || "Blood Group"}
                    </FormInputLabel>
                    <FormAutocomplete name='bloodgroupId' id='bloodgroupId' dataSource={listArrayModify(bloodGroup?.data)} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="gender_id">
                      {translate(langData, lang, LangSetUpForStudent.form.gender.key) || "Gender"}
                    </FormInputLabel>
                    <FormAutocomplete name='gender_id' id='gender_id' dataSource={listArrayModify(gender?.data)} />
                  </Grid>
                  {learningCenterTypeListId === '9a4f67c3-c451-43a5-9b48-3198514ba4fb' ?
                    <Grid item xs={12} md={6} lg={4}>
                      <FormCheckBox name="is_another_institute" id="is_another_institute" />
                      <label>
                        {translate(langData, lang, LangSetUpForStudent.form.isAdmitted.key) || "Is admitted to another institute?"}
                      </label>
                      {Boolean(methods.watch().is_another_institute) === true ? <>
                        <FormInputLabel htmlFor="institute_name">
                          {translate(langData, lang, LangSetUpForStudent.form.institutionName.key) || "Institution Name"}
                        </FormInputLabel>
                        <FormInputBootstrap name='institute_name' id="institute_name" />
                      </> : ""
                      }
                    </Grid>
                    : ''}
                </Grid>
                <Box className="parentInfoFather">
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} md={4} >
                      <FormInputLabel htmlFor="father_name_en">
                        {translate(langData, lang, LangSetUpForStudent.form.fatherName.key) || "Father Name"}
                      </FormInputLabel>
                      <FormInputBootstrap name='father_name_en' id="father_name_en" />
                    </Grid>
                    <Grid item xs={12} md={4} >
                      <FormInputLabel htmlFor="father_name_bn">
                        {translate(langData, lang, LangSetUpForStudent.form.fatherName.key) || "Father Name"} (Bn)
                      </FormInputLabel>
                      <FormInputBootstrap name='father_name_bn' id="father_name_bn" />
                    </Grid>
                    <Grid item xs={12} md={4} >
                      <FormInputLabel htmlFor="father_occupation">
                        {translate(langData, lang, LangSetUpForStudent.form.occupation.key) || "Occupation"}
                      </FormInputLabel>
                      <FormInputBootstrap name='father_occupation' id="father_occupation" />
                    </Grid>
                    <Grid item xs={12} md={4} >
                      <FormInputLabel htmlFor="father_nid">
                        {translate(langData, lang, LangSetUpForStudent.form.fatherNID.key) || "Father NID"}
                      </FormInputLabel>
                      <FormInputBootstrap name='father_nid' id="father_nid" />
                    </Grid>
                    <Grid item xs={12} md={4} >
                      <FormInputLabel htmlFor="father_mobile">
                        {translate(langData, lang, LangSetUpForStudent.form.mobile.key) || "Mobile Number"}
                      </FormInputLabel>
                      <FormInputBootstrap name='father_mobile' id="father_mobile" />
                    </Grid>
                  </Grid>
                </Box>
                <Box className="parentInfoMother">
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} md={3} >
                      <FormInputLabel htmlFor="mother_name_en">
                        {translate(langData, lang, LangSetUpForStudent.form.mother.key) || "Mother Name"}
                      </FormInputLabel>
                      <FormInputBootstrap name='mother_name_en' id="mother_name_en" />
                    </Grid>
                    <Grid item xs={12} md={4} >
                      <FormInputLabel htmlFor="mother_name_bn">
                        {translate(langData, lang, LangSetUpForStudent.form.fatherName.key) || "Father Name"} (Bn)
                      </FormInputLabel>
                      <FormInputBootstrap name='mother_name_bn' id="mother_name_bn" />
                    </Grid>
                    <Grid item xs={12} md={4} >
                      <FormInputLabel htmlFor="mother_occupation">
                        {translate(langData, lang, LangSetUpForStudent.form.occupation.key) || "Occupation"}
                      </FormInputLabel>
                      <FormInputBootstrap name='mother_occupation' id="mother_occupation" />
                    </Grid>
                    <Grid item xs={12} md={4} >
                      <FormInputLabel htmlFor="mother_nid">
                        {translate(langData, lang, LangSetUpForStudent.form.motherNID.key) || "Mother NID"}
                      </FormInputLabel>
                      <FormInputBootstrap name='mother_nid' id="mother_nid" />
                    </Grid>
                    <Grid item xs={12} md={4} >
                      <FormInputLabel htmlFor="mother_mobile">
                        {translate(langData, lang, LangSetUpForStudent.form.mobile.key) || "Mobile Number"}
                      </FormInputLabel>
                      <FormInputBootstrap name='mother_mobile' id="mother_mobile" />
                    </Grid>
                  </Grid>
                </Box>
                <Box className="parentsCheckBox">
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} md={4} >
                      <FormCheckBox name="is_guardian_absent" id="is_guardian_absent" />
                      <label>{translate(langData, lang, LangSetUpForStudent.form.absenceOfFather.key) || "Absence of father"}</label>
                    </Grid>
                  </Grid>
                  {Boolean(methods.watch().is_guardian_absent) === true ?
                    <Grid container spacing={2.5}>
                      <Grid item xs={12} md={4} >
                        <FormInputLabel htmlFor="guardian_name_en">
                          {translate(langData, lang, LangSetUpForStudent.form.guardianName.key) || "Guardian Name"}
                        </FormInputLabel>
                        <FormInputBootstrap name='guardian_name_en' id="guardian_name_en" />
                      </Grid>
                      <Grid item xs={12} md={4} >
                        <FormInputLabel htmlFor="guardian_name_bn">
                          {translate(langData, lang, LangSetUpForStudent.form.guardianName.key) || "Guardian Name"}
                        </FormInputLabel>
                        <FormInputBootstrap name='guardian_name_bn' id="guardian_name_bn" />
                      </Grid>
                      <Grid item xs={12} md={4} >
                        <FormInputLabel htmlFor="guardian_occupation">
                          {translate(langData, lang, LangSetUpForStudent.form.occupation.key) || "Occupation"}
                        </FormInputLabel>
                        <FormInputBootstrap name='guardian_occupation' id="guardian_occupation" />
                      </Grid>
                      <Grid item xs={12} md={4} >
                        <FormInputLabel htmlFor="guardian_nid">
                          {translate(langData, lang, LangSetUpForStudent.form.guardianNID.key) || "Guardian NID"}
                        </FormInputLabel>
                        <FormInputBootstrap name='guardian_nid' id="guardian_nid" />
                      </Grid>
                      <Grid item xs={12} md={4} >
                        <FormInputLabel htmlFor="guardian_mobile">
                          {translate(langData, lang, LangSetUpForStudent.form.mobile.key) || "Mobile Number"}
                        </FormInputLabel>
                        <FormInputBootstrap name='guardian_mobile' id="guardian_mobile" />
                      </Grid>
                    </Grid> : <></>
                  }
                </Box>
                <Box className="">
                  <Grid container spacing={2.5} >
                    <Grid item xs={12} md={6} lg={4}>
                      <FormInputLabel htmlFor="photo" >
                        {translate(langData, lang, LangSetUpForEmployee.form.image.key) || "Image:"}
                      </FormInputLabel>
                      <FormFileUpload name='photo' previewUrl={getStudentInfo?.data?.data?.photo} />
                    </Grid>
                  </Grid>
                </Box>
                <FormLayoutFooter>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>

                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box className="submitBtnField">
                      <Box className="stuRightBtn">
                        <Box className="addBtn">
                          <Button type="submit"> + {translate(langData, lang, LangSetUpForForm.update.key) || "Update"} </Button>
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
    </>
  )
}

export default EditNewStudentManagement