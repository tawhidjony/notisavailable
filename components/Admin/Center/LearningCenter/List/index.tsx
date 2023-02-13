import { yupResolver } from "@hookform/resolvers/yup";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Collapse, Divider, Grid, List, ListItem, ListItemText, Modal, Paper, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useDeleteLearningcenterMutation, useExportToEducationPDFMutation, useExportToLearningCenterExcelMutation, useGetLearningcenterQuery } from "Api/Center/LearningCenter";
import { useGetLearningcentertypeAllListQuery } from "Api/Center/LearningCenterType";
import { useGetCityCorporationListQuery } from "Api/SystemConfiguration/CityCorporation";
import { useGetDistrictListQuery } from "Api/SystemConfiguration/District";
import { useGetDivisionListQuery } from "Api/SystemConfiguration/Division";
import { useGetUpazilaListQuery } from "Api/SystemConfiguration/Upazila";
import AlertDialog from "components/common/DeleteModal";
import FormAutocomplete from "components/common/FormItem/FormAutocomplete";
import FormInputBootstrap, { FormInputLabel } from "components/common/FormItem/FormInputBootstrap";
import FormSelect from "components/common/FormItem/FormSelect";
import BreadCrumb from "components/common/PageBreadCrumb/BreadCrumb";
import PaginationComponent from "components/common/Pagination";
import ReactPrint from "components/common/ReactPrint";
import ReactTable from "components/common/ReactTable";
import { globalFilterTableData } from "components/common/ReactTable/utility/GlobalDataFilter";
import dayjs from "dayjs";

import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo, useRef, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { RootState } from "Store";
import { useDebounce } from "use-debounce";
import { AddIcon, ExcelIcon, PdfIcon, PrintIcon, ViewIcon } from "Utils/CustomIcons";
import { EnumPaginationType } from "Utils/Enums/PaginationType";
import { IndexSerial, listArrayModify, translate } from "Utils/Handler";
import { LangSetUpForCenter } from "Utils/Language/CenterManagement";
import { LangSetUpForForm } from "Utils/Language/MasterData/Form";
import { LangSetUpForList } from "Utils/Language/MasterData/List";
import { LangSetUpForMenu } from "Utils/Language/Menu";
import { TypeOf } from "yup";
import { LearningCenterList } from "../Model";
import { panelSearchSchema } from "../Validation";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 1024,
  bgcolor: 'background.paper',
  p: 4,
  '& .printButton': {
    position: 'absolute',
    top: '20px',
    right: '100px',
  },
  '& .printButtonClose': {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: ' 1px solid red',
    borderRadius: '100px',
    minWidth: ' 30px !important',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  ".singleImgField, .previewImg": {
    display: "flex",
    width: "70%"
  }
};
const columnHelper = createColumnHelper<LearningCenterList>();

const LearningCenterList = () => {
  const router = useRouter()
  const componentRef = useRef(null)
  const componentRefModal = useRef(null)
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(false)
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [itemId, setItemIsd] = useState<string>('')
  const [searchValue, setSearchValue] = useState("");
  const [globalFilter] = useDebounce(searchValue, 1000);
  const { lang, langData } = useSelector((state: RootState) => state.lang);
  const [modalViewData, setModalViewData] = useState(null);

  const [params, setParams] = useState<any>({
    page: EnumPaginationType.PAGE,
    limit: EnumPaginationType.PER_PAGE_SIZE,
    divisionId: "",
    districtId: "",
    upazilaId: "",
    citycorporationId: "",
    centertypeId: "",
    code: "",
    name_en: "",
    status: ""
  })


  type IPanelSearchSchemaProp = TypeOf<typeof panelSearchSchema>;
  const methods = useForm<IPanelSearchSchemaProp>({
    mode: 'onChange',
    resolver: yupResolver(panelSearchSchema),
    defaultValues: {
      division_search: { label: '', value: '' },
      district_search: { label: '', value: '' },
      upazila_search: { label: '', value: '' },
      citycorporation_search: { label: '', value: '' },
      centertype_search: { label: '', value: '' },
      code_search: "",
      name_en_search: "",
      status_search: ""
    },
  })


  const { data: learningcenter, refetch } = useGetLearningcenterQuery(params)
  const [learningcenterdeleteItem] = useDeleteLearningcenterMutation()
  const { data: divisionList } = useGetDivisionListQuery()
  const { data: districtList } = useGetDistrictListQuery({ divisionId: methods.watch()?.division_search?.value })
  const { data: upazila } = useGetUpazilaListQuery({ districtId: methods.watch()?.district_search?.value })
  const { data: cityCorporation } = useGetCityCorporationListQuery({ citycorporationId: methods.watch()?.upazila_search?.value })
  const { data: learningcentertype } = useGetLearningcentertypeAllListQuery()
  const [exportToPDF] = useExportToEducationPDFMutation();
  const [exportToExcel] = useExportToLearningCenterExcelMutation();

  const panelSearchOnSubmit: SubmitHandler<IPanelSearchSchemaProp> = (items: IPanelSearchSchemaProp) => {
    let divisionId = items?.division_search?.value;
    let districtId = items?.district_search?.value;
    let upazilaId = items?.upazila_search?.value;
    let citycorporationId = items?.citycorporation_search?.value;
    let centertypeId = items?.centertype_search?.value;
    let code = items?.code_search;
    let name_en = items?.name_en_search;
    let status = items?.status_search !== "" ? Number(items.status_search) : "";
    setParams((params: any) => ({ ...params, divisionId, districtId, upazilaId, citycorporationId, centertypeId, code, name_en, status })),
      refetch()
  }

  //================= modal =========
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const handleClose = () => { setModalOpen(!modalOpen) }
  //================= modal =========

  const columns = useMemo(() => [
    columnHelper.accessor((tableField, index) => IndexSerial(params.page, params.limit, index), {
      id: 'SL',
      header: translate(langData, lang, LangSetUpForList.sl.key),
    }),
    columnHelper.accessor((tableField) => tableField?.code, {
      id: 'code',
      header: translate(langData, lang, LangSetUpForCenter.list.centerCode.key) || "কেন্দ্রের কোড",
    }),
    columnHelper.accessor((tableField) => tableField?.name_bn, {
      id: 'name_bn',
      header: translate(langData, lang, LangSetUpForCenter.list.centerName.key) || "মসজিদ/কেন্দ্রের নাম",
    }),
    columnHelper.accessor((tableField) => tableField?.centertypeId?.name_bn, {
      id: 'centertypeId.name_bn',
      header: translate(langData, lang, LangSetUpForCenter.list.centerLevel.key) || "কেন্দ্রের ধরন",

    }),
    columnHelper.accessor((tableField) => '', {
      id: 'formation_date',
      header: translate(langData, lang, LangSetUpForCenter.list.centerCreatedAt.key) || "কমিটি গঠনের তারিখ",
      cell: (props) => {
        let date = props?.row?.original?.formation_date.toString()
        return (
          <Typography>{dayjs(date).format('DD-MM-YYYY')}</Typography>
        )
      }
    }),
    columnHelper.accessor((tableField) => tableField?.area, {
      id: 'area',
      header: translate(langData, lang, LangSetUpForCenter.form.village.key) || "এলাকা / গ্রামঃ",
    }),
    columnHelper.accessor((tableField) => tableField?.status, {
      id: 'Status',
      header: translate(langData, lang, LangSetUpForList.status.key) || "Status",
      cell: (status) => {
        return (<Typography color={status.row.original.status === 1 ? "primary" : "error"} >{status.row.original.status === 1 ? "Active" : "Inactive"} </Typography>)
      }
    }),
    columnHelper.accessor((tableField) => "", {
      id: 'action',
      header: translate(langData, lang, LangSetUpForList.action.key) || "অ্যাকশন",
      cell: (data) => {
        // console.log(data.row.original);

        return <Box className="actionField">
          <Button type="button" color="primary" onClick={() => {
            setModalOpen(!modalOpen);
            setModalData(data?.row?.original)
          }} startIcon={<ViewIcon />} />


          <Button type="button">
            <Link href={`/admin/center/learningcenter/[id]/edit`} as={`/admin/center/learningcenter/${data.row.original.id}/edit`}>
              <img src="/assets/icons/edit.svg" alt="edit-icon" />
            </Link>
          </Button>
          <Button type="button" color="error" onClick={() => onDeleteAlert(data.row.original.id)} >
            <Tooltip title={"Delete"}>
              <img src="/assets/icons/delete.svg" alt="delete-icon" />
            </Tooltip>
          </Button></Box>
      }

    }),
  ], [lang, langData, params])

  const table = useReactTable({
    data: learningcenter?.data || [].length === 0,
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

  const handleClickToPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "React Print Islamic Foundation",
    onAfterPrint: () => console.log("Print Success")
  })

  const handleClickToPrintModal = useReactToPrint({
    content: () => componentRefModal.current,
    documentTitle: "React Print Islamic Foundation",
    onAfterPrint: () => console.log("Print Success")
  })

  const handleExpandClick = () => setExpand(!expand);

  const viewDataModal = (data: any) => {
    setModalViewData(data)
  }
  const handleClick = () => {
    setOpen(!open);
  };
  // Item Delete section
  const onDeleteAlert = (id: string) => {
    setItemIsd(id);
    setAlertDialogOpen(true)
  }

  const onDeleteSubmit = async () => {
    await learningcenterdeleteItem(itemId).unwrap().then((res) => {
      if (res?.statusCode === 200) {
        setAlertDialogOpen(false);
      }
    })
  }



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
      translate(langData, lang, LangSetUpForCenter.list.centerCode.key) || "কেন্দ্রের কোড",
      translate(langData, lang, LangSetUpForCenter.list.centerName.key) || "মসজিদ/কেন্দ্রের নাম",
      translate(langData, lang, LangSetUpForCenter.list.centerLevel.key) || "কেন্দ্রের ধরন",
      translate(langData, lang, LangSetUpForCenter.list.centerCreatedAt.key) || "কমিটি গঠনের তারিখ",
      translate(langData, lang, LangSetUpForCenter.form.village.key) || "এলাকা / গ্রামঃ",
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




  const breadcrumbLink: any = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.center_management.key) || 'Center' },
    { href: '/admin/center/learningcenter', label: translate(langData, lang, LangSetUpForMenu.center_management.submodule.education_center.key) || 'Learning Center' },
    { href: '/admin/center/learningcenter', label: translate(langData, lang, LangSetUpForCenter.list.list.key) || 'List' },
  ]

  return (
    <Box className="table-page">
      <Box className="tableMainField" >
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
                  {methods.watch().division_search?.value && (<>
                    <span>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "বিভাগঃ"}
                    </span> <span className="textColor">{methods.watch('division_search.label')},</span></>)}
                  {methods.watch().district_search?.value && (<><span>
                    {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "জেলাঃ"}
                  </span> <span className="textColor">{methods.watch('district_search.label')},</span></>)}
                  {methods.watch().upazila_search?.value && (<><span>
                    {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "উপজেলাঃ"}
                  </span> <span className="textColor">{methods.watch('upazila_search.label')},</span></>)}
                  {methods.watch().citycorporation_search?.value && (<><span>
                    {translate(langData, lang, LangSetUpForCenter.form.cityCorporation.key) || "সিটি কর্পোরেশনঃ"}
                  </span> <span className="textColor">{methods.watch('citycorporation_search.label')},</span></>)}
                  {methods.watch().centertype_search?.value && (<><span>
                    {translate(langData, lang, LangSetUpForCenter.list.centerLevel.key) || "কেন্দ্রের ধরন"}
                  </span> <span className="textColor">{methods.watch('centertype_search.label')},</span></>)}
                  {methods.watch().code_search && (<><span>
                    {translate(langData, lang, LangSetUpForCenter.list.centerCode.key) || "কেন্দ্রের কোড"}
                  </span><span className="textColor"> {methods.watch('code_search')},</span></>)}
                  {methods.watch().name_en_search && (<><span>
                    {translate(langData, lang, LangSetUpForCenter.list.centerName.key) || "মসজিদ/কেন্দ্রের নাম"}
                  </span><span className="textColor"> {methods.watch('name_en_search')},</span></>)}
                  {methods.watch().status_search !== "" ? (<><span>
                    {translate(langData, lang, LangSetUpForList.status.key) || "স্ট্যাটাসঃ"}
                  </span> <span className="textColor"> {methods.watch().status_search?.toString() === '1' ? 'Active' : 'Inactive'}</span></>) : ""}
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
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "বিভাগঃ"}
                        </FormInputLabel>
                        <FormAutocomplete name='division_search' dataSource={listArrayModify(divisionList?.data)} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "জেলাঃ"}
                        </FormInputLabel>
                        <FormAutocomplete name='district_search' dataSource={listArrayModify(districtList?.data)} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "উপজেলাঃ"}
                        </FormInputLabel>
                        <FormAutocomplete name='upazila_search' dataSource={listArrayModify(upazila?.data)} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForCenter.form.cityCorporation.key) || "সিটি কর্পোরেশনঃ"}
                        </FormInputLabel>
                        <FormAutocomplete name='citycorporation_search' dataSource={listArrayModify(cityCorporation?.data)} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForCenter.list.centerLevel.key) || "কেন্দ্রের ধরন"}
                        </FormInputLabel>
                        <FormAutocomplete name='centertype_search' dataSource={listArrayModify(learningcentertype?.data)} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForCenter.list.centerCode.key) || "কেন্দ্রের কোড"}
                        </FormInputLabel>
                        <FormInputBootstrap name='code_search' />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForCenter.list.centerName.key) || "মসজিদ/কেন্দ্রের নাম"}
                        </FormInputLabel>
                        <FormInputBootstrap name='name_en_search' />
                      </Grid>

                      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForList.status.key) || "স্ট্যাটাসঃ"}
                        </FormInputLabel>
                        <FormSelect name='status_search' dataSource={[{ id: 1, name: "Active" }, { id: 0, name: "Inactive" }]} />
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
                              <Button onClick={() => { methods.reset(); setParams((params: any) => ({ ...params, divisionId: "", districtId: "", upazilaId: "", citycorporationId: "", centertypeId: "", code: "", name_en: "", status: "", })) }} type="button" className="resetBtn">
                                <RestartAltIcon />
                                {translate(langData, lang, LangSetUpForForm.reset.key) || "রিসেট"}
                              </Button>
                              <Button type="submit" className="searchBtn">
                                {translate(langData, lang, LangSetUpForList.search.key) || "অনুসন্ধান"}
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
          {/* Panel search area end */}

          {/* Table area start */}
          <Paper className="paperBody">
            <Box className="tableField">
              {/* Table search print area start */}
              <Grid container spacing={2} direction="row" justifyContent="space-between">
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Box className="searchField">
                    <Typography>
                      {translate(langData, lang, LangSetUpForList.search.key) || "অনুসন্ধান"}
                    </Typography>
                    <Box component={'form'} >
                      <SearchIcon />
                      <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder={translate(langData, lang, LangSetUpForList.typeHere.key) || "Type Here..."} name="search" />
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
                        <Button onClick={handleClickToPrint} type="button" className="tableBtn printBtn" startIcon={<PrintIcon />}>
                          {translate(langData, lang, LangSetUpForList.print.key) || "Print"}
                        </Button>

                      </li>
                      <li>
                        <Button type="button" onClick={handleExportToExcel} startIcon={<ExcelIcon />}>
                          {translate(langData, lang, LangSetUpForList.export_to_excel.key) || "Export to Excel"}
                        </Button>
                      </li>
                      <li>
                        <Button onClick={handleExportToPdf} type="button" startIcon={<PdfIcon />}>
                          {translate(langData, lang, LangSetUpForList.export_to_pdf.key) || "Export to PDF"}
                        </Button>
                      </li>
                      <li><Button type="button" onClick={() => router.push('/admin/center/learningcenter/add')} startIcon={<AddIcon />}>
                        {translate(langData, lang, LangSetUpForMenu.center_management.submodule.education_center.subchildmodule.add_education_center.key) || "Add Learning center"}
                      </Button></li>
                    </ul>

                  </Box>
                </Grid>
              </Grid>
              {/* Table search print area end */}
              {/* Table header body start */}
              <ReactTable dataSource={table} />
              {/* Table header body end */}
            </Box>
            {/* pagination start */}

            <PaginationComponent
              paginationData={learningcenter?.metaData}
              getPageNumber={(page: number) => onChangePagination({ page })}
              getJumpPageNumber={(page: number) => onChangePagination({ page })}
              getPageLimit={(limit: number) => onChangePagination({ limit })}
            />

            {/* pagination end  */}
          </Paper>
          {/* Table area end */}
        </Box>
      </Box>
      {/* <ViewLearningCenter data={modalViewData} />
      {open === true && <AlertDialog
        open={open}
        closeDialog={() => setOpen(false)}
        modeType={"delete"}
        actionFunction={onDeleteSubmit}
      />} */}
      {alertDialogOpen === true && <AlertDialog
        open={alertDialogOpen}
        closeDialog={() => setOpen(false)}
        modeType={"delete"}
        actionFunction={onDeleteSubmit}
      />}
      <div style={{ display: 'none' }} >
        <ReactPrint dataSource={table} dataRef={componentRef} />
      </div>

      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modalDesign">
          <Button type="button" className="printButton" onClick={handleClickToPrintModal} startIcon={<PrintIcon />}> Print </Button>
          <Typography className="printButtonClose" onClick={handleClose}> <CloseIcon /> </Typography>
          <Box ref={componentRef} sx={{ padding: '1rem' }} >
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column', marginBottom: 5 }} >
              {/* <Typography id="modal-modal-title" variant="h4" component="h2"> মসজিদভিত্তিক শিশু ও গণশিক্ষা কার্যক্রম </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2"> ইসলামিক ফাউন্ডেশন </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2"> আগারগাঁও শেরেবাংলানগর, ঢাকা-১২০৭ </Typography> */}
              <Typography id="modal-modal-title" variant="h6" component="h3">  শিক্ষা কেন্দ্রের বিস্তারিত </Typography>
            </Box>
            <Divider />
            <Box >
              <List >
                <ListItem>
                  <ListItemText><Typography component="span" className="label">
                    {translate(langData, lang, LangSetUpForCenter.list.centerCode.key) || "কেন্দ্রের কোড"}:
                  </Typography><Typography component="span" className="details">{modalData?.code}</Typography></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText><Typography component="span" className="label">
                    {translate(langData, lang, LangSetUpForCenter.list.centerName.key) || "রিসোর্স সেন্টার নামঃ (বাংলা)"}:
                  </Typography><Typography component="span" className="details">{modalData?.name_bn}</Typography></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText><Typography component="span" className="label">
                    {translate(langData, lang, LangSetUpForCenter.list.centerName.key) || "রিসোর্স সেন্টার নামঃ  (ইংরেজি)"}:
                  </Typography><Typography component="span" className="details">{modalData?.name_en}</Typography></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText><Typography component="span" className="label">
                    {translate(langData, lang, LangSetUpForCenter.list.centerLevel.key) || "কেন্দ্রের ধরন"}:
                  </Typography><Typography component="span" className="details">{modalData?.centertypeId.name_bn}</Typography></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText><Typography component="span" className="label">
                    {translate(langData, lang, LangSetUpForCenter.form.center_location.key) || "কেন্দ্রের ভৌগলিক অবস্থান"}:
                  </Typography><Typography component="span" className="details">{modalData?.latitude} - {modalData?.longitude}</Typography></ListItemText>
                </ListItem>
                <hr />
                <ListItem>
                  <ListItemText sx={{ flexBasis: '50%' }} ><Typography component="span" className="label">
                    {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "বিভাগ"}:
                  </Typography><Typography component="span" className="details">{modalData?.divisionId?.name_en}</Typography></ListItemText>
                  <ListItemText sx={{ flexBasis: '50%' }} ><Typography component="span" className="label">
                    {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "জেলা"}:
                  </Typography><Typography component="span" className="details">{modalData?.districtId?.name_en}</Typography></ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText sx={{ flexBasis: '50%' }} ><Typography component="span" className="label">
                    {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "উপজেলা"}:
                  </Typography><Typography component="span" className="details">{modalData?.upazilaId?.name_bn}</Typography></ListItemText>
                  <ListItemText sx={{ flexBasis: '50%' }} ><Typography component="span" className="label">
                    {translate(langData, lang, LangSetUpForCenter.form.union.key) || "ইউনিয়ন/ওয়ার্ড নং"}:
                  </Typography><Typography component="span" className="details">{modalData?.union}</Typography></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText sx={{ flexBasis: '50%' }} ><Typography component="span" className="label">
                    {translate(langData, lang, LangSetUpForCenter.form.village.key) || "এলাকা / গ্রাম"}:
                  </Typography><Typography component="span" className="details">{modalData?.area}</Typography></ListItemText>
                </ListItem>
                <hr />
                <ListItem>
                  <ListItemText sx={{ flexBasis: '50%' }} ><Typography component="span" className="label">
                    {translate(langData, lang, LangSetUpForCenter.form.center_place.key) || " কেন্দ্র ব্যবস্থাপনার স্থান"}:
                  </Typography><Typography component="span" className="details">{modalData?.address}</Typography></ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText sx={{ flexBasis: '50%' }} ><Typography component="span" className="label">
                    {translate(langData, lang, LangSetUpForCenter.form.center_description.key) || "কেন্দ্রের বিবরণ"}:
                  </Typography><Typography component="span" className="details">{modalData?.description}</Typography></ListItemText>
                  <ListItemText sx={{ flexBasis: '50%' }} >
                    <Box className="singleImgField">
                      <Typography component="span" className="label">
                        {translate(langData, lang, LangSetUpForCenter.form.center_picture.key) || "ছবি"}:
                      </Typography>
                      <img className='previewImg showImage' src={process.env.FILE_URL + '/' + modalData?.photo} alt="" />
                    </Box>
                    {/* <img
                    className='previewImg showImage'
                    src={process.env.FILE_URL + '/' + data?.photo}
                    alt=""
                  /> */}
                  </ListItemText>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Box>
      </Modal>

    </Box>
  );
}

export default LearningCenterList
