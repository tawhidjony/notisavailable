import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Grid, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { useShowResourceCenterQuery, useUpdateResourceCenterMutation } from "Api/Center/ResourceCenter"
import { useGetResourceCentertypeAllListQuery } from "Api/Center/ResourceCenterType"
import { useGetCityCorporationListQuery } from "Api/SystemConfiguration/CityCorporation"
import { useGetDistrictListQuery } from "Api/SystemConfiguration/District"
import { useGetDivisionListQuery } from "Api/SystemConfiguration/Division"
import { useGetUpazilaListQuery } from "Api/SystemConfiguration/Upazila"
import AlertDialog from "components/common/DeleteModal"
import FormAutocomplete from "components/common/FormItem/FormAutocomplete"
import FormFileUpload from "components/common/FormItem/FormFileUpload"
import FormInputBootstrap, { FormInputLabel } from "components/common/FormItem/FormInputBootstrap"
import FormSelect from "components/common/FormItem/FormSelect"
import BreadCrumb from "components/common/PageBreadCrumb/BreadCrumb"
import { FormLayout, FormLayoutBody, FormLayoutContent, FormLayoutFooter } from "components/layouts/FormLayout"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { RootState } from "Store"
import { listArrayModify, translate } from "Utils/Handler"
import { LangSetUpForCenter } from "Utils/Language/CenterManagement"
import { LangSetUpForForm } from "Utils/Language/MasterData/Form"
import { LangSetUpForList } from "Utils/Language/MasterData/List"
import { LangSetUpForMenu } from "Utils/Language/Menu"
import { TypeOf } from "yup"
import { updateValidation } from "../Validation"


const EditResourceCenter = (props: any) => {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)

  const { lang, langData } = useSelector((state: RootState) => state.lang);

  const { data: showResourceCenterData, isLoading: getIsLoading } = useShowResourceCenterQuery(props?.data?.id)
  console.log('showResourceCenterData', showResourceCenterData);

  type IResourceCenterUpdate = TypeOf<typeof updateValidation>;

  const defaultValues: IResourceCenterUpdate = {
    code: showResourceCenterData?.data?.code,
    name_en: showResourceCenterData?.data?.name_en,
    name_bn: showResourceCenterData?.data?.name_bn,
    description: showResourceCenterData?.data?.description,
    resourcecentertypeId: { label: showResourceCenterData?.data?.resourcecentertypeId?.name_en, value: showResourceCenterData?.data?.resourcecentertypeId?.id },
    latitude: showResourceCenterData?.data?.latitude,
    longitude: showResourceCenterData?.data?.longitude,
    divisionId: { label: showResourceCenterData?.data?.divisionId?.name_en, value: showResourceCenterData?.data?.divisionId?.id },
    districtId: { label: showResourceCenterData?.data?.districtId?.name_en, value: showResourceCenterData?.data?.districtId?.id },
    upazilaId: { label: showResourceCenterData?.data?.upazilaId?.name_en, value: showResourceCenterData?.data?.upazilaId?.id },
    union: showResourceCenterData?.data?.union,
    area: showResourceCenterData?.data?.area,
    address: showResourceCenterData?.data?.address,
    citycorporationId: { label: showResourceCenterData?.data?.citycorporation?.name_en, value: showResourceCenterData?.data?.citycorporation?.id },
    type: showResourceCenterData?.data?.type,
    status: showResourceCenterData?.data?.status,
    photo: ""
  };

  const methods = useForm<IResourceCenterUpdate>({
    mode: "all", reValidateMode: 'onSubmit',
    resolver: yupResolver(updateValidation), defaultValues
  });
  const { data: resourCecentertype } = useGetResourceCentertypeAllListQuery()
  const { data: divisionList } = useGetDivisionListQuery()
  const [updateResourceCenter] = useUpdateResourceCenterMutation()
  const { data: districtList } = useGetDistrictListQuery({ divisionId: methods.watch()?.divisionId?.value })
  const { data: upazila } = useGetUpazilaListQuery({ districtId: methods.watch()?.districtId?.value })
  const { data: cityCorporation } = useGetCityCorporationListQuery({ citycorporationId: methods.watch()?.upazilaId?.value })
  const onSubmitHandler: SubmitHandler<IResourceCenterUpdate> = async (data: IResourceCenterUpdate) => {
    const modifiedData = {
      ...data,
      resourcecentertypeId: data.resourcecentertypeId.value,
      divisionId: data.divisionId.value,
      districtId: data.districtId.value,
      upazilaId: data.type === "0" ? data.upazilaId.value : "",
      citycorporationId: data.type === "1" ? data.citycorporationId.value : "",
      id: props?.data?.id,
      status: Number(data.status)
    }
    console.log('modifiedData', modifiedData);
    try {
      await updateResourceCenter(modifiedData).unwrap()
        .then((res: any) => {
          if (res.statusCode === 200) {
            setAlertDialogOpen(true)
          }
        })
    } catch (error) {

    }

  }
  useEffect(() => {
    methods.reset({
      code: showResourceCenterData?.data?.code,
      name_en: showResourceCenterData?.data?.name_en,
      name_bn: showResourceCenterData?.data?.name_bn,
      description: showResourceCenterData?.data?.description,
      resourcecentertypeId: { label: showResourceCenterData?.data?.resourcecentertypeId?.name_en, value: showResourceCenterData?.data?.resourcecentertypeId?.id },
      latitude: showResourceCenterData?.data?.latitude,
      longitude: showResourceCenterData?.data?.longitude,
      divisionId: { label: showResourceCenterData?.data?.divisionId?.name_en, value: showResourceCenterData?.data?.divisionId?.id },
      districtId: { label: showResourceCenterData?.data?.districtId?.name_en, value: showResourceCenterData?.data?.districtId?.id },
      upazilaId: { label: showResourceCenterData?.data?.upazilaId?.name_en, value: showResourceCenterData?.data?.upazilaId?.id },

      union: showResourceCenterData?.data?.union,
      area: showResourceCenterData?.data?.area,
      address: showResourceCenterData?.data?.address,
      citycorporationId: { label: showResourceCenterData?.data?.citycorporation?.name_en, value: showResourceCenterData?.data?.citycorporation?.id },
      type: showResourceCenterData?.data?.type,
      photo: showResourceCenterData?.data?.photo,
      status: showResourceCenterData?.data?.status,
    })
  }, [showResourceCenterData])

  const breadcrumbLink: any = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.center_management.key) || 'Center' },
    { href: '/admin/center/resourcecenter', label: translate(langData, lang, LangSetUpForMenu.center_management.submodule.resource_center.key) || 'Resource Center' },
    { href: '#', label: translate(langData, lang, LangSetUpForCenter.list.edit.key) || 'Edit' },
  ]

  const onActionNotification = () => { methods.reset(); setAlertDialogOpen(false) }

  return (
    <>
      <FormLayout spinLoading={getIsLoading}>
        <Paper className="breadHeadField">
          <Box className="breadCrumbBg">
            <BreadCrumb listItems={breadcrumbLink} />
          </Box>
          <Box className="backBtn">
            <Button LinkComponent={Link}
              href="/admin/center/resourcecenter">
              {translate(langData, lang, LangSetUpForForm.back.key) || "Back"}
            </Button>
          </Box>
        </Paper>
        <FormLayoutBody>
          <FormProvider {...methods}>
            <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)}>
              <FormLayoutContent title={translate(langData, lang, LangSetUpForCenter.form.add_resource_center_title.key) || "শিক্ষা কেন্দ্রের প্রাথমিক তথ্য"} >
                <Grid container spacing={2.5}>
                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="code" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.list.centerCode.key) || "কেন্দ্রের কোড"}
                    </FormInputLabel>
                    <FormInputBootstrap name='code' id="code" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="name_bn" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.list.centerName.key) + translate(langData, lang, LangSetUpForForm.bangla.key) || "রিসোর্স সেন্টার নামঃ (বাংলা)"}
                    </FormInputLabel>
                    <FormInputBootstrap name='name_bn' id="name_bn" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="name_en" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.list.centerName.key) + translate(langData, lang, LangSetUpForForm.english.key) || "রিসোর্স সেন্টার নামঃ  (ইংরেজি)"}
                    </FormInputLabel>
                    <FormInputBootstrap name='name_en' id="name_en" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="resourcecentertypeId" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.list.centerLevel.key) || "কেন্দ্রের ধরন"}
                    </FormInputLabel>
                    <FormAutocomplete name='resourcecentertypeId' id='resourcecentertypeId' dataSource={listArrayModify(resourCecentertype?.data)} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="latitude" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.form.center_location.key) || "কেন্দ্রের ভৌগলিক অবস্থানঃ"}
                    </FormInputLabel>
                    <FormInputBootstrap name='latitude' id="latitude" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="longitude" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.form.center_location.key) || "কেন্দ্রের ভৌগলিক অবস্থানঃ"}
                    </FormInputLabel>
                    <FormInputBootstrap name='longitude' id="longitude" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormInputLabel htmlFor="divisionId" required={true}>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "বিভাগঃ"}
                    </FormInputLabel>
                    <FormAutocomplete name='divisionId' id='divisionId' dataSource={listArrayModify(divisionList?.data)} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormInputLabel htmlFor="districtId" required={true}>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "জেলাঃ"}
                    </FormInputLabel>
                    <FormAutocomplete name='districtId' id='districtId' dataSource={listArrayModify(districtList?.data)} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormInputLabel htmlFor="" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.form.center_city_type.key) || "ধরণঃ (উপজেলা / সিটি কর্পোরেশন)"}
                    </FormInputLabel>
                    <FormSelect name="type" dataSource={[{ name: "উপজেলা", id: "0" }, { name: "সিটি কর্পোরেশন", id: "1" }]} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    {methods.watch('type') === "1" ? (<Box>
                      <FormInputLabel htmlFor="cityCorporationId">
                        {translate(langData, lang, LangSetUpForCenter.form.cityCorporation.key) || "সিটি কর্পোরেশনঃ"}
                      </FormInputLabel>
                      <FormAutocomplete name='citycorporationId' id='cityCorporationId' dataSource={listArrayModify(cityCorporation?.data)} />
                    </Box>)
                      : (<Box>
                        <FormInputLabel htmlFor="upazilaId">
                          {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "উপজেলাঃ"}
                        </FormInputLabel>
                        <FormAutocomplete name='upazilaId' id='upazilaId' dataSource={listArrayModify(upazila?.data)} />
                      </Box>)
                    }
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormInputLabel htmlFor="union" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.form.union.key) || "ইউনিয়ন/ওয়ার্ড নংঃ"}
                    </FormInputLabel>
                    <FormInputBootstrap name='union' id="union" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormInputLabel htmlFor="area" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.form.village.key) || "এলাকা / গ্রামঃ"}
                    </FormInputLabel>
                    <FormInputBootstrap name='area' id="area" />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <FormInputLabel htmlFor="address">
                      {translate(langData, lang, LangSetUpForCenter.form.center_address.key) || "ঠিকানাঃ"}
                    </FormInputLabel>
                    <FormInputBootstrap name='address' id="address" />
                  </Grid>
                  {/* <Grid item xs={12} md={6} >
                  <FormInputLabel htmlFor="area">কেয়ারটেকারঃ</FormInputLabel>
                  <FormInputBootstrap name='area' id="area" />
                </Grid> */}
                  <Grid item xs={12} md={12}  >
                    <FormInputLabel htmlFor="description">
                      {translate(langData, lang, LangSetUpForCenter.form.center_description.key) || "কেন্দ্রের বিবরণঃ"}
                    </FormInputLabel>
                    <FormInputBootstrap name='description' id="description" multiline rows={4} />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <FormInputLabel htmlFor="photo" >
                      {translate(langData, lang, LangSetUpForCenter.form.center_picture.key) || "ছবি"}
                    </FormInputLabel>
                    <FormFileUpload name='photo' previewUrl={showResourceCenterData?.data?.photo} />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <FormInputLabel htmlFor="Status" >
                      {translate(langData, lang, LangSetUpForList.status.key) || "স্ট্যাটাসঃ"}
                    </FormInputLabel>
                    <FormSelect name='status' id='Status' dataSource={[{ id: 1, name: 'Active' }, { id: 0, name: 'Inactive' }]} />
                  </Grid>
                </Grid>
                <FormLayoutFooter>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}> </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box className="submitBtnField">
                      <Box className="stuRightBtn">
                        <Box className="addBtn">
                          <Button type="submit"> + {translate(langData, lang, LangSetUpForForm.update.key) || "যুক্ত করুন"}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </FormLayoutFooter>
              </FormLayoutContent>
            </Box>
          </FormProvider>
        </FormLayoutBody>
        {alertDialogOpen === true && <AlertDialog
          open={alertDialogOpen}
          modeType="message"
          href="/admin/center/resourcecenter"
          closeDialog={() => setAlertDialogOpen(false)}
          actionFunction={onActionNotification} />}
      </FormLayout>
    </>
  )
}

export default EditResourceCenter