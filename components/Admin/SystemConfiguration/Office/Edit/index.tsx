import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, Grid, Paper } from "@mui/material"
import { useGetDistrictListQuery } from "Api/SystemConfiguration/District"
import { useGetDivisionListQuery } from "Api/SystemConfiguration/Division"
import { useShowOfficeQuery, useUpdateOfficeMutation } from "Api/SystemConfiguration/Office"
import { useGetOfficeTypeListQuery } from "Api/SystemConfiguration/OfficeType"
import { useGetUpazilaListQuery } from "Api/SystemConfiguration/Upazila"
import FormAutocomplete from "components/common/FormItem/FormAutocomplete"
import FormInputBootstrap, { FormInputLabel } from "components/common/FormItem/FormInputBootstrap"
import FormSelect from "components/common/FormItem/FormSelect"
import BreadCrumb from "components/common/PageBreadCrumb/BreadCrumb"
import { FormLayout, FormLayoutBody, FormLayoutContent, FormLayoutFooter } from "components/layouts/FormLayout"
import { useHotNotification } from "context/HotNotificationProvider"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { RootState } from "Store"
import { listArrayModify, translate } from 'Utils/Handler'
import { LangSetUpForForm } from "Utils/Language/MasterData/Form"
import { LangSetUpForList } from "Utils/Language/MasterData/List"
import { LangSetUpForMenu } from "Utils/Language/Menu"
import { LangSetUpForOffice } from "Utils/Language/SystemConfiguration/Office"
import { TypeOf } from "yup"
import { updateSchemaValidation } from "../Schema"

const EditOffice = () => {

  const router = useRouter()
  const { id } = router.query
  const { setVisible, setNotification } = useHotNotification()
  const { data: divisionList } = useGetDivisionListQuery()
  const { data: districtList } = useGetDistrictListQuery("")
  const { data: upazilaList } = useGetUpazilaListQuery("")
  const { data: officeTypeList } = useGetOfficeTypeListQuery()
  const { isLoading, data: showOffice } = useShowOfficeQuery(id)
  const [updateOffice] = useUpdateOfficeMutation()
  const { lang, langData } = useSelector((state: RootState) => state.lang);


  type IFormOfficeUpdateSchema = TypeOf<typeof updateSchemaValidation>;

  const defaultValues: IFormOfficeUpdateSchema = {
    name_en: "",
    name_bn: "",
    address: "",
    status: undefined,
    divisionId: { label: "", value: "" },
    districtId: { label: "", value: "" },
    upazilaId: { label: "", value: "" },
    officetypeId: { label: "", value: "" },
  }

  const methods = useForm<IFormOfficeUpdateSchema>({
    mode: 'all', reValidateMode: "onChange",
    resolver: yupResolver(updateSchemaValidation), defaultValues
  });

  const onSubmitHandler: SubmitHandler<IFormOfficeUpdateSchema> = async (items: IFormOfficeUpdateSchema) => {
    let modifyData = {
      ...items, id,
      divisionId: items.divisionId.value,
      districtId: items.districtId.value,
      upazilaId: items.upazilaId.value,
      officetypeId: items.officetypeId.value,
      status: Number(items.status)
    }

    try {
      await updateOffice(modifyData).unwrap()
        .then((res) => {
          if (res.statusCode === 200) {
            setVisible(true)
            setNotification({
              url: '/admin/system-configuration/office',
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
    methods.reset({
      name_en: showOffice?.data?.data?.name_en,
      name_bn: showOffice?.data?.data?.name_bn,
      status: showOffice?.data?.data?.status,
      address: showOffice?.data?.data?.address,
      divisionId: { label: showOffice?.data?.data?.divisionId?.name_en, value: showOffice?.data?.data?.divisionId?.id, },
      districtId: { label: showOffice?.data?.data?.districtId?.name_en, value: showOffice?.data?.data?.districtId?.id, },
      upazilaId: { label: showOffice?.data?.data?.upazilaId?.name_en, value: showOffice?.data?.data?.upazilaId?.id, },
      officetypeId: { label: showOffice?.data?.data?.officetypeId?.name_en, value: showOffice?.data?.data?.officetypeId?.id, },
    })
  }, [methods.reset, showOffice])

  const breadcrumbLink = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.system_configuration.key) || 'System Configuration' },
    { href: '/admin/system-configuration/office', label: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.office.key) || 'Office' },
    { href: '#', label: translate(langData, lang, LangSetUpForOffice.form.edit_office_title.key) || "Edit Office" }
  ]

  return (
    <FormLayout spinLoading={isLoading} >
      <Paper className="breadHeadField">
        <Box className="breadCrumbBg">
          <BreadCrumb listItems={breadcrumbLink} />
        </Box>
        <Box className="backBtn">
          <Button LinkComponent={Link}
            href="/admin/system-configuration/office">
            {translate(langData, lang, LangSetUpForForm.back.key) || "Back"}
          </Button>
        </Box>
      </Paper>
      <FormLayoutBody>
        <FormProvider {...methods} >
          <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)} >
            <FormLayoutContent title={translate(langData, lang, LangSetUpForOffice.form.edit_office_title.key) || "Edit Office"} >
              <Grid container spacing={2.5}>

                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="divisionId" required={true}>
                    {translate(langData, lang, LangSetUpForOffice.form.select_division_title.key) || "Select Division"}
                  </FormInputLabel>
                  <FormAutocomplete required name='divisionId' id="divisionId" dataSource={listArrayModify(divisionList?.data)} />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="districtId" required={true}>
                    {translate(langData, lang, LangSetUpForOffice.form.select_district_title.key) || "Select District"}
                  </FormInputLabel>
                  <FormAutocomplete required name='districtId' id="districtId" dataSource={listArrayModify(districtList?.data)} />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="upazilaId" required={true}>
                    {translate(langData, lang, LangSetUpForOffice.form.select_upazila_title.key) || "Select Upazila"}
                  </FormInputLabel>
                  <FormAutocomplete required name='upazilaId' id="upazilaId" dataSource={listArrayModify(upazilaList?.data)} />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="officetypeId" required={true}>
                    {translate(langData, lang, LangSetUpForOffice.form.select_office_type_title.key) || "Select Office Type"}
                  </FormInputLabel>
                  <FormAutocomplete required name='officetypeId' id="officetypeId" dataSource={listArrayModify(officeTypeList?.data)} />
                </Grid>

                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="nameEnglish" required={true}>
                    {translate(langData, lang, LangSetUpForOffice.list.name_en.key) || "Name (En)"}
                  </FormInputLabel>
                  <FormInputBootstrap name='name_en' id="nameEnglish" />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="nameBangla" required={true}>
                    {translate(langData, lang, LangSetUpForOffice.list.name_bn.key) || "Name (bn)"}
                  </FormInputLabel>
                  <FormInputBootstrap name='name_bn' id='nameBangla' />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="address" >
                    {translate(langData, lang, LangSetUpForOffice.list.address.key) || "Address"}
                  </FormInputLabel>
                  <FormInputBootstrap name='address' multiline id='address' />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="Status" >
                    {translate(langData, lang, LangSetUpForList.status.key) || "Status"}
                  </FormInputLabel>
                  <FormSelect name='status' id='Status' dataSource={[{ id: 1, name: 'Active' }, { id: 0, name: 'Inactive' }]} />
                </Grid>
              </Grid>
              <FormLayoutFooter>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}> </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="stuRightBtn">
                    <Box className="addBtn">
                      <Button type="submit"> + {translate(langData, lang, LangSetUpForForm.update.key) || "Update"} </Button>
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

export default EditOffice