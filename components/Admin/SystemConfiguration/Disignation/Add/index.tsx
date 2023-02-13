import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Grid } from "@mui/material"
import { Box } from "@mui/system"
import { useCreateDesignationMutation } from "Api/SystemConfiguration/Designation"
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
import { LangSetUpForDesignation } from "Utils/Language/SystemConfiguration/Designation"
import { TypeOf } from "yup"
import { createSchemaValidation } from "../Schema"


const CreateDesignation = () => {

  const { setVisible, setNotification } = useHotNotification()
  const { lang, langData } = useSelector((state: RootState) => state.lang);
  const [creteDesignation] = useCreateDesignationMutation()

  type IFormDesignationCreateSchema = TypeOf<typeof createSchemaValidation>;

  const defaultValues: IFormDesignationCreateSchema = {
    name_en: "",
    name_bn: "",
    priority: undefined
  }

  const methods = useForm<IFormDesignationCreateSchema>({
    mode: "all", reValidateMode: "onChange",
    resolver: yupResolver(createSchemaValidation), defaultValues
  })


  const onSubmitHandler: SubmitHandler<IFormDesignationCreateSchema> = async (items: IFormDesignationCreateSchema) => {
    let modifyData = { ...items, priority: Number(items.priority) }
    try {
      await creteDesignation(modifyData).unwrap()
        .then((res) => {
          if (res.statusCode === 201) {
            setVisible(true)
            setNotification({
              url: '/admin/system-configuration/designation',
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
    { href: '/admin/system-configuration/designation', label: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.designation.key) || 'Designation' },
    { href: '#', label: translate(langData, lang, LangSetUpForDesignation.form.add_designation_title.key) || "Add New Designation" }
  ]

  return (
    <FormLayout>
      <FormLayoutHeader>
        <BreadCrumb listItems={breadcrumbLink} />
      </FormLayoutHeader>
      <FormLayoutBody>
        <FormProvider {...methods} >
          <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)} >
            <FormLayoutContent title={translate(langData, lang, LangSetUpForDesignation.form.add_designation_title.key) || "Add New Designation"} >
              <Grid container spacing={2.5}>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="nameEnglish" required={true} >{translate(langData, lang, LangSetUpForDesignation.list.name_en.key) || "Name EN"}</FormInputLabel>
                  <FormInputBootstrap name='name_en' id="nameEnglish" />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="nameBangla" required={true}>{translate(langData, lang, LangSetUpForDesignation.list.name_bn.key) || "Name BN"}</FormInputLabel>
                  <FormInputBootstrap name='name_bn' id='nameBangla' />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="priority" required={true}>{translate(langData, lang, LangSetUpForDesignation.form.priority.key) || "Priority"}</FormInputLabel>
                  <FormInputBootstrap name='priority' type="number" id='priority' />
                </Grid>
              </Grid>
              <FormLayoutFooter>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="stuLeftBtn">
                    <Box className="clearBtn">
                      <Button type="button" onClick={() => methods.reset()} >  {translate(langData, lang, LangSetUpForForm.reset.key) || "Reset"} </Button>
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

export default CreateDesignation