import { yupResolver } from '@hookform/resolvers/yup';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Button, CircularProgress, Collapse, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { useGetLearningCenterListQuery } from 'Api/Center/LearningCenter';
import { useGetGenderListQuery } from 'Api/Global/Gender';
import { useGetDistrictListQuery } from 'Api/SystemConfiguration/District';
import { useGetDivisionListQuery } from 'Api/SystemConfiguration/Division';
import { useGetUpazilaListQuery } from 'Api/SystemConfiguration/Upazila';
import { useDeleteTeacherInfoMutation, useExportToTeacherExcelMutation, useExportToTeacherPDFMutation, useGetTeacherInfoQuery } from 'Api/TeacherManagement/TeacherInfo';
import AlertDialog from 'components/common/DeleteModal';
import FormAutocomplete from 'components/common/FormItem/FormAutocomplete';
import FormInputBootstrap, { FormInputLabel } from 'components/common/FormItem/FormInputBootstrap';
import FormSelect from 'components/common/FormItem/FormSelect';
import BreadCrumb from 'components/common/PageBreadCrumb/BreadCrumb';
import PaginationComponent from 'components/common/Pagination';
import ReactPrint from 'components/common/ReactPrint';

import { globalFilterTableData } from 'components/common/ReactTable/utility/GlobalDataFilter';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from "next/router";
import { Suspense, useCallback, useMemo, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { RootState } from 'Store';
import { useDebounce } from 'use-debounce';
import { AddIcon, DeleteIcon, EditIcon, ExcelIcon, PdfIcon, PrintIcon, ViewIcon } from 'Utils/CustomIcons';
import { EnumPaginationType } from 'Utils/Enums/PaginationType';
import { IndexSerial, listArrayModify, listArrayModifyCenterNameCode, translate } from 'Utils/Handler';
import { LangSetUpForForm } from 'Utils/Language/MasterData/Form';
import { LangSetUpForList } from 'Utils/Language/MasterData/List';
import { LangSetUpForMenu } from 'Utils/Language/Menu';
import { LangSetUpForStudent } from 'Utils/Language/StudentManagement';
import { LangSetUpForTeacher } from 'Utils/Language/TeacherManagement';
import { TypeOf } from 'yup';
import { ITeacherInfoList } from '../Model';
import { panelSearchSchema } from '../Schema';

const ReactTable = dynamic(() => import('components/common/ReactTable'), { suspense: true })

const columnHelper = createColumnHelper<ITeacherInfoList>();

const TeacherInfoList = () => {

  const componentRef = useRef(null);
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [expand, setExpand] = useState(false)
  const [itemId, setItemIsd] = useState<string>('')
  const [searchValue, setSearchValue] = useState("");
  const [globalFilter] = useDebounce(searchValue, 1000);
  const [params, setParams] = useState<any>({
    page: EnumPaginationType.PAGE,
    limit: EnumPaginationType.PER_PAGE_SIZE,
    learning_center_id: "",
    gender_id: "",
    districtId: "",
    divisionId: "",
    upazilaId: "",
    name_en: "",
    nid: "",
    mobile: "",
    status: ""
  })
  const { data: teacherInfoList, isLoading } = useGetTeacherInfoQuery(params)
  const { data: genderList } = useGetGenderListQuery()
  const { data: divisionList } = useGetDivisionListQuery()
  const { data: districtList } = useGetDistrictListQuery("")
  const { data: upazilaList } = useGetUpazilaListQuery("")
  const { data: learningCenterList } = useGetLearningCenterListQuery("")
  const [deleteItem] = useDeleteTeacherInfoMutation()
  const { lang, langData } = useSelector((state: RootState) => state.lang);
  const [exportToPDF] = useExportToTeacherPDFMutation();
  const [exportToExcel] = useExportToTeacherExcelMutation();

  console.log(params);

  type IPanelSearchSchemaProp = TypeOf<typeof panelSearchSchema>;

  const methods = useForm<IPanelSearchSchemaProp>({
    mode: 'onChange',
    resolver: yupResolver(panelSearchSchema),
    defaultValues: {
      name_en: "",
      mobile: "",
      status: "",
      nid: "",
      gender_id: { label: "", value: "" },
      learning_center_id: { label: "", value: "" },
      divisionId: { label: "", value: "" },
      districtId: { label: "", value: "" },
      upazilaId: { label: "", value: "" },
    },
  })


  const panelSearchOnSubmit: SubmitHandler<IPanelSearchSchemaProp> = (items: IPanelSearchSchemaProp) => {
    let learning_center_id = items?.learning_center_id?.value;
    let gender_id = items?.gender_id?.value;
    let divisionId = items?.divisionId?.value;
    let districtId = items?.districtId?.value;
    let upazilaId = items?.upazilaId?.value;
    let name_en = items?.name_en;
    let nid = items?.nid;
    let mobile = items?.mobile;
    let status = items?.status !== "" ? Number(items.status) : "";
    setParams((params: any) => ({
      ...params,
      learning_center_id,
      gender_id,
      districtId,
      divisionId,
      upazilaId,
      name_en,
      nid,
      mobile,
      status,
    }))
  }

  const columns = useMemo(() => [
    columnHelper.accessor((tableField, index) => IndexSerial(params.page, params.limit, index), {
      id: 'sl',
      header: translate(langData, lang, LangSetUpForList.sl.key),
    }),

    columnHelper.accessor((tableField) => tableField.name_en, {
      id: 'name_en',
      header: translate(langData, lang, LangSetUpForTeacher.list.teacherName.key) || "Teacher Name",
    }),
    columnHelper.accessor((tableField) => tableField.mobile, {
      id: 'mobile_no',
      header: translate(langData, lang, LangSetUpForTeacher.list.mobile.key) || "Mobile",
    }),
    columnHelper.accessor((tableField) => tableField.nid, {
      id: 'nid',
      header: translate(langData, lang, LangSetUpForTeacher.list.nid.key) || "NID",
    }),
    columnHelper.accessor((tableField) => tableField?.learning_center_id?.code, {
      id: 'center_code',
      header: translate(langData, lang, LangSetUpForStudent.list.centerCode.key) || "Center Code",
    }),
    columnHelper.accessor((tableField) => tableField.learning_center_id?.name_bn, {
      id: 'center_name',
      header: translate(langData, lang, LangSetUpForStudent.list.centerName.key) || "Center Name",
    }),
    columnHelper.accessor((tableField) => tableField?.gender_id?.name_en, {
      id: 'gender',
      header: translate(langData, lang, LangSetUpForTeacher.form.gender.key) || "Gender",
    }),
    columnHelper.accessor((tableField) => tableField.status, {
      id: 'status',
      header: translate(langData, lang, LangSetUpForList.status.key),
      cell: (status) => {
        return (<Typography color={status.row.original.status === 1 ? "primary" : "error"} sx={{ p: .5 }} >{status.row.original.status === 1 ? "Active" : "Inactive"}</Typography>);
      }
    }),
    columnHelper.accessor(() => "", {
      id: 'action',
      header: translate(langData, lang, LangSetUpForList.action.key),
      cell: (data) => {
        return (
          <Box className="actionField">
            <Button
              type="button"
              color="primary"
              startIcon={<ViewIcon />}
              LinkComponent={Link}
              href={`/admin/teacher-management/teacher-info/${data.row.original.id}/show`}
            />
            <Button
              type="button"
              startIcon={<EditIcon />}
              LinkComponent={Link}
              href={`/admin/teacher-management/teacher-info/${data.row.original.id}/edit`}
            />
            <Button
              type="button"
              startIcon={<DeleteIcon />}
              onClick={() => onDeleteAlert(data.row.original.id)}
            />
          </Box>
        )
      }
    }),
  ], [lang, langData, params])

  const table = useReactTable({
    data: teacherInfoList?.data || [].length === 0,
    columns,
    filterFns: {
      fuzzy: globalFilterTableData,
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setSearchValue,
    globalFilterFn: globalFilterTableData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const onChangePagination = useCallback((page: any) => {
    setParams((params: any) => ({ ...params, ...page }))
  }, [params])

  const onDeleteAlert = (id: string) => {
    setItemIsd(id);
    setOpen(true)
  }

  const onDeleteSubmit = () => {
    deleteItem(itemId)
    setOpen(false)
  }

  const handleClickToPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "React Print Islamic Foundation",
    onAfterPrint: () => console.log("Print Success")
  })
  const handleExpandClick = () => setExpand(!expand)

  const handleExportToPdf = async () => {
    const headerColumns = columns.filter(column => column.id !== "action").map(pdf => pdf.header);
    const paramString = Object.keys(params).map(key => {
      if (key !== "page" && key !== "limit") {
        return `${key}=${encodeURIComponent(params[key])}`;
      }
    }).join('&');

    const data = {
      headerColumns,
      totalColumns: headerColumns.length,
      panelSearch: paramString,
      lang
    };
    try {
      await exportToPDF(data);
    } catch (error) {
      console.error("PDF err ", error);
    }
  };
  //Excel
  const handleExportToExcel = async () => {
    const paramString = Object.keys(params).map(key => {
      if (key !== "page" && key !== "limit") {
        return `${key}=${encodeURIComponent(params[key])}`;
      }
    }).join('&');
    const headerColumns = [
      translate(langData, lang, LangSetUpForList.sl.key) || "ক্র/নং",
      translate(langData, lang, LangSetUpForTeacher.list.teacherName.key) || "Teacher Name",
      translate(langData, lang, LangSetUpForTeacher.list.mobile.key) || "Mobile",
      translate(langData, lang, LangSetUpForTeacher.list.nid.key) || "NID",
      translate(langData, lang, LangSetUpForStudent.list.centerCode.key) || "Center Code",
      translate(langData, lang, LangSetUpForStudent.list.centerName.key) || "Center Name",
      translate(langData, lang, LangSetUpForTeacher.form.gender.key) || "Gender",
      translate(langData, lang, LangSetUpForList.status.key) || "স্ট্যাটাসঃ",
    ];
    const data = {
      headerColumns,
      totalColumns: headerColumns.length,
      panelSearch: paramString,
      lang
    };
    try {
      await exportToExcel(data);
    } catch (error) {
      console.error("Excel err ", error);
    }
  };

  const breadcrumbLink = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.teacher_management.key) || 'Teachers' },
    {
      href: '/admin/teacher-management/teacher-info', label: translate(langData, lang, LangSetUpForMenu.teacher_management.submodule.teacher_list
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
              <Box className="dropToggle">
                <Typography>
                  {methods.watch().divisionId.value && (<><span>
                    {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division"}
                  </span> <span className="textColor">{methods.watch().divisionId.label},</span></>)}
                  {methods.watch().districtId.value && (<><span>
                    {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District"}
                  </span><span className="textColor"> {methods.watch().districtId.label},</span></>)}
                  {methods.watch().upazilaId.value && (<><span>
                    {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila"}
                  </span> <span className="textColor"> {methods.watch().upazilaId.label},</span></>)}
                  {methods.watch().status !== "" ? (<><span>
                    {translate(langData, lang, LangSetUpForList.status.key) || "Status"}
                  </span> <span className="textColor"> {methods.watch().status?.toString() === '1' ? 'Active' : 'Inactive'},</span></>) : ""}
                </Typography>

                <Box onClick={handleExpandClick} className="collapseIcon">
                  {expand ? <ExpandLess fontSize='large' /> : <ExpandMore fontSize='large' />}
                </Box>
              </Box>

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
                      <Grid item xs={12} lg={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division"}
                        </FormInputLabel>
                        <FormAutocomplete name='divisionId' dataSource={listArrayModify(divisionList?.data)} />
                      </Grid>
                      <Grid item xs={12} lg={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District"}
                        </FormInputLabel>
                        <FormAutocomplete name='districtId' dataSource={listArrayModify(districtList?.data)} />
                      </Grid>
                      <Grid item xs={12} lg={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila"}
                        </FormInputLabel>
                        <FormAutocomplete name='upazilaId' dataSource={listArrayModify(upazilaList?.data)} />
                      </Grid>
                      <Grid item xs={12} lg={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForTeacher.form.centerNameCode.key) || "Center Name & Code"}
                        </FormInputLabel>
                        <FormAutocomplete name='learning_center_id' dataSource={listArrayModifyCenterNameCode(learningCenterList?.data)} />
                      </Grid>
                      <Grid item xs={12} md={3} >
                        <FormInputLabel htmlFor="TeacherName">
                          {translate(langData, lang, LangSetUpForTeacher.list.teacherName.key) || "Teacher Name"}
                        </FormInputLabel>
                        <FormInputBootstrap name='name_en' id="TeacherName" />
                      </Grid>
                      <Grid item xs={12} md={3} >
                        <FormInputLabel htmlFor="NID">
                          {translate(langData, lang, LangSetUpForTeacher.list.nid.key) || "NID"}
                        </FormInputLabel>
                        <FormInputBootstrap name='nid' id="NID" />
                      </Grid>
                      <Grid item xs={12} md={2} >
                        <FormInputLabel htmlFor="MobileNumber">
                          {translate(langData, lang, LangSetUpForTeacher.list.mobile.key) || "Mobile Number"}
                        </FormInputLabel>
                        <FormInputBootstrap name='mobile' id="MobileNumber" />
                      </Grid>
                      <Grid item xs={12} lg={2} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForTeacher.form.gender.key) || "Gender"}
                        </FormInputLabel>
                        <FormAutocomplete name='gender_id' dataSource={listArrayModify(genderList?.data)} />
                      </Grid>
                      <Grid item xs={12} lg={2} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForList.status.key) || "Status"}
                        </FormInputLabel>
                        <FormSelect name='status' dataSource={[{ id: 0, name: "Inactive" }, { id: 1, name: "Active" }]} />
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
                                  methods.reset();
                                  setParams((params: any) => ({
                                    ...params,
                                    learning_center_id: "",
                                    gender_id: "",
                                    districtId: "",
                                    divisionId: "",
                                    upazilaId: "",
                                    name_en: "",
                                    nid: "",
                                    mobile: "",
                                    status: undefined
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

          <Paper className="paperBody">
            <Box className="tableField tableSpacing">
              {/* table search bar area start  */}
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="space-between"
              >
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Box className="searchField">
                    <Typography>
                      {translate(langData, lang, LangSetUpForList.search.key) || "Search"}
                    </Typography>
                    <Box component={'form'} >
                      <SearchIcon />
                      <input
                        type="search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder={translate(langData, lang, LangSetUpForList.typeHere.key) || "Type Here..."} name="search"
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }} xs={12} sm={12} md={12} lg={8} xl={8}>
                  <Box className="downloadField">
                    <ul className="exportSec">
                      <li>
                        <Button onClick={handleClickToPrint} type="button" startIcon={<PrintIcon />}>
                          {translate(langData, lang, LangSetUpForList.print.key) || "Print"}
                        </Button>
                      </li>
                      <li><Button type="button" onClick={handleExportToExcel} startIcon={<ExcelIcon />}>
                        {translate(langData, lang, LangSetUpForList.export_to_excel.key) || "Export to Excel"}
                      </Button></li>
                      <li><Button onClick={handleExportToPdf} type="button" startIcon={<PdfIcon />}>
                        {translate(langData, lang, LangSetUpForList.export_to_pdf.key) || "Export to Pdf"}
                      </Button></li>
                      <li>
                        <Button type="button" onClick={() => router.push('/admin/teacher-management/teacher-info/add')} startIcon={<AddIcon />}>
                          {translate(langData, lang, LangSetUpForTeacher.list.addteacherButton.key) || "Add New Teacher"}
                        </Button>
                      </li>
                    </ul>
                  </Box>
                </Grid>
                {/* table search bar area end  */}
              </Grid>
              {/* table search bar area end  */}

              {/* table area start  */}
              <Suspense fallback={<CircularProgress />} >
                <ReactTable dataSource={table} />
              </Suspense>
            </Box>
            {/* pagination start */}
            <PaginationComponent
              paginationData={teacherInfoList?.metaData}
              getPageNumber={(page: number) => onChangePagination({ page })}
              getJumpPageNumber={(page: number) => onChangePagination({ page })}
              getPageLimit={(limit: number) => onChangePagination({ limit })}
            />
            {/* pagination end */}
          </Paper>
        </Box>

        {/* Notification Modal start */}
        {open === true && <AlertDialog
          open={open}
          closeDialog={() => setOpen(false)}
          modeType={"delete"}
          actionFunction={onDeleteSubmit}
        />}
        {/* Notification Modal End */}
      </Box>
      <div style={{ display: 'none' }}>
        <ReactPrint dataSource={table} dataRef={componentRef} />
      </div>
    </Box>
  )
}

export default TeacherInfoList