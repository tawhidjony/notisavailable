import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Grid, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { useShowDivisionQuery, useUpdateDivisionMutation } from "Api/SystemConfiguration/Division"
import FormInputBootstrap, { FormInputLabel } from "components/common/FormItem/FormInputBootstrap"
import FormSelect from "components/common/FormItem/FormSelect"
import BreadCrumb from "components/common/PageBreadCrumb/BreadCrumb"
import { FormLayout, FormLayoutBody, FormLayoutContent, FormLayoutFooter } from "components/layouts/FormLayout"
import { useHotNotification } from "context/HotNotificationProvider"
import Link from "next/link"
import { useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { RootState } from "Store"
import { translate } from "Utils/Handler"
import { LangSetUpForForm } from "Utils/Language/MasterData/Form"
import { LangSetUpForList } from "Utils/Language/MasterData/List"
import { LangSetUpForMenu } from "Utils/Language/Menu"
import { LangSetUpForDivision } from "Utils/Language/SystemConfiguration/Division"
import { TypeOf } from 'yup'
import { updateSchemaValidation } from "../Schema"

type Props = {
  propsData: any
}

const EditDivision = ({ propsData }: Props) => {

  const { id } = propsData
  const { setVisible, setNotification } = useHotNotification()
  const { data: showDivision, refetch, isLoading } = useShowDivisionQuery(id)
  const [updateDivision] = useUpdateDivisionMutation()
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  type IFormDivisionUpdateSchema = TypeOf<typeof updateSchemaValidation>;

  const defaultValues: IFormDivisionUpdateSchema = {
    name_en: "",
    name_bn: "",
    status: undefined
  }

  const methods = useForm<IFormDivisionUpdateSchema>({
    mode: "all", reValidateMode: "onChange",
    resolver: yupResolver(updateSchemaValidation), defaultValues
  })

  const onSubmitHandler: SubmitHandler<IFormDivisionUpdateSchema> = async (items: IFormDivisionUpdateSchema) => {
    let modifyData = { ...items, id: id, status: Number(items.status) }
    try {
      await updateDivision(modifyData).unwrap()
        .then((res) => {
          if (res.statusCode === 200) {
            setVisible(true)
            setNotification({
              url: '/admin/system-configuration/division',
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
      name_en: showDivision?.data?.data?.name_en,
      name_bn: showDivision?.data?.data?.name_bn,
      status: showDivision?.data?.data?.status,
    })
  }, [methods.reset, showDivision])

  const breadcrumbLink = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.system_configuration.key) || 'System Configuration' },
    { href: '/admin/system-configuration/division', label: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || 'Division' },
    { href: '#', label: translate(langData, lang, LangSetUpForDivision.form.edit_division_title.key) || "Edit Division" }
  ]

  return (
    <FormLayout spinLoading={isLoading} >
      <Paper className="breadHeadField">
        <Box className="breadCrumbBg">
          <BreadCrumb listItems={breadcrumbLink} />
        </Box>
        <Box className="backBtn">
          <Button LinkComponent={Link}
            href="/admin/system-configuration/division">
            {translate(langData, lang, LangSetUpForForm.back.key) || "Back"}
          </Button>
        </Box>
      </Paper>
      <FormLayoutBody>
        <FormProvider {...methods} >
          <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)} >
            <FormLayoutContent title={translate(langData, lang, LangSetUpForDivision.form.edit_division_title.key) || "Edit Division"} >
              <Grid container spacing={2.5}>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="nameEnglish" required={true}>
                    {translate(langData, lang, LangSetUpForDivision.list.name_en.key) || "Name (EN)"}
                  </FormInputLabel>
                  <FormInputBootstrap name='name_en' id="nameEnglish" />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="nameBangla" required={true}>
                    {translate(langData, lang, LangSetUpForDivision.list.name_bn.key) || "Name (BN)"}
                  </FormInputLabel>
                  <FormInputBootstrap name='name_bn' id='nameBangla' />
                </Grid>
                <Grid item xs={12} md={4} >
                  <FormInputLabel htmlFor="Status" >
                    {translate(langData, lang, LangSetUpForList.status.key) || "Status"}
                  </FormInputLabel>
                  <FormSelect name='status' id='Status' dataSource={[{ id: 1, name: 'Active' }, { id: 0, name: 'Inactive' }]} />
                </Grid>

              </Grid>
              <FormLayoutFooter>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}></Grid>
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

export default EditDivision