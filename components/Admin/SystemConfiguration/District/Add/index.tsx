import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, Grid } from "@mui/material"
import { useCreateDistrictMutation } from "Api/SystemConfiguration/District"
import { useGetDivisionListQuery } from "Api/SystemConfiguration/Division"
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
import { LangSetUpForDistrict } from "Utils/Language/SystemConfiguration/District"
import { TypeOf } from "yup"
import { createSchemaValidation } from "../Schema"

const CreateDistrict = () => {

  const { setVisible, setNotification } = useHotNotification()
  const { data: divisionList } = useGetDivisionListQuery()
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  const [createDistrict] = useCreateDistrictMutation()

  type IFormDistrictCreateSchema = TypeOf<typeof createSchemaValidation>;

  const defaultValues: IFormDistrictCreateSchema = {
    divisionId: { label: "", value: "" },
    name_en: "",
    name_bn: ""
  }

  const methods = useForm<IFormDistrictCreateSchema>({
    mode: 'all', reValidateMode: "onChange",
    resolver: yupResolver(createSchemaValidation), defaultValues
  });
  const onSubmitHandler: SubmitHandler<IFormDistrictCreateSchema> = async (items: IFormDistrictCreateSchema) => {
    let modifyData = { ...items, divisionId: items.divisionId.value }
    try {
      await createDistrict(modifyData).unwrap()
        .then((res) => {
          if (res.statusCode === 201) {
            setVisible(true)
            setNotification({
              url: '/admin/system-configuration/district',
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

  const breadcrumbCreate = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.system_configuration.key) || 'System Configuration' },
    {
      href: '/admin/system-configuration/district', label: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district
        .key) || 'District'
    },
    { href: '#', label: translate(langData, lang, LangSetUpForDistrict.form.add_district_title.key) || "Add New District" },
  ]

  return (
    <FormLayout>
      <FormLayoutHeader>
        <BreadCrumb listItems={breadcrumbCreate} />
      </FormLayoutHeader>
      <FormLayoutBody>
        <FormProvider {...methods} >
          <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)} >
            <FormLayoutContent title={translate(langData, lang, LangSetUpForDistrict.form.add_district_title.key) || "Add New District"} >
              <Grid container spacing={2.5}>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="divisionId" required={true}>
                    {translate(langData, lang, LangSetUpForDistrict.form.select_division_title.key) || "Select Division"}
                  </FormInputLabel>
                  <FormAutocomplete required name='divisionId' id="divisionId" dataSource={listArrayModify(divisionList?.data)} />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="nameEnglish" required={true}>
                    {translate(langData, lang, LangSetUpForDistrict.list.name_en.key) || "Name (En)"}
                  </FormInputLabel>
                  <FormInputBootstrap name='name_en' id="nameEnglish" />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="nameBangla" required={true}>
                    {translate(langData, lang, LangSetUpForDistrict.list.name_bn.key) || "Name (Bn)"}
                  </FormInputLabel>
                  <FormInputBootstrap name='name_bn' id='nameBangla' />
                </Grid>
              </Grid>
              <FormLayoutFooter>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="stuLeftBtn">
                    <Box className="clearBtn">
                      <Button type="button" onClick={() => methods.reset()} > {translate(langData, lang, LangSetUpForForm.reset.key) || "Reset"} </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="stuRightBtn">
                    <Box className="addBtn">
                      <Button type="submit">+ {translate(langData, lang, LangSetUpForForm.submit.key) || "Submit"} </Button>
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

export default CreateDistrict