import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Box, Button, Grid, Paper } from "@mui/material"
import { useGetLearningCenterListQuery } from "Api/Center/LearningCenter"
import { useGetSessionListQuery } from 'Api/Global/Session'
import { useGetStudentListQuery } from "Api/StudentManagement/StudentInfo"
import { useGetDistrictListQuery } from "Api/SystemConfiguration/District"
import { useGetDivisionListQuery } from "Api/SystemConfiguration/Division"
import { useGetUpazilaListQuery } from "Api/SystemConfiguration/Upazila"
import { panelSearchSchemaPrimary } from 'components/Admin/StudentManagement/StudentInfo/Schema'
import FormAutocomplete from "components/common/FormItem/FormAutocomplete"
import { FormInputLabel } from "components/common/FormItem/FormInputBootstrap"
import BreadCrumb from 'components/common/PageBreadCrumb/BreadCrumb'
import { useEffect, useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { RootState } from "Store"
import { months } from 'Utils/commonJson'
import { EnumPaginationType } from "Utils/Enums/PaginationType"
import { listArrayModify, listArrayModifyCenterCode, translate } from "Utils/Handler"
import { LangSetUpForForm } from "Utils/Language/MasterData/Form"
import { LangSetUpForList } from "Utils/Language/MasterData/List"
import { LangSetUpForMenu } from "Utils/Language/Menu"
import { LangSetUpForStudent } from "Utils/Language/StudentManagement"
import { TypeOf } from 'yup'
import CreateAdmission from './CreateAdmission'

type Props = {}

const PrimaryStudentEntryForm = (props: Props) => {

  const methods = useForm<any>({
    mode: "all", reValidateMode: 'onSubmit',
    // resolver: yupResolver(), defaultValues
  });

  const { setValue, watch } = methods;

  const breadcrumbLink: any = [
    { href: '/1', label: 'শিক্ষার্থী ব্যবস্থাপনা' },
    { href: '/2', label: 'প্রাথমিক বিদ্যালয়ে ভর্তি' }
  ]


  type IpanelSearchSchemaPrimaryProp = TypeOf<typeof panelSearchSchemaPrimary>;
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  const [params, setParams] = useState<any>({
    page: EnumPaginationType.PAGE,
    limit: EnumPaginationType.PER_PAGE_SIZE,
    divisionId: "",
    districtId: "",
    upazilaId: "",
    session: "",
    code: "",
    learning_center_id: ""
  })
  const { data: studentList } = useGetStudentListQuery(params)
  const { data: divisionList } = useGetDivisionListQuery()
  const { data: districtList } = useGetDistrictListQuery("")
  const { data: upazila } = useGetUpazilaListQuery("")
  const { data: learningcenterList } = useGetLearningCenterListQuery("")
  const { data: session } = useGetSessionListQuery();
  const [searchData, setSearchData] = useState(false)


  const panelSearchOnSubmit: SubmitHandler<IpanelSearchSchemaPrimaryProp> = (items: IpanelSearchSchemaPrimaryProp) => {
    let divisionId = items?.division_search?.value;
    let districtId = items?.district_search?.value;
    let upazilaId = items?.upazila_search?.value;
    let sessionId = items?.session?.value;
    let code = items?.center_code_search?.value;
    let learning_center_id = items?.center_name_search?.value;
    setSearchData(true)
    setParams((params: any) => ({ ...params, divisionId, districtId, upazilaId, sessionId, code, learning_center_id }))
  }

  useEffect(() => {
    if (session?.data?.length) {
      const currentSession = session?.data?.find((sessionInfo: any) => sessionInfo.name_en == new Date().getFullYear());
      if (currentSession) {
        setValue("session", { label: currentSession.name_en, value: currentSession.id });
        setValue("month", { label: months[new Date().getMonth()].label, value: months[new Date().getMonth()].value });
      }
    }
  }, [session]);

  return (

    <>
      <Box className="table-page">
        <Box className="contentMainField">
          <Paper>
            <Box className="breadCrumbBg">
              <BreadCrumb listItems={breadcrumbLink} />
            </Box>
          </Paper>
          <Box className="contentField">
            <Paper className="paperBody" sx={{ padding: 2, marginTop: 1 }}>
              <FormProvider {...methods}>
                <Box className="searchContent" component="form" onSubmit={methods.handleSubmit(panelSearchOnSubmit)} >
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="space-around"
                    alignItems="stretch"
                  >
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} >
                      <FormInputLabel>
                        {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division"}
                      </FormInputLabel>
                      <FormAutocomplete name='division_search' dataSource={listArrayModify(divisionList?.data)} required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} >
                      <FormInputLabel>
                        {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District"}
                      </FormInputLabel>
                      <FormAutocomplete name='district_search' dataSource={listArrayModify(districtList?.data)} required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} >
                      <FormInputLabel>
                        {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila"}
                      </FormInputLabel>
                      <FormAutocomplete name='upazila_search' dataSource={listArrayModify(upazila?.data)} required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} >
                      <FormInputLabel>{translate(langData, lang, LangSetUpForStudent.form.educationYear.key) || "শিক্ষাবর্ষঃ"}</FormInputLabel>
                      <FormAutocomplete name='session' dataSource={listArrayModify(session?.data)} required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} >
                      <FormInputLabel>
                        {translate(langData, lang, LangSetUpForStudent.list.centerCode.key) || "Center Code"}
                      </FormInputLabel>
                      <FormAutocomplete name='center_code_search' dataSource={listArrayModifyCenterCode(learningcenterList?.data)} required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} >
                      <FormInputLabel>
                        {translate(langData, lang, LangSetUpForStudent.list.centerName.key) || "Center Name"}
                      </FormInputLabel>
                      <FormAutocomplete name='center_name_search' dataSource={listArrayModify(learningcenterList?.data)} required />
                    </Grid>

                  </Grid>

                  <Box className="search2ndField">
                    <Box className="search2ndFieldContent">
                      <Grid
                        container
                        spacing={4}
                        direction="row"
                        justifyContent="space-around"
                        alignItems="stretch"
                      >
                        <Grid item xs={12} sm={12} md={5} lg={3} xl={3}>
                          <Box className="resetBtnField">
                            <Button onClick={() => {
                              methods.reset();
                              setParams((params: any) => ({ ...params, divisionId: "", districtId: "", upazilaId: "", centertypeId: "", code: "", learning_center_id: "", name_en: "", name_bn: "", roll_number: "", status: "", }))
                              setSearchData(false);
                            }} type="button" className="resetBtn">
                              <RestartAltIcon />
                              {translate(langData, lang, LangSetUpForForm.reset.key) || "Reset"}
                            </Button>
                            <Button type="submit" className="searchBtn">
                              {translate(langData, lang, LangSetUpForList.search.key) || "Search"}
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>

                </Box>
              </FormProvider>
            </Paper>
            {searchData &&
              <CreateAdmission studentList={studentList?.data} params={params} />
            }
          </Box>

        </Box>

      </Box>
    </>
  )
}

export default PrimaryStudentEntryForm