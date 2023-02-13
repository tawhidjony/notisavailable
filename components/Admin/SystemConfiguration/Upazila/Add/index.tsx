import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Grid } from "@mui/material"
import { Box } from "@mui/system"
import { useGetDistrictListQuery } from "Api/SystemConfiguration/District"
import { useGetDivisionListQuery } from "Api/SystemConfiguration/Division"
import { useCreateUpazilaMutation } from "Api/SystemConfiguration/Upazila"
import FormAutocomplete from "components/common/FormItem/FormAutocomplete"
import FormInputBootstrap, { FormInputLabel } from "components/common/FormItem/FormInputBootstrap"
import BreadCrumb from "components/common/PageBreadCrumb/BreadCrumb"
import { FormLayout, FormLayoutBody, FormLayoutContent, FormLayoutFooter, FormLayoutHeader } from "components/layouts/FormLayout"
import { useHotNotification } from "context/HotNotificationProvider"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { RootState } from "Store"
import { listArrayModify, translate } from "Utils/Handler"
import { LangSetUpForForm } from "Utils/Language/MasterData/Form"
import { LangSetUpForMenu } from "Utils/Language/Menu"
import { LangSetUpForUpazila } from "Utils/Language/SystemConfiguration/Upazila"
import { TypeOf } from "yup"
import { createSchemaValidation } from "../Schema"


const CreateUpazila = () => {

  const { setVisible, setNotification } = useHotNotification()
  const { data: divisionList } = useGetDivisionListQuery()
  const { data: districtList } = useGetDistrictListQuery("")
  const [createUpazila] = useCreateUpazilaMutation()
  type IFormDivisionCreateSchema = TypeOf<typeof createSchemaValidation>;
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  const defaultValues: IFormDivisionCreateSchema = {
    name_en: "",
    name_bn: "",
    divisionId: { label: "", value: "" },
    districtId: { label: "", value: "" },
  }

  const methods = useForm<IFormDivisionCreateSchema>({
    mode: "all", reValidateMode: "onChange",
    resolver: yupResolver(createSchemaValidation), defaultValues
  })


  const onSubmitHandler: SubmitHandler<IFormDivisionCreateSchema> = async (items: IFormDivisionCreateSchema) => {
    let modifyData = {
      name_bn: items.name_bn,
      name_en: items.name_en,
      districtId: items.districtId.value
    }
    try {
      await createUpazila(modifyData).unwrap()
        .then((res) => {
          if (res.statusCode === 201) {
            setVisible(true)
            setNotification({
              url: '/admin/system-configuration/upazila',
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
    { href: '/admin/system-configuration/upazila', label: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || 'Upazila' },
    { href: '#', label: translate(langData, lang, LangSetUpForUpazila.form.add_upazila_title.key) || "Add New Upazila" }
  ]

  return (
    <FormLayout>
      <FormLayoutHeader>
        <BreadCrumb listItems={breadcrumbLink} />
      </FormLayoutHeader>
      <FormLayoutBody>
        <FormProvider {...methods} >
          <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)} >
            <FormLayoutContent title={translate(langData, lang, LangSetUpForUpazila.form.add_upazila_title.key) || "Add New Upazila"} >
              <Grid container spacing={2.5}>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="divisionId">
                    {translate(langData, lang, LangSetUpForUpazila.form.select_division_title.key) || "Select Division"}
                  </FormInputLabel>
                  <FormAutocomplete required name='divisionId' id="divisionId" dataSource={listArrayModify(divisionList?.data)} />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="districtId" required={true}>
                    {translate(langData, lang, LangSetUpForUpazila.form.select_district_title.key) || "Select District"}
                  </FormInputLabel>
                  <FormAutocomplete required name='districtId' id="districtId" dataSource={listArrayModify(districtList?.data)} />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="nameEnglish" required={true}>
                    {translate(langData, lang, LangSetUpForUpazila.list.name_en.key) || "Name (En)"}
                  </FormInputLabel>
                  <FormInputBootstrap name='name_en' id="nameEnglish" />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="nameBangla" required={true}>
                    {translate(langData, lang, LangSetUpForUpazila.list.name_bn.key) || "Name (Bn)"}
                  </FormInputLabel>
                  <FormInputBootstrap name='name_bn' id='nameBangla' />
                </Grid>
              </Grid>
              <FormLayoutFooter>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="stuLeftBtn">
                    <Box className="clearBtn">
                      <Button type="button" onClick={() => methods.reset()} > {translate(langData, lang, LangSetUpForForm.reset.key) || "Reset"}  </Button>
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

export default CreateUpazila