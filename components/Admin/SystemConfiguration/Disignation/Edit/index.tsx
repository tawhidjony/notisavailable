import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Grid, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { useShowDesignationQuery, useUpdateDesignationMutation } from "Api/SystemConfiguration/Designation"
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
import { translate } from "Utils/Handler"
import { LangSetUpForForm } from "Utils/Language/MasterData/Form"
import { LangSetUpForList } from "Utils/Language/MasterData/List"
import { LangSetUpForMenu } from "Utils/Language/Menu"
import { LangSetUpForDesignation } from "Utils/Language/SystemConfiguration/Designation"
import { TypeOf } from 'yup'
import { updateSchemaValidation } from "../Schema"


const EditDesignation = () => {

  const router = useRouter()
  const { id } = router.query
  const { setVisible, setNotification } = useHotNotification()
  const { lang, langData } = useSelector((state: RootState) => state.lang);
  const { isLoading, data: showDesignation, refetch } = useShowDesignationQuery(id)
  const [updateDesignation] = useUpdateDesignationMutation()

  type IFormDesignationUpdateSchema = TypeOf<typeof updateSchemaValidation>;

  const defaultValues: IFormDesignationUpdateSchema = {
    name_en: "",
    name_bn: "",
    priority: undefined,
    status: undefined
  }

  const methods = useForm<IFormDesignationUpdateSchema>({
    mode: "all", reValidateMode: "onChange",
    resolver: yupResolver(updateSchemaValidation), defaultValues
  })

  const onSubmitHandler: SubmitHandler<IFormDesignationUpdateSchema> = async (items: IFormDesignationUpdateSchema) => {
    let modifyData = { ...items, id: id, status: Number(items.status), priority: Number(items.priority) }
    try {
      await updateDesignation(modifyData).unwrap()
        .then((res) => {
          if (res.statusCode === 200) {
            setVisible(true)
            setNotification({
              url: '/admin/system-configuration/designation',
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
      name_en: showDesignation?.data?.data?.name_en,
      name_bn: showDesignation?.data?.data?.name_bn,
      priority: showDesignation?.data?.data?.priority,
      status: showDesignation?.data?.data?.status,
    })
  }, [methods.reset, showDesignation])

  const breadcrumbLink = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.system_configuration.key) || 'System Configuration' },
    { href: '/admin/system-configuration/designation', label: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.designation.key) || 'Designation' },
    { href: '#', label: translate(langData, lang, LangSetUpForDesignation.form.edit_designation_title.key) || "Update Designation" }
  ]

  return (
    <FormLayout spinLoading={isLoading} >
      {/* <FormLayoutHeader>
        <Box className="breadHeadField">
          <Box className="breadCrumbBg">
            <BreadCrumb listItems={breadcrumbLink} />
          </Box>
          <Box className="backBtn">
            <Button LinkComponent={Link}
              href="/admin/system-configuration/designation">
              {translate(langData, lang, LangSetUpForForm.back.key) || "Back"}
            </Button>
          </Box>
        </Box>
      </FormLayoutHeader> */}
      <Paper className="breadHeadField">
        <Box className="breadCrumbBg">
          <BreadCrumb listItems={breadcrumbLink} />
        </Box>
        <Box className="backBtn">
          <Button LinkComponent={Link}
            href="/admin/system-configuration/designation">
            {translate(langData, lang, LangSetUpForForm.back.key) || "Back"}
          </Button>
        </Box>
      </Paper>

      <FormLayoutBody>
        <FormProvider {...methods} >
          <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)} >
            <FormLayoutContent title={translate(langData, lang, LangSetUpForDesignation.form.edit_designation_title.key) || "Edit Designation"} >
              <Grid container spacing={2.5}>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="nameEnglish" required={true}>{translate(langData, lang, LangSetUpForDesignation.list.name_en.key) || "Name (English)"}</FormInputLabel>
                  <FormInputBootstrap name='name_en' id="nameEnglish" />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="nameBangla" required={true}>{translate(langData, lang, LangSetUpForDesignation.list.name_bn.key) || "Name (Bangla)"}</FormInputLabel>
                  <FormInputBootstrap name='name_bn' id='nameBangla' />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="priority" required={true}>{translate(langData, lang, LangSetUpForDesignation.form.priority.key) || "Priority"}</FormInputLabel>
                  <FormInputBootstrap name='priority' type="number" id='priority' />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="Status" > {translate(langData, lang, LangSetUpForList.status.key) || "Status"}</FormInputLabel>
                  <FormSelect name='status' id='Status' dataSource={[{ id: 1, name: 'Active' }, { id: 0, name: 'Inactive' }]} />
                </Grid>
              </Grid>
              <FormLayoutFooter>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}></Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className="stuRightBtn">
                    <Box className="addBtn">
                      <Button type="submit"> + {translate(langData, lang, LangSetUpForForm.update.key) || "Update"}</Button>
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

export default EditDesignation