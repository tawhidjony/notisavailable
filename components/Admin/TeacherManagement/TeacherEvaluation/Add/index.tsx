import { yupResolver } from '@hookform/resolvers/yup';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Button, Collapse, Grid, List, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useGetDistrictListQuery } from 'Api/SystemConfiguration/District';
import { useGetDivisionListQuery } from 'Api/SystemConfiguration/Division';
import { useGetUpazilaListQuery } from 'Api/SystemConfiguration/Upazila';
import { useGetTeacherInfoListQuery } from 'Api/TeacherManagement/TeacherInfo';
import FormAutocomplete from 'components/common/FormItem/FormAutocomplete';
import { FormInputLabel } from 'components/common/FormItem/FormInputBootstrap';
import BreadCrumb from 'components/common/PageBreadCrumb/BreadCrumb';

import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from 'Store';
import { listArrayModify, translate } from 'Utils/Handler';
import { LangSetUpForForm } from 'Utils/Language/MasterData/Form';
import { LangSetUpForList } from 'Utils/Language/MasterData/List';
import { LangSetUpForMenu } from 'Utils/Language/Menu';
import { TypeOf } from 'yup';
import { panelSearchSchema } from '../Schema';
import CreateMark from './CreateMark';


const CreateTeacherEvaluation = () => {

  const { lang, langData } = useSelector((state: RootState) => state.lang);
  const [expand, setExpand] = useState(true)
  const [filteredTeacher, setFilteredTeacher] = useState([])

  type IPanelSearchSchemaProp = TypeOf<typeof panelSearchSchema>;

  const methods = useForm<IPanelSearchSchemaProp>({
    mode: 'onChange',
    resolver: yupResolver(panelSearchSchema),
    defaultValues: {
      learning_center_id: { label: "", value: "" },
      divisionId: { label: "", value: "" },
      districtId: { label: "", value: "" },
      upazilaId: { label: "", value: "" },
    },
  })
  const [searchData, setSearchData] = useState(true)
  const [params, setParams] = useState<any>({
    divisionId: "",
    districtId: "",
    upazilaId: "",
  })

  const { data: teacherInfoList, isLoading } = useGetTeacherInfoListQuery(params, { skip: searchData });
  const { data: divisionList } = useGetDivisionListQuery()
  const { data: districtList } = useGetDistrictListQuery({ divisionId: methods.watch().divisionId?.value })
  const { data: upazilaList } = useGetUpazilaListQuery({ districtId: methods.watch().districtId?.value })


  const panelSearchOnSubmit: SubmitHandler<IPanelSearchSchemaProp> = (items: IPanelSearchSchemaProp) => {
    let divisionId = items?.divisionId?.value;
    let districtId = items?.districtId?.value;
    let upazilaId = items?.upazilaId?.value;
    try {
      setParams((params: any) => ({
        ...params,
        divisionId,
        districtId,
        upazilaId,
      }))
      setSearchData(false)
    } catch (error) {

    }
  }

  const breadcrumbLink = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.teacher_management.key) || 'Teachers' },
    {
      href: '/admin/teacher-management/teacher-evaluation/add', label: translate(langData, lang, LangSetUpForMenu.teacher_management.submodule.teacher_evaluation
        .key) || 'Teachers List'
    }
  ]

  return (
    <Box className="table-page">
      <Box className="contentMainField">
        <Paper>
          <Box className="breadCrumbBg">
            <BreadCrumb listItems={breadcrumbLink} />
          </Box>
        </Paper>

        <Box className="contentField">

          <Paper className="paperBody">
            <List className="collapsField"
              sx={{ padding: 0, bgcolor: 'background.paper' }}
              component="nav">
              <Collapse in={expand} timeout="auto" unmountOnExit>
                <FormProvider {...methods}>
                  <Box className="searchContent" component="form" onSubmit={methods.handleSubmit(panelSearchOnSubmit)} >
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justifyContent="space-around"
                      alignItems="stretch"
                    >
                      <Grid item xs={12} lg={4} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division"}
                        </FormInputLabel>
                        <FormAutocomplete name='divisionId' required={true} dataSource={listArrayModify(divisionList?.data)} />
                      </Grid>
                      <Grid item xs={12} lg={4} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District"}
                        </FormInputLabel>
                        <FormAutocomplete name='districtId' required={true} dataSource={listArrayModify(districtList?.data)} />
                      </Grid>
                      <Grid item xs={12} lg={4} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila"}
                        </FormInputLabel>
                        <FormAutocomplete name='upazilaId' required={true} dataSource={listArrayModify(upazilaList?.data)} />
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
                              <Button
                                onClick={() => {
                                  setSearchData(true)
                                  methods.reset()
                                  setParams((params: any) => ({
                                    ...params,
                                    learning_center_id: "",
                                    districtId: "",
                                    divisionId: "",
                                    upazilaId: "",

                                  }))
                                }}
                                type="button" className="resetBtn">
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
              </Collapse>
            </List>
          </Paper>
          <CreateMark teacherInfoList={teacherInfoList} />
        </Box>
      </Box>
    </Box>
  )
}

export default CreateTeacherEvaluation