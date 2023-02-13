import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid } from '@mui/material';
import { useCreateEmployeeManagementMutation } from 'Api/EmployeeManagement';
import { useGetDesignationListQuery } from 'Api/SystemConfiguration/Designation';
import { useGetEmployeeTypeListQuery } from 'Api/SystemConfiguration/EmployeeType';
import { useGetOfficeListQuery } from 'Api/SystemConfiguration/Office';
import FormAutocomplete from 'components/common/FormItem/FormAutocomplete';
import FormDatePicker from 'components/common/FormItem/FormDatePicker';
import FormFileUpload from 'components/common/FormItem/FormFileUpload';
import FormInputBootstrap, { FormInputLabel } from 'components/common/FormItem/FormInputBootstrap';
import BreadCrumb from 'components/common/PageBreadCrumb/BreadCrumb';
import { FormLayout, FormLayoutBody, FormLayoutContent, FormLayoutFooter, FormLayoutHeader } from 'components/layouts/FormLayout';
import { useHotNotification } from 'context/HotNotificationProvider';
import moment from 'moment';
import Link from 'next/link';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from 'Store';
import { listArrayModify, translate } from 'Utils/Handler';
import { LangSetUpForEmployee } from 'Utils/Language/EmployeeManagement';
import { LangSetUpForForm } from 'Utils/Language/MasterData/Form';
import { LangSetUpForMenu } from 'Utils/Language/Menu';
import { TypeOf } from 'yup';
import { createValidation } from '../Schema';

const AddNewEmployeeManagement = () => {

  const { setVisible, setNotification } = useHotNotification()
  const { data: officeList } = useGetOfficeListQuery()
  const { data: designationList } = useGetDesignationListQuery()
  const { data: employeeTypeList } = useGetEmployeeTypeListQuery()
  const [CreateEmployeeManagement] = useCreateEmployeeManagementMutation()

  type IEmployeeManagementCreate = TypeOf<typeof createValidation>;
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  const defaultValues: IEmployeeManagementCreate = {
    employee_id: "",
    name_en: "",
    name_bn: "",
    father_name: "",
    mother_name: "",
    nid: "",
    officeId: { label: "", value: "" },
    employeetypeId: { label: "", value: "" },
    designationId: { label: "", value: "" },
    join_date: null,
    email: "",
    mobile: "",
    address: "",
    photo: "",
  };

  const methods = useForm<IEmployeeManagementCreate>({
    mode: "all", reValidateMode: 'onSubmit',
    resolver: yupResolver(createValidation), defaultValues
  });


  const onSubmitHandler: SubmitHandler<IEmployeeManagementCreate> = (data: IEmployeeManagementCreate) => {
    const modifiedData = {
      ...data,
      designationId: data.designationId?.value,
      employeetypeId: data.employeetypeId?.value,
      officeId: data.officeId?.value,
      join_date: moment(data.join_date).format("YYYY-MM-DD"),
    }

    try {
      CreateEmployeeManagement(modifiedData).unwrap().then((res: any) => {

        if (res?.response?.statusCode === 201) {
          setVisible(true)
          setNotification({
            url: '/admin/employee-management',
            title: translate(langData, lang, LangSetUpForForm.create_message.key) || 'Created Successfully!!',
            autoClose: true,
          })
        }
      }).catch((err) => err?.errors?.forEach((value: any) => methods.setError(value?.field, { type: "required", message: value?.message })))
    } catch (error) {

    }
  }

  const breadcrumbLink: any = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.employee_management.key) || 'Employee Management' },
    { href: '/admin/employee-management/add', label: translate(langData, lang, LangSetUpForMenu.employee_management.submodule.add_employee.key) || 'Add Employee' }
  ]

  return (<>
    <FormLayout>
      <FormLayoutHeader>
        <Box className="breadHeadField">
          <Box className="breadCrumbBg">
            <BreadCrumb listItems={breadcrumbLink} />
          </Box>
          <Box className="backBtn">
            <Button LinkComponent={Link}
              href="/admin/employee-management">
              {translate(langData, lang, LangSetUpForForm.back.key) || "Back"}
            </Button>
          </Box>
        </Box>
      </FormLayoutHeader>
      <FormLayoutBody>
        <FormProvider {...methods} >
          <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)} >
            <FormLayoutContent title={translate(langData, lang, LangSetUpForEmployee.form.add_employee_title.key) || "Information required by the officer"} >
              <Grid container spacing={2.5}>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="EmployeeId">
                    {translate(langData, lang, LangSetUpForEmployee.form.officerId.key) || "Officer ID"}
                  </FormInputLabel>
                  <FormInputBootstrap name='employee_id' id="EmployeeId" />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="EmployeeName" required={true}>
                    {translate(langData, lang, LangSetUpForEmployee.form.officerNameEn.key) || "Officer Name (English):"}
                  </FormInputLabel>
                  <FormInputBootstrap name='name_en' id='EmployeeName' />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="EmployeeName" required={true}>
                    {translate(langData, lang, LangSetUpForEmployee.form.officerNameBn.key) || "Officer Name (Bangla):"}
                  </FormInputLabel>

                  <FormInputBootstrap name='name_bn' id='EmployeeName' />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="fatherName" required={true}>
                    {translate(langData, lang, LangSetUpForEmployee.form.fathersName.key) || "Father's Name:"}
                  </FormInputLabel>
                  <FormInputBootstrap name='father_name' id="fatherName" />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="motherName" required={true}>
                    {translate(langData, lang, LangSetUpForEmployee.form.mothersName.key) || "Mother's Name:"}
                  </FormInputLabel>
                  <FormInputBootstrap name='mother_name' id='motherName' />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="Nid" required={true}>
                    {translate(langData, lang, LangSetUpForEmployee.form.nid.key) || "NID"}
                  </FormInputLabel>
                  <FormInputBootstrap name='nid' id="Nid" />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="employeetypeId" required={true}>
                    {translate(langData, lang, LangSetUpForEmployee.form.officerType.key) || "Officer Type:"}
                  </FormInputLabel>
                  <FormAutocomplete name='employeetypeId' id='employeetypeId' dataSource={listArrayModify(employeeTypeList?.data)} />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="officeId" required={true}>
                    {translate(langData, lang, LangSetUpForEmployee.form.office.key) || "Office:"}
                  </FormInputLabel>
                  <FormAutocomplete name='officeId' id='officeId' dataSource={listArrayModify(officeList?.data)} />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="designationId" required={true}>
                    {translate(langData, lang, LangSetUpForEmployee.form.designation.key) || "Designation:"}
                  </FormInputLabel>
                  <FormAutocomplete name='designationId' id='designationId' dataSource={listArrayModify(designationList?.data)} />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="joinDate" required={true}>
                    {translate(langData, lang, LangSetUpForEmployee.form.dateOfJoining.key) || "Date of Joining:"}
                  </FormInputLabel>
                  <FormDatePicker name='join_date' size='small' />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="Email" required={true}>
                    {translate(langData, lang, LangSetUpForEmployee.form.email.key) || "Email:"}
                  </FormInputLabel>
                  <FormInputBootstrap name='email' id='Email' />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="Mobile" required={true}>
                    {translate(langData, lang, LangSetUpForEmployee.form.mobile.key) || "Mobile Number:"}
                  </FormInputLabel>
                  <FormInputBootstrap name='mobile' id="Mobile" />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="Address" >
                    {translate(langData, lang, LangSetUpForEmployee.form.address.key) || "Address:"}
                  </FormInputLabel>
                  <FormInputBootstrap name='address' id='Address' multiline />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="photo" >
                    {translate(langData, lang, LangSetUpForEmployee.form.image.key) || "Image:"}
                  </FormInputLabel>
                  <FormFileUpload name='photo' />
                </Grid>

              </Grid>
              <FormLayoutFooter>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>

                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="submitBtnField">
                    <Box className="stuLeftBtn">
                      <Box className="clearBtn">
                        <Button type="button" onClick={() => methods.reset()} > {translate(langData, lang, LangSetUpForForm.reset.key) || "Reset"} </Button>
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

  </>)
}

export default AddNewEmployeeManagement