import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Grid } from "@mui/material"
import { Box } from "@mui/system"
import { useCreateEmployeeTypeMutation } from "Api/SystemConfiguration/EmployeeType"
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
import { LangSetUpForEmployeeType } from "Utils/Language/SystemConfiguration/EmployeeType"
import { TypeOf } from "yup"
import { createSchemaValidation } from "../Schema"


const CreateEmployeeType = () => {

  const { setVisible, setNotification } = useHotNotification()
  const [createEmployeeType] = useCreateEmployeeTypeMutation()
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  type IFormEmployeeTypeCreateSchema = TypeOf<typeof createSchemaValidation>;

  const defaultValues: IFormEmployeeTypeCreateSchema = {
    name_en: "",
    name_bn: ""
  }

  const methods = useForm<IFormEmployeeTypeCreateSchema>({
    mode: "all", reValidateMode: "onChange",
    resolver: yupResolver(createSchemaValidation), defaultValues
  })


  const onSubmitHandler: SubmitHandler<IFormEmployeeTypeCreateSchema> = async (items: IFormEmployeeTypeCreateSchema) => {
    let modifyData = { ...items }
    try {
      await createEmployeeType(modifyData).unwrap()
        .then((res) => {
          if (res.statusCode === 201) {
            setVisible(true)
            setNotification({
              url: '/admin/system-configuration/employeetype',
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
    { href: '/admin/system-configuration/employeetype/add', label: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.employeetype.key) || 'Employee Type' },
    { href: '#', label: translate(langData, lang, LangSetUpForEmployeeType.form.add_employee_type_title.key) || "Add New Employee Type" }
  ]

  return (
    <FormLayout>
      <FormLayoutHeader>
        <BreadCrumb listItems={breadcrumbLink} />
      </FormLayoutHeader>
      <FormLayoutBody>
        <FormProvider {...methods} >
          <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)} >
            <FormLayoutContent title={translate(langData, lang, LangSetUpForEmployeeType.form.add_employee_type_title.key) || "Add New Employee Type"} >
              <Grid container spacing={2.5}>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="nameEnglish" required={true}>
                    {translate(langData, lang, LangSetUpForEmployeeType.list.name_en.key) || "Name (EN)"}
                  </FormInputLabel >
                  <FormInputBootstrap name='name_en' id="nameEnglish" />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="nameBangla" required={true}>
                    {translate(langData, lang, LangSetUpForEmployeeType.list.name_bn.key) || "Name (BN)"}
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

export default CreateEmployeeType