import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, Grid, Paper } from "@mui/material"
import { useShowDistrictQuery, useUpdateDistrictMutation } from "Api/SystemConfiguration/District"
import { useGetDivisionListQuery } from "Api/SystemConfiguration/Division"
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
import { LangSetUpForDistrict } from "Utils/Language/SystemConfiguration/District"
import { TypeOf } from "yup"
import { updateSchemaValidation } from "../Schema"

const EditDistrict = () => {

  const router = useRouter()
  const { id } = router.query
  const { setVisible, setNotification } = useHotNotification()
  const { data: divisionList } = useGetDivisionListQuery()
  const { data: getDistrict, refetch } = useShowDistrictQuery(id)
  const [updateDistrict] = useUpdateDistrictMutation()
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  type IFormDistrictUpdateSchema = TypeOf<typeof updateSchemaValidation>;

  const defaultValues: IFormDistrictUpdateSchema = {
    divisionId: { label: "", value: "" },
    name_en: "",
    name_bn: "",
    status: undefined
  }

  const methods = useForm<IFormDistrictUpdateSchema>({
    mode: 'all', reValidateMode: "onChange",
    resolver: yupResolver(updateSchemaValidation), defaultValues
  });

  const onSubmitHandler: SubmitHandler<IFormDistrictUpdateSchema> = async (items: IFormDistrictUpdateSchema) => {
    let modifyData = { ...items, divisionId: items.divisionId.value, id }
    try {
      await updateDistrict(modifyData).unwrap()
        .then((res) => {
          if (res.statusCode === 200) {
            setVisible(true)
            setNotification({
              url: '/admin/system-configuration/district',
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
      divisionId: { label: getDistrict?.data?.data?.division.name_en, value: getDistrict?.data?.data?.division.id },
      name_en: getDistrict?.data?.data?.name_en,
      name_bn: getDistrict?.data?.data?.name_bn,
      status: getDistrict?.data?.data?.status,
    })
  }, [methods.reset, getDistrict])

  const breadcrumbCreate = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.system_configuration.key) || 'System Configuration' },
    { href: '/admin/system-configuration/district', label: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || 'District' },
    { href: '', label: translate(langData, lang, LangSetUpForDistrict.form.edit_district_title.key) || "Edit District" }
  ]

  return (
    <FormLayout>
      <Paper className="breadHeadField">
        <Box className="breadCrumbBg">
          <BreadCrumb listItems={breadcrumbCreate} />
        </Box>
        <Box className="backBtn">
          <Button LinkComponent={Link}
            href="/admin/system-configuration/district">
            {translate(langData, lang, LangSetUpForForm.back.key) || "Back"}
          </Button>
        </Box>
      </Paper>
      <FormLayoutBody>
        <FormProvider {...methods} >
          <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)} >
            <FormLayoutContent title={translate(langData, lang, LangSetUpForDistrict.form.edit_district_title.key) || "Edit District"} >
              <Grid container spacing={2.5}>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="divisionId" required={true}>
                    {translate(langData, lang, LangSetUpForDistrict.form.select_division_title.key) || "Select Division"}
                  </FormInputLabel>
                  <FormAutocomplete required name='divisionId' id="divisionId" dataSource={listArrayModify(divisionList?.data)} />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="nameEnglish" required={true}>
                    {translate(langData, lang, LangSetUpForDistrict.list.name_en.key) || "Name (En)"}
                  </FormInputLabel>
                  <FormInputBootstrap name='name_en' id="nameEnglish" />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="nameBangla" required={true}>
                    {translate(langData, lang, LangSetUpForDistrict.list.name_bn.key) || "Name (Bn)"}
                  </FormInputLabel>
                  <FormInputBootstrap name='name_bn' id='nameBangla' />
                </Grid>
                <Grid item xs={12} md={6} >
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

export default EditDistrict