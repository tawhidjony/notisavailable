import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Grid, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { useGetDistrictListQuery } from "Api/SystemConfiguration/District"
import { useGetDivisionListQuery } from "Api/SystemConfiguration/Division"
import { useShowUpazilaQuery, useUpdateUpazilaMutation } from "Api/SystemConfiguration/Upazila"
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
import { listArrayModify, translate } from "Utils/Handler"
import { LangSetUpForForm } from "Utils/Language/MasterData/Form"
import { LangSetUpForList } from "Utils/Language/MasterData/List"
import { LangSetUpForMenu } from "Utils/Language/Menu"
import { LangSetUpForUpazila } from "Utils/Language/SystemConfiguration/Upazila"
import { TypeOf } from 'yup'
import { updateSchemaValidation } from "../Schema"


const EditUpazila = () => {

  const router = useRouter()
  const { id } = router.query
  const { setVisible, setNotification } = useHotNotification()
  const { data: divisionList } = useGetDivisionListQuery()
  const { data: districtList } = useGetDistrictListQuery("")
  const { data: showUpazila, isLoading, refetch } = useShowUpazilaQuery(id)
  const [updateUpazila] = useUpdateUpazilaMutation()
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  type IFormUpazilaUpdateSchema = TypeOf<typeof updateSchemaValidation>;

  const defaultValues: IFormUpazilaUpdateSchema = {
    name_en: "",
    name_bn: "",
    status: undefined,
    divisionId: { label: "", value: "" },
    districtId: { label: "", value: "" },
  }

  const methods = useForm<IFormUpazilaUpdateSchema>({
    mode: "all", reValidateMode: "onChange",
    resolver: yupResolver(updateSchemaValidation), defaultValues
  })

  const onSubmitHandler: SubmitHandler<IFormUpazilaUpdateSchema> = async (items: IFormUpazilaUpdateSchema) => {
    let modifyData = {
      id: id,
      name_bn: items.name_bn,
      name_en: items.name_en,
      districtId: items.districtId.value,
      status: Number(items.status),
    }

    try {
      await updateUpazila(modifyData).unwrap()
        .then((res) => {
          if (res.statusCode === 200) {
            setVisible(true)
            setNotification({
              url: '/admin/system-configuration/upazila',
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
      name_en: showUpazila?.data?.data?.name_en,
      name_bn: showUpazila?.data?.data?.name_bn,
      status: showUpazila?.data?.data?.status,
      divisionId: { label: showUpazila?.data?.data?.districtId.division?.name_en, value: showUpazila?.data?.data?.districtId?.division?.id, },
      districtId: { label: showUpazila?.data?.data?.districtId?.name_en, value: showUpazila?.data?.data?.districtId?.id, },
    })
  }, [methods.reset, showUpazila])

  const breadcrumbLink = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.system_configuration.key) || 'System Configuration' },
    { href: '/admin/system-configuration/upazila', label: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || 'Upazila' },
    { href: '#', label: translate(langData, lang, LangSetUpForUpazila.form.edit_upazila_title.key) || "Edit Upazila" }
  ]

  return (
    <FormLayout spinLoading={isLoading} >
      <Paper className="breadHeadField">
        <Box className="breadCrumbBg">
          <BreadCrumb listItems={breadcrumbLink} />
        </Box>
        <Box className="backBtn">
          <Button LinkComponent={Link}
            href="/admin/system-configuration/upazila">
            {translate(langData, lang, LangSetUpForForm.back.key) || "Back"}
          </Button>
        </Box>
      </Paper>
      <FormLayoutBody>
        <FormProvider {...methods} >
          <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)} >
            <FormLayoutContent title={translate(langData, lang, LangSetUpForUpazila.form.edit_upazila_title.key) || "Edit Upazila"} >
              <Grid container spacing={2.5}>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="divisionId">
                    {translate(langData, lang, LangSetUpForUpazila.form.select_division_title.key) || "Select Division"}
                  </FormInputLabel>
                  <FormAutocomplete name='divisionId' id="divisionId" dataSource={listArrayModify(divisionList?.data)} />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="districtId" required={true}>
                    {translate(langData, lang, LangSetUpForUpazila.form.select_district_title.key) || "Select District"}
                  </FormInputLabel>
                  <FormAutocomplete name='districtId' id="districtId" dataSource={listArrayModify(districtList?.data)} />
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

export default EditUpazila