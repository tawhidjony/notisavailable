import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, Grid } from "@mui/material"
import { useGetDistrictListQuery } from "Api/SystemConfiguration/District"
import { useGetDivisionListQuery } from "Api/SystemConfiguration/Division"
import { useCreateOfficeMutation } from "Api/SystemConfiguration/Office"
import { useGetOfficeTypeListQuery } from "Api/SystemConfiguration/OfficeType"
import { useGetUpazilaListQuery } from "Api/SystemConfiguration/Upazila"
import FormAutocomplete from "components/common/FormItem/FormAutocomplete"
import FormInputBootstrap, { FormInputLabel } from "components/common/FormItem/FormInputBootstrap"
import BreadCrumb from "components/common/PageBreadCrumb/BreadCrumb"
import { FormLayout, FormLayoutBody, FormLayoutContent, FormLayoutFooter, FormLayoutHeader } from "components/layouts/FormLayout"
import { useHotNotification } from "context/HotNotificationProvider"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { RootState } from "Store"
import { listArrayModify, translate } from 'Utils/Handler'
import { LangSetUpForForm } from "Utils/Language/MasterData/Form"
import { LangSetUpForMenu } from "Utils/Language/Menu"
import { LangSetUpForOffice } from "Utils/Language/SystemConfiguration/Office"
import { TypeOf } from "yup"
import { createSchemaValidation } from "../Schema"

const CreateOffice = () => {

  const { setVisible, setNotification } = useHotNotification()
  const { data: divisionList } = useGetDivisionListQuery()
  const { data: districtList } = useGetDistrictListQuery("")
  const { data: upazilaList } = useGetUpazilaListQuery("")
  const { data: officeTypeList } = useGetOfficeTypeListQuery()
  const [createOffice] = useCreateOfficeMutation()
  const { lang, langData } = useSelector((state: RootState) => state.lang);


  type IFormOfficeCreateSchema = TypeOf<typeof createSchemaValidation>;

  const defaultValues: IFormOfficeCreateSchema = {
    name_en: "",
    name_bn: "",
    address: "",
    divisionId: { label: "", value: "" },
    districtId: { label: "", value: "" },
    upazilaId: { label: "", value: "" },
    officetypeId: { label: "", value: "" },
  }

  const methods = useForm<IFormOfficeCreateSchema>({
    mode: 'all', reValidateMode: "onChange",
    resolver: yupResolver(createSchemaValidation), defaultValues
  });

  const onSubmitHandler: SubmitHandler<IFormOfficeCreateSchema> = async (items: IFormOfficeCreateSchema) => {
    let modifyData = {
      ...items,
      divisionId: items.divisionId.value,
      districtId: items.districtId.value,
      upazilaId: items.upazilaId.value,
      officetypeId: items.officetypeId.value,
    }

    try {
      await createOffice(modifyData).unwrap()
        .then((res) => {
          if (res.statusCode === 201) {
            setVisible(true)
            setNotification({
              url: '/admin/system-configuration/office',
              title: translate(langData, lang, LangSetUpForForm.create_message.key) || 'Created Successfully!!',
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

  const breadcrumbLink = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.system_configuration.key) || 'System Configuration' },
    { href: '/admin/system-configuration/office', label: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.office.key) || 'Office' },
    { href: '#', label: translate(langData, lang, LangSetUpForOffice.form.add_office_title.key) || "Add New Office" }
  ]

  return (
    <FormLayout>
      <FormLayoutHeader>
        <BreadCrumb listItems={breadcrumbLink} />
      </FormLayoutHeader>
      <FormLayoutBody>
        <FormProvider {...methods} >
          <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)} >
            <FormLayoutContent title={translate(langData, lang, LangSetUpForOffice.form.add_office_title.key) || "Add New Office"} >
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
              </Grid>
              <FormLayoutFooter>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="stuLeftBtn">
                    <Box className="clearBtn">
                      <Button type="button" onClick={() => methods.reset()} > {translate(langData, lang, LangSetUpForForm.reset.key) || "Reset"}</Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="stuRightBtn">
                    <Box className="addBtn">
                      <Button type="submit"> + {translate(langData, lang, LangSetUpForForm.submit.key) || "Submit"} </Button>
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

export default CreateOffice