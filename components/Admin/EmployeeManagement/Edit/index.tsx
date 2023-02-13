import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Paper } from '@mui/material';
import { useShowEmployeeManagementQuery, useUpdateEmployeeManagementMutation } from 'Api/EmployeeManagement';
import { useGetDesignationListQuery } from 'Api/SystemConfiguration/Designation';
import { useGetEmployeeTypeListQuery } from 'Api/SystemConfiguration/EmployeeType';
import { useGetOfficeListQuery } from 'Api/SystemConfiguration/Office';
import FormAutocomplete from 'components/common/FormItem/FormAutocomplete';
import FormDatePicker from 'components/common/FormItem/FormDatePicker';
import FormFileUpload from 'components/common/FormItem/FormFileUpload';
import FormInputBootstrap, { FormInputLabel } from 'components/common/FormItem/FormInputBootstrap';
import FormSelect from 'components/common/FormItem/FormSelect';
import BreadCrumb from 'components/common/PageBreadCrumb/BreadCrumb';
import { FormLayout, FormLayoutBody, FormLayoutContent, FormLayoutFooter } from 'components/layouts/FormLayout';
import { useHotNotification } from 'context/HotNotificationProvider';
import moment from 'moment';
import Link from 'next/link';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from 'Store';
import { listArrayModify, translate } from 'Utils/Handler';
import { LangSetUpForEmployee } from 'Utils/Language/EmployeeManagement';
import { LangSetUpForForm } from 'Utils/Language/MasterData/Form';
import { LangSetUpForList } from 'Utils/Language/MasterData/List';
import { LangSetUpForMenu } from 'Utils/Language/Menu';
import { TypeOf } from 'yup';
import { updateValidation } from '../Schema';


const EditNewEmployeeManagement = (props: any) => {

  const { setNotification, setVisible } = useHotNotification()
  const { data: officeList } = useGetOfficeListQuery()
  const { data: designationList } = useGetDesignationListQuery()
  const { data: employeeTypeList } = useGetEmployeeTypeListQuery()
  const [employeeManagementUpdate] = useUpdateEmployeeManagementMutation()
  const { data: showEmployeeData, isLoading: getIsLoading } = useShowEmployeeManagementQuery(props?.data?.id)
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  type IEmployeeManagementCreate = TypeOf<typeof updateValidation>;

  const defaultValues: IEmployeeManagementCreate = {
    employee_id: showEmployeeData?.data?.employee_id,
    name_en: showEmployeeData?.data?.name_en,
    name_bn: showEmployeeData?.data?.name_bn,
    father_name: showEmployeeData?.data?.father_name,
    mother_name: showEmployeeData?.data?.mother_name,
    nid: showEmployeeData?.data?.nid,
    officeId: { label: showEmployeeData?.data?.officeId.name_en, value: showEmployeeData?.data?.officeId.id },
    employeetypeId: { label: showEmployeeData?.data?.employeetypeId.name_en, value: showEmployeeData?.data?.employeetypeId.id },
    designationId: { label: showEmployeeData?.data?.designationId.name_en, value: showEmployeeData?.data?.designationId.id },
    join_date: showEmployeeData?.data?.join_date,
    email: showEmployeeData?.data?.email,
    mobile: showEmployeeData?.data?.mobile,
    address: showEmployeeData?.data?.address,
    status: showEmployeeData?.data?.status,
    photo: ""
  };

  const methods = useForm<IEmployeeManagementCreate>({
    mode: "all", reValidateMode: 'onBlur',
    resolver: yupResolver(updateValidation), defaultValues
  });

  const onSubmitHandler: SubmitHandler<IEmployeeManagementCreate> = async (data: IEmployeeManagementCreate) => {
    const modifiedData = {
      ...data,
      designationId: data.designationId.value,
      employeetypeId: data.employeetypeId.value,
      officeId: data.officeId.value,
      id: props?.data?.id,
      join_date: moment(data.join_date).format("YYYY-MM-DD"),
    }

    try {
      await employeeManagementUpdate(modifiedData).unwrap()
        .then((res: any) => {
          setVisible(true)
          if (res.statusCode === 200) {
            setNotification({
              url: '/admin/employee-management',
              title: translate(langData, lang, LangSetUpForForm.update_message.key) || 'Updated Successfully!!',
              autoClose: true,
            })
          }
        })
    } catch (error) {

    }

  }

  // onAction notification modal
  // const onActionNotification = () => { methods.reset(); setAlertDialogOpen(false) }

  useEffect(() => {
    methods.reset({
      employee_id: showEmployeeData?.data?.employee_id,
      name_en: showEmployeeData?.data?.name_en,
      name_bn: showEmployeeData?.data?.name_bn,
      father_name: showEmployeeData?.data?.father_name,
      mother_name: showEmployeeData?.data?.mother_name,
      nid: showEmployeeData?.data?.nid,
      officeId: { label: showEmployeeData?.data?.officeId.name_en, value: showEmployeeData?.data?.officeId.id },
      employeetypeId: { label: showEmployeeData?.data?.employeetypeId.name_en, value: showEmployeeData?.data?.employeetypeId.id },
      designationId: { label: showEmployeeData?.data?.designationId.name_en, value: showEmployeeData?.data?.designationId.id },
      join_date: showEmployeeData?.data?.join_date,
      email: showEmployeeData?.data?.email,
      mobile: showEmployeeData?.data?.mobile,
      address: showEmployeeData?.data?.address,
      photo: showEmployeeData?.data?.photo,
      status: showEmployeeData?.data?.status,
    })
  }, [showEmployeeData])

  const breadcrumbLink: any = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.employee_management.key) || 'Employee Management' },
    { href: '/admin/employee-management/add', label: translate(langData, lang, LangSetUpForEmployee.form.updateEmployee.key) || "Update Employee" }
  ]

  return (<>

    <FormLayout spinLoading={getIsLoading} >
      <Paper className="breadHeadField">
        <Box className="breadCrumbBg">
          <BreadCrumb listItems={breadcrumbLink} />
        </Box>
        <Box className="backBtn">
          <Button LinkComponent={Link}
            href="/admin/employee-management">
            {translate(langData, lang, LangSetUpForForm.back.key) || "Back"}
          </Button>
        </Box>
      </Paper>
      <FormLayoutBody>
        <FormProvider {...methods} >
          <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)} >
            <FormLayoutContent title={translate(langData, lang, LangSetUpForEmployee.form.updateEmployee.key) || "Update Employee"} >
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
                  <FormInputBootstrap name='name_en' id='EmployeeNameEn' />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="EmployeeName" required={true}>
                    {translate(langData, lang, LangSetUpForEmployee.form.officerNameBn.key) || "Officer Name (Bangla):"}
                  </FormInputLabel>
                  <FormInputBootstrap name='name_bn' id='EmployeeNameBn' />
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
                  <FormAutocomplete required name='employeetypeId' id='employeetypeId' dataSource={listArrayModify(employeeTypeList?.data)} />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="officeId" required={true}>
                    {translate(langData, lang, LangSetUpForEmployee.form.office.key) || "Office:"}
                  </FormInputLabel>
                  <FormAutocomplete required name='officeId' id='officeId' dataSource={listArrayModify(officeList?.data)} />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="designationId" required={true}>
                    {translate(langData, lang, LangSetUpForEmployee.form.designation.key) || "Designation:"}
                  </FormInputLabel>
                  <FormAutocomplete required name='designationId' id='designationId' dataSource={listArrayModify(designationList?.data)} />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="joinDate" required={true}>
                    {translate(langData, lang, LangSetUpForEmployee.form.dateOfJoining.key) || "Date of Joining:"}
                  </FormInputLabel>
                  {/* <FormInputBootstrap name='join_date' id="joinDate" /> */}
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
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="Address" >
                    {translate(langData, lang, LangSetUpForEmployee.form.address.key) || "Address:"}
                  </FormInputLabel>
                  <FormInputBootstrap name='address' id='Address' />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="Status" >
                    {translate(langData, lang, LangSetUpForList.status.key) || "Status"}
                  </FormInputLabel>
                  <FormSelect name='status' id='Status' dataSource={[{ id: 1, name: 'Active' }, { id: 0, name: 'Inactive' }]} />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="photo" >
                    {translate(langData, lang, LangSetUpForEmployee.form.image.key) || "Image:"}
                  </FormInputLabel>
                  <FormFileUpload name='photo' previewUrl={showEmployeeData?.data?.photo} />
                </Grid>
              </Grid>
              <FormLayoutFooter>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}> </Grid>
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

  </>)
}

export default EditNewEmployeeManagement