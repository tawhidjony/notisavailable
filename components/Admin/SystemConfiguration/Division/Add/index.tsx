import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Grid } from "@mui/material"
import { Box } from "@mui/system"
import { useCreateDivisionMutation } from "Api/SystemConfiguration/Division"
import FormInputBootstrap, { FormInputLabel } from "components/common/FormItem/FormInputBootstrap"
import BreadCrumb from "components/common/PageBreadCrumb/BreadCrumb"
import { FormLayout, FormLayoutBody, FormLayoutContent, FormLayoutFooter, FormLayoutHeader } from "components/layouts/FormLayout"
import { useHotNotification } from "context/HotNotificationProvider"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { RootState } from "Store"
import { translate } from "Utils/Handler"
import { LangSetUpForForm } from "Utils/Language/MasterData/Form"
import { LangSetUpForMenu } from "Utils/Language/Menu"
import { LangSetUpForDivision } from "Utils/Language/SystemConfiguration/Division"
import { TypeOf } from "yup"
import { createSchemaValidation } from "../Schema"


const CreateDivision = () => {

  const { setVisible, setNotification } = useHotNotification()
  const [creteDivision] = useCreateDivisionMutation()
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  type IFormDivisionCreateSchema = TypeOf<typeof createSchemaValidation>;

  const defaultValues: IFormDivisionCreateSchema = {
    name_en: "",
    name_bn: ""
  }

  const methods = useForm<IFormDivisionCreateSchema>({
    mode: "all", reValidateMode: "onChange",
    resolver: yupResolver(createSchemaValidation), defaultValues
  })

  const onSubmitHandler: SubmitHandler<IFormDivisionCreateSchema> = async (items: IFormDivisionCreateSchema) => {
    let modifyData = { ...items }
    try {
      await creteDivision(modifyData).unwrap()
        .then((res) => {
          if (res.statusCode === 201) {
            setVisible(true)
            setNotification({
              url: '/admin/system-configuration/division',
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
    } catch (error) {
    }
  }

  const breadcrumbLink = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.system_configuration.key) || 'System Configuration' },
    { href: '/admin/system-configuration/division', label: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || 'Designation' },
    { href: '#', label: translate(langData, lang, LangSetUpForDivision.form.add_division_title.key) || "Add new Division" },
  ]

  return (
    <FormLayout>
      <FormLayoutHeader>
        <BreadCrumb listItems={breadcrumbLink} />
      </FormLayoutHeader>
      <FormLayoutBody>
        <FormProvider {...methods} >
          <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)} >
            <FormLayoutContent title={translate(langData, lang, LangSetUpForDivision.form.add_division_title.key) || "Add new Division"}>
              <Grid container spacing={2.5}>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="nameEnglish" required={true}>
                    {translate(langData, lang, LangSetUpForDivision.list.name_en.key) || "Name (En)"}
                  </FormInputLabel>
                  <FormInputBootstrap name='name_en' id="nameEnglish" />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="nameBangla" required={true}>
                    {translate(langData, lang, LangSetUpForDivision.list.name_bn.key) || "Name (BN)"}
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
                      <Button type="submit"> + {translate(langData, lang, LangSetUpForForm.submit.key) || "Submit"}  </Button>
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

export default CreateDivision