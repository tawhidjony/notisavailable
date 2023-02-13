import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Grid, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { useCreateResourcecenterMutation } from "Api/Center/ResourceCenter"
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

import { useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { RootState } from "Store"
import { listArrayModify, translate } from "Utils/Handler"
import { LangSetUpForCenter } from "Utils/Language/CenterManagement"
import { LangSetUpForForm } from "Utils/Language/MasterData/Form"
import { LangSetUpForMenu } from "Utils/Language/Menu"
import { TypeOf } from "yup"

import { createValidation } from "../Validation"

const CreateResourceCenterList = () => {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [createResourceCenterManagement] = useCreateResourcecenterMutation()
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  type IResourceCenterCreate = TypeOf<typeof createValidation>;

  const defaultValues: IResourceCenterCreate = {
    code: "",
    name_en: "",
    name_bn: "",
    description: "",
    resourcecentertypeId: { label: "", value: "" },
    latitude: "",
    longitude: "",
    divisionId: { label: "", value: "" },
    districtId: { label: "", value: "" },
    upazilaId: { label: "", value: "" },
    union: "",
    area: "",
    address: "",
    citycorporationId: { label: "", value: "" },
    type: "",
    photo: ""
  };

  const methods = useForm<IResourceCenterCreate>({
    mode: "all", reValidateMode: 'onSubmit',
    resolver: yupResolver(createValidation), defaultValues
  });

  // console.log('methods.watch()', methods.watch());


  const { data: resourcecentertype } = useGetResourceCentertypeAllListQuery()
  const { data: divisionList } = useGetDivisionListQuery()

  const { data: districtList } = useGetDistrictListQuery({ divisionId: methods.watch()?.divisionId?.value })
  const { data: upazila } = useGetUpazilaListQuery({ districtId: methods.watch()?.districtId?.value })
  const { data: cityCorporation } = useGetCityCorporationListQuery({ citycorporationId: methods.watch()?.upazilaId?.value })

  const onSubmitHandler: SubmitHandler<IResourceCenterCreate> = (data: IResourceCenterCreate) => {
    const modifiedData = {
      ...data,
      resourcecentertypeId: data.resourcecentertypeId.value,
      divisionId: data.divisionId.value,
      districtId: data.districtId.value,
      upazilaId: data.type === "0" ? data.upazilaId.value : "",
      citycorporationId: data.type === "1" ? data.citycorporationId.value : "",
    }
    console.log(modifiedData);
    try {
      createResourceCenterManagement(modifiedData).unwrap().then((res: any) => {
        if (res?.response?.statusCode === 201) {
          setAlertDialogOpen(true)
          methods.reset()
        }
      }).catch((err) => err?.errors?.forEach((value: any) => methods.setError(value?.field, { type: "required", message: value?.message })))
    } catch (error) {

    }
  }



  const breadcrumbLink: any = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.center_management.key) || 'Center' },
    { href: '/admin/center/resourcecenter', label: translate(langData, lang, LangSetUpForMenu.center_management.submodule.resource_center.key) || 'Resource Center' },
    { href: '#', label: translate(langData, lang, LangSetUpForCenter.list.add.key) || 'Add' },
  ]

  const onActionNotification = () => { methods.reset(); setAlertDialogOpen(false) }

  return (
    <>
      <FormLayout>
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
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="code" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.list.centerCode.key) || "কেন্দ্রের কোড"}
                    </FormInputLabel>
                    <FormInputBootstrap name='code' id="code" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="name_bn" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.list.centerName.key) + translate(langData, lang, LangSetUpForForm.bangla.key) || "রিসোর্স সেন্টার নামঃ (বাংলা)"}
                    </FormInputLabel>
                    <FormInputBootstrap name='name_bn' id="name_bn" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="name_en" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.list.centerName.key) + translate(langData, lang, LangSetUpForForm.english.key) || "রিসোর্স সেন্টার নামঃ  (ইংরেজি)"}
                    </FormInputLabel>
                    <FormInputBootstrap name='name_en' id="name_en" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="resourcecentertypeId" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.list.centerLevel.key) || "কেন্দ্রের ধরন"}
                    </FormInputLabel>
                    <FormAutocomplete name='resourcecentertypeId' id='resourcecentertypeId' dataSource={listArrayModify(resourcecentertype?.data)} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="latitude" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.form.center_location.key) || "কেন্দ্রের ভৌগলিক অবস্থানঃ"}
                    </FormInputLabel>
                    <FormInputBootstrap name='latitude' id="latitude" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} >
                    <FormInputLabel htmlFor="longitude" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.form.center_location.key) || "কেন্দ্রের ভৌগলিক অবস্থানঃ"}
                    </FormInputLabel>
                    <FormInputBootstrap name='longitude' id="longitude" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3} >
                    <FormInputLabel htmlFor="divisionId" required={true}>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "বিভাগঃ"}
                    </FormInputLabel>
                    <FormAutocomplete name='divisionId' id='divisionId' dataSource={listArrayModify(divisionList?.data)} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3} >
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
                    <FormFileUpload name='photo' />
                  </Grid>
                </Grid>
                <FormLayoutFooter>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>

                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box className="submitBtnField">
                      <Box className="stuLeftBtn">
                        <Box className="clearBtn">
                          <Button type="button" onClick={() => methods.reset()} >
                            {translate(langData, lang, LangSetUpForForm.reset.key) || "রিসেট"}
                          </Button>
                        </Box>
                      </Box>
                      <Box className="stuRightBtn">
                        <Box className="addBtn">
                          <Button type="submit"> +
                            {translate(langData, lang, LangSetUpForForm.submit.key) || "যুক্ত করুন"}
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

export default CreateResourceCenterList



