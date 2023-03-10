import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Grid, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { useUpdateLearningCenterMutation } from "Api/Center/LearningCenter"
import { useGetLearningcentertypeAllListQuery } from "Api/Center/LearningCenterType"
import { useGetPlaceListQuery } from "Api/Center/place"
import { useGetCityCorporationListQuery } from "Api/SystemConfiguration/CityCorporation"
import { useGetDistrictListQuery } from "Api/SystemConfiguration/District"
import { useGetDivisionListQuery } from "Api/SystemConfiguration/Division"
import { useGetUpazilaListQuery } from "Api/SystemConfiguration/Upazila"
import AlertDialog from "components/common/DeleteModal"
import FormAutocomplete from "components/common/FormItem/FormAutocomplete"
import FormDatePicker from "components/common/FormItem/FormDatePicker"
import FormFileUpload from "components/common/FormItem/FormFileUpload"
import FormInputBootstrap, { FormInputLabel } from "components/common/FormItem/FormInputBootstrap"
import FormSelect from "components/common/FormItem/FormSelect"
import FormTimePicker from "components/common/FormItem/FormTimePicker "
import BreadCrumb from "components/common/PageBreadCrumb/BreadCrumb"
import { FormLayout, FormLayoutBody, FormLayoutContent, FormLayoutFooter } from "components/layouts/FormLayout"
import moment from "moment"
import { useEffect, useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { listArrayModify, translate } from "Utils/Handler"
import { TypeOf } from "yup"

import { useShowLearningCenterQuery } from "Api/Center/LearningCenter"
import Link from "next/link"
import { useSelector } from "react-redux"
import { RootState } from "Store"
import { LangSetUpForCenter } from "Utils/Language/CenterManagement"
import { LangSetUpForForm } from "Utils/Language/MasterData/Form"
import { LangSetUpForList } from "Utils/Language/MasterData/List"
import { LangSetUpForMenu } from "Utils/Language/Menu"
import { updateValidation } from "../Validation"


const EditLearningCenter = (props: any) => {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)

  const [learningCenterUpdate] = useUpdateLearningCenterMutation()
  const { data: showLearningCenterData, isLoading: getIsLoading } = useShowLearningCenterQuery(props?.data?.id)
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  type ILearningCenterUpdate = TypeOf<typeof updateValidation>;

  const defaultValues: ILearningCenterUpdate = {
    code: showLearningCenterData?.data?.code,
    name_en: showLearningCenterData?.data?.name_en,
    name_bn: showLearningCenterData?.data?.name_bn,
    centertypeId: { label: showLearningCenterData?.data?.centertypeId?.name_en, value: showLearningCenterData?.data?.centertypeId?.id },
    description: showLearningCenterData?.data?.description,
    latitude: showLearningCenterData?.data?.latitude,
    longitude: showLearningCenterData?.data?.longitude,
    formation_date: showLearningCenterData?.data?.formation_date,
    start_time: showLearningCenterData?.data?.start_time,
    end_time: showLearningCenterData?.data?.end_time,
    divisionId: { label: showLearningCenterData?.data?.divisionId?.name_en, value: showLearningCenterData?.data?.divisionId?.id },
    districtId: { label: showLearningCenterData?.data?.districtId?.name_en, value: showLearningCenterData?.data?.districtId?.id },
    upazilaId: { label: showLearningCenterData?.data?.upazilaId?.name_en, value: showLearningCenterData?.data?.upazilaId?.id },
    union: showLearningCenterData?.data?.union,
    area: showLearningCenterData?.data?.area,
    type: showLearningCenterData?.data?.type,
    placeId: { label: showLearningCenterData?.data?.placeId.name_en, value: showLearningCenterData?.data?.placeId.id },
    citycorporationId: { label: showLearningCenterData?.data?.citycorporation?.name_en, value: showLearningCenterData?.data?.citycorporation?.id },
    photo: "",
    status: showLearningCenterData?.data?.status,
  };

  const methods = useForm<ILearningCenterUpdate>({
    mode: "all", reValidateMode: 'onSubmit',
    resolver: yupResolver(updateValidation), defaultValues
  });

  const { data: learningCenterType } = useGetLearningcentertypeAllListQuery()
  const { data: divisionList } = useGetDivisionListQuery()
  const { data: districtList } = useGetDistrictListQuery({ divisionId: methods.watch()?.divisionId?.value })
  const { data: upazila } = useGetUpazilaListQuery({ districtId: methods.watch()?.districtId?.value })
  const { data: place } = useGetPlaceListQuery()
  const { data: cityCorporation } = useGetCityCorporationListQuery({ citycorporationId: methods.watch()?.citycorporationId?.value })

  const onSubmitHandler: SubmitHandler<ILearningCenterUpdate> = async (data: ILearningCenterUpdate) => {
    const modifiedData = {
      ...data,
      centertypeId: data.centertypeId.value,
      divisionId: data.divisionId.value,
      districtId: data.districtId.value,
      placeId: data.placeId.value,
      upazilaId: data.type === "0" ? data.upazilaId.value : "",
      citycorporationId: data.type === "1" ? data.citycorporationId.value : "",
      formation_date: moment(data.formation_date).format("YYYY-MM-DD"),

      id: props?.data?.id,
      status: Number(data.status)
    }
    try {
      await learningCenterUpdate(modifiedData).unwrap()
        .then((res: any) => {
          if (res.statusCode === 200) {
            setAlertDialogOpen(true)
          }
        })
    } catch (error) {

    }

  }

  const breadcrumbLink: any = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.center_management.key) || 'Center' },
    { href: '/admin/center/learningcenter', label: translate(langData, lang, LangSetUpForMenu.center_management.submodule.education_center.key) || 'Learning Center' },
    { href: '#', label: translate(langData, lang, LangSetUpForCenter.list.edit.key) || 'Edit' },
  ]
  const onActionNotification = () => { methods.reset(); setAlertDialogOpen(false) }

  useEffect(() => {
    methods.reset({
      code: showLearningCenterData?.data?.code,
      name_en: showLearningCenterData?.data?.name_en,
      name_bn: showLearningCenterData?.data?.name_bn,
      centertypeId: { label: showLearningCenterData?.data?.centertypeId?.name_en, value: showLearningCenterData?.data?.centertypeId?.id },
      description: showLearningCenterData?.data?.description,
      latitude: showLearningCenterData?.data?.latitude,
      longitude: showLearningCenterData?.data?.longitude,
      formation_date: showLearningCenterData?.data?.formation_date,
      start_time: showLearningCenterData?.data?.start_time,
      end_time: showLearningCenterData?.data?.end_time,
      divisionId: { label: showLearningCenterData?.data?.divisionId?.name_en, value: showLearningCenterData?.data?.divisionId?.id },
      districtId: { label: showLearningCenterData?.data?.districtId?.name_en, value: showLearningCenterData?.data?.districtId?.id },
      upazilaId: { label: showLearningCenterData?.data?.upazilaId?.name_en, value: showLearningCenterData?.data?.upazilaId?.id },

      union: showLearningCenterData?.data?.union,
      area: showLearningCenterData?.data?.area,
      type: showLearningCenterData?.data?.type,
      placeId: { label: showLearningCenterData?.data?.placeId.name_en, value: showLearningCenterData?.data?.placeId.id },
      citycorporationId: { label: showLearningCenterData?.data?.citycorporation?.name_en, value: showLearningCenterData?.data?.citycorporation?.id },
      photo: showLearningCenterData?.data?.photo,
      status: showLearningCenterData?.data?.status,
    })
  }, [showLearningCenterData])



  console.log('showLearningCenterData', showLearningCenterData);



  return (
    <>
      <FormLayout spinLoading={getIsLoading}>
        <Paper className="breadHeadField">
          <Box className="breadCrumbBg">
            <BreadCrumb listItems={breadcrumbLink} />
          </Box>
          <Box className="backBtn">
            <Button LinkComponent={Link}
              href="/admin/center/learningcenter">
              {translate(langData, lang, LangSetUpForForm.back.key) || "Back"}
            </Button>
          </Box>
        </Paper>
        <FormLayoutBody>
          <FormProvider {...methods}>
            <Box autoComplete='off' component="form" onSubmit={methods.handleSubmit(onSubmitHandler)}>
              <FormLayoutContent title={translate(langData, lang, LangSetUpForCenter.form.add_education_center_title.key) || "?????????????????? ??????????????????????????? ???????????????????????? ???????????? "}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="code" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.list.centerCode.key) || "??????????????????????????? ?????????"}
                    </FormInputLabel>
                    <FormInputBootstrap name='code' id="code" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="name_bn" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.list.centerName.key) + translate(langData, lang, LangSetUpForForm.bangla.key) || "???????????????/??????????????????????????? ????????? (???????????????)"}
                    </FormInputLabel>
                    <FormInputBootstrap name='name_bn' id="name_bn" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="name_en" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.list.centerName.key) + translate(langData, lang, LangSetUpForForm.english.key) || "???????????????/??????????????????????????? ????????? (??????????????????)"}
                    </FormInputLabel>
                    <FormInputBootstrap name='name_en' id="name_en" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="centertypeId" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.list.centerLevel.key) || "??????????????????????????? ?????????"}
                    </FormInputLabel>
                    <FormAutocomplete name='centertypeId' id='Office_ID' dataSource={listArrayModify(learningCenterType?.data)} />
                  </Grid>


                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="latitude" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.form.center_location.key) || "??????????????????????????? ?????????????????? ????????????????????????"}
                    </FormInputLabel>
                    <FormInputBootstrap name='latitude' id="latitude" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="longitude" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.form.center_location.key) || "??????????????????????????? ?????????????????? ????????????????????????"}
                    </FormInputLabel>
                    <FormInputBootstrap name='longitude' id="longitude" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="formation_date" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.list.centerCreatedAt.key) || "??????????????? ??????????????? ??????????????????"}
                    </FormInputLabel>
                    <FormDatePicker name='formation_date' size='small' />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="start_time" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.form.start_class_time.key) || "??????????????? ??????????????? ???????????????"}
                    </FormInputLabel>
                    <FormTimePicker name='start_time' size='small' />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <FormInputLabel htmlFor="end_time" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.form.end_class_time.key) || "??????????????? ????????? ???????????????"}
                    </FormInputLabel>
                    <FormTimePicker name='end_time' size='small' />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormInputLabel htmlFor="divisionId" required={true}>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "??????????????????"}
                    </FormInputLabel>
                    <FormAutocomplete name='divisionId' id='divisionId' dataSource={listArrayModify(divisionList?.data)} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormInputLabel htmlFor="districtId" required={true}>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "???????????????"}
                    </FormInputLabel>
                    <FormAutocomplete name='districtId' id='districtId' dataSource={listArrayModify(districtList?.data)} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormInputLabel htmlFor="union" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.form.union.key) || "??????????????????/?????????????????? ?????????"}
                    </FormInputLabel>
                    <FormInputBootstrap name='union' id="union" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormInputLabel htmlFor="" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.form.center_city_type.key) || "???????????? (?????????????????? / ???????????? ???????????????????????????)"}
                    </FormInputLabel>
                    <FormSelect name="type" dataSource={[{ name: "??????????????????", id: "0" }, { name: "???????????? ???????????????????????????", id: "1" }]} />
                  </Grid>

                  <Grid item xs={12} md={6} lg={3}>

                    {methods.watch('type') === "1" ? (<Box>
                      <FormInputLabel htmlFor="cityCorporationId">
                        {translate(langData, lang, LangSetUpForCenter.form.cityCorporation.key) || "???????????? ??????????????????????????????"}
                      </FormInputLabel>
                      <FormAutocomplete name='citycorporationId' id='cityCorporationId' dataSource={listArrayModify(cityCorporation?.data)} />
                    </Box>)
                      : (<Box>
                        <FormInputLabel htmlFor="upazilaId">
                          {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "?????????????????????"}
                        </FormInputLabel>
                        <FormAutocomplete name='upazilaId' id='upazilaId' dataSource={listArrayModify(upazila?.data)} />
                      </Box>)
                    }

                  </Grid>


                  <Grid item xs={12} md={6} lg={3}>
                    <FormInputLabel htmlFor="area" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.form.village.key) || "??????????????? / ??????????????????"}
                    </FormInputLabel>
                    <FormInputBootstrap name='area' id="area" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormInputLabel htmlFor="placeId" required={true}>
                      {translate(langData, lang, LangSetUpForCenter.form.center_place.key) || " ????????????????????? ???????????????????????????????????? ??????????????????"}
                    </FormInputLabel>
                    <FormAutocomplete name='placeId' id='placeId' dataSource={listArrayModify(place?.data)} />
                  </Grid>
                  <Grid item xs={12} md={12}  >
                    <FormInputLabel htmlFor="description">
                      {translate(langData, lang, LangSetUpForCenter.form.center_description.key) || "??????????????????????????? ??????????????????"}
                    </FormInputLabel>
                    <FormInputBootstrap name='description' id="description" multiline rows={4} />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <FormInputLabel htmlFor="photo" >
                      {translate(langData, lang, LangSetUpForCenter.form.center_picture.key) || "?????????"}
                    </FormInputLabel>
                    <FormFileUpload name='photo' previewUrl={showLearningCenterData?.data?.photo} />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <FormInputLabel htmlFor="Status" >
                      {translate(langData, lang, LangSetUpForList.status.key) || "??????????????????????????????"}
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
                          <Button type="submit"> + {translate(langData, lang, LangSetUpForForm.update.key) || "???????????????????????? ????????????"}</Button>
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
          href="/admin/center/learningcenter"
          closeDialog={() => setAlertDialogOpen(false)}
          actionFunction={onActionNotification} />}
      </FormLayout>
    </>
  )
}

export default EditLearningCenter