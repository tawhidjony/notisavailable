import { yupResolver } from "@hookform/resolvers/yup";
import { ListItemText } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box, Button, Collapse, Grid, List, ListItem, Modal, Paper, Typography
} from "@mui/material";
import {
  createColumnHelper, getCoreRowModel, getFilteredRowModel, useReactTable
} from '@tanstack/react-table';
import { useDeleteEmployeeManagementMutation, useExportToEmployeeExcelMutation, useExportToEmployeePDFMutation, useGetEmployeeManagementQuery } from "Api/EmployeeManagement";
import { useGetDesignationListQuery } from "Api/SystemConfiguration/Designation";
import { useGetEmployeeTypeListQuery } from "Api/SystemConfiguration/EmployeeType";
import { useGetOfficeListQuery } from "Api/SystemConfiguration/Office";
import AlertDialog from "components/common/DeleteModal";
import FormAutocomplete from "components/common/FormItem/FormAutocomplete";
import FormInputBootstrap, { FormInputLabel } from "components/common/FormItem/FormInputBootstrap";
import FormSelect from "components/common/FormItem/FormSelect";
import BreadCrumb from "components/common/PageBreadCrumb/BreadCrumb";
import PaginationComponent from "components/common/Pagination";
import ReactPrint from "components/common/ReactPrint";
import ReactTable from "components/common/ReactTable";
import { globalFilterTableData } from "components/common/ReactTable/utility/GlobalDataFilter";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo, useRef, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { RootState } from "Store";
import { useDebounce } from "use-debounce";
import { AddIcon, DeleteIcon, EditIcon, ExcelIcon, PdfIcon, PrintIcon, ViewIcon } from "Utils/CustomIcons";
import { EnumPaginationType } from "Utils/Enums/PaginationType";
import { IndexSerial, listArrayModify, translate } from "Utils/Handler";
import { LangSetUpForEmployee } from "Utils/Language/EmployeeManagement";
import { LangSetUpForForm } from "Utils/Language/MasterData/Form";
import { LangSetUpForList } from "Utils/Language/MasterData/List";
import { LangSetUpForMenu } from "Utils/Language/Menu";
import { TypeOf } from "yup";

import { EmployeeManagementList } from "../Model";
import { panelSearchSchema } from "../Schema";
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
  }
};
const columnHelper = createColumnHelper<EmployeeManagementList>();

const EmployeeManagementList = () => {

  const router = useRouter()
  const componentRef = useRef(null)
  const componentRefModal = useRef(null)
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(false)
  const [itemId, setItemIsd] = useState<string>('')
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  const [searchValue, setSearchValue] = useState("");
  const [globalFilter] = useDebounce(searchValue, 1000);
  const [page, setPage] = useState(1)
  const [limitPerPage, setLimitPerPage] = useState(10)
  const [params, setParams] = useState<any>({
    page: EnumPaginationType.PAGE,
    limit: EnumPaginationType.PER_PAGE_SIZE,
    employee_id: "",
    name_en: "",
    name_bn: "",
    nid: "",
    email: "",
    mobile: "",
    employeetypeId: "",
    officeId: "",
    designationId: "",
    status: ""
  })

  const { data: employeeManagement, refetch } = useGetEmployeeManagementQuery(params)
  const { data: officeList } = useGetOfficeListQuery()
  const { data: designationList } = useGetDesignationListQuery()
  const { data: employeeTypeList } = useGetEmployeeTypeListQuery()
  const [employeeManagementDelete] = useDeleteEmployeeManagementMutation()
  const [exportToPDF] = useExportToEmployeePDFMutation();
  const [exportToExcel] = useExportToEmployeeExcelMutation();

  type IPanelSearchSchemaProp = TypeOf<typeof panelSearchSchema>;

  const methods = useForm<IPanelSearchSchemaProp>({
    mode: 'onChange',
    resolver: yupResolver(panelSearchSchema),
    defaultValues: {
      status: "",
      employee_id: "",
      name_en: "",
      name_bn: "",
      nid: "",
      email: "",
      mobile: "",
      employeetypeId: { label: "", value: "" },
      designationId: { label: "", value: "" },
    },
  })

  const panelSearchOnSubmit: SubmitHandler<IPanelSearchSchemaProp> = (items: IPanelSearchSchemaProp) => {
    let employee_id = items.employee_id
    let name_en = items.name_en
    let name_bn = items.name_bn
    let nid = items.nid
    let email = items.email
    let mobile = items.mobile
    let employeetypeId = items.employeetypeId?.value
    let officeId = items.officeId?.value
    let designationId = items.designationId?.value
    let status = items?.status !== "" ? Number(items.status) : "";
    setParams((params: any) => ({
      ...params,
      employee_id,
      name_en,
      name_bn,
      nid,
      email,
      mobile,
      employeetypeId,
      officeId,
      designationId,
      status,
    }))


    refetch()
  }


  //================= modal =========
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const handleClose = () => { setModalOpen(!modalOpen) }
  //================= modal =========
  const columns = useMemo(() => [
    columnHelper.accessor((tableField, index) => IndexSerial(page, limitPerPage, index), {
      id: 'SL',
      header: translate(langData, lang, LangSetUpForList.sl.key) || "SL"
    }),
    columnHelper.accessor((tableField) => tableField.employee_id, {
      id: 'employee_id',
      header: translate(langData, lang, LangSetUpForEmployee.list.employeeId.key) || "employee_id",
    }),
    columnHelper.accessor((tableField) => tableField.name_en, {
      id: 'name_en',
      header: translate(langData, lang, LangSetUpForEmployee.list.name_en.key) || "Name (English)",
    }),
    columnHelper.accessor((tableField) => tableField.father_name, {
      id: 'Father_name',
      header: translate(langData, lang, LangSetUpForEmployee.list.fathersNameEn.key) || "Father Name (English)",
    }),
    columnHelper.accessor((tableField) => tableField.mother_name, {
      id: 'mother_en',
      header: translate(langData, lang, LangSetUpForEmployee.list.motherEn.key) || "Mother Name (English)",
    }),
    columnHelper.accessor((tableField) => tableField.nid, {
      id: 'nid',
      header: translate(langData, lang, LangSetUpForEmployee.list.nid.key) || "NID",
    }),
    columnHelper.accessor((tableField) => tableField.email, {
      id: 'email',
      header: translate(langData, lang, LangSetUpForEmployee.list.email.key) || "E-mail",
    }),
    columnHelper.accessor((tableField) => tableField.mobile, {
      id: 'mobile',
      header: translate(langData, lang, LangSetUpForEmployee.list.contact.key) || "Contact Number",
    }),
    columnHelper.accessor((tableField) => tableField.address, {
      id: 'address',
      header: translate(langData, lang, LangSetUpForEmployee.list.address.key) || "Address",
    }),
    columnHelper.accessor((tableField) => tableField.status, {
      id: 'Status',
      header: translate(langData, lang, LangSetUpForList.status.key) || "Status",
      cell: (status) => {
        return (<Typography color={status.row.original.status === 1 ? "primary" : "error"} >{status.row.original.status === 1 ? "Active" : "Inactive"}</Typography>)
      }

    }),
    columnHelper.accessor((tableField) => tableField.address, {
      id: 'action',
      header: translate(langData, lang, LangSetUpForList.action.key) || "Action",
      cell: (data) => {
        return (
          <Box className="actionField">
            <Button type="button" color="primary" onClick={() => {
              setModalOpen(!modalOpen);
              setModalData(data?.row?.original)
            }} startIcon={<ViewIcon />} />
            <Button type="button">
              <Link href={`/admin/employee-management/[id]/edit`} as={`/admin/employee-management/${data.row.original.id}/edit`}>
                <EditIcon />
              </Link>
            </Button>
            <Button type="button" color="error" onClick={() => onDeleteAlert(data.row.original.id)} >
              <DeleteIcon />
            </Button>
          </Box>
        )
      }
    }),
  ], [lang, langData, page, limitPerPage])

  const table = useReactTable({
    data: employeeManagement?.data || [].length === 0,
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

  const handleClick = () => { setOpen(!open); };

  // Item Delete section
  const onDeleteAlert = (id: string) => {
    setItemIsd(id);
    setAlertDialogOpen(true)
  }

  const onDeleteSubmit = async () => {
    await employeeManagementDelete(itemId).unwrap().then((res) => {
      if (res?.statusCode === 200) {
        setAlertDialogOpen(false);
      }
    })
  }
  //Excel
  const handleExportToExcel = async () => {
    const paramString = Object.keys(params).map(key => {
      if (key !== "page" && key !== "limit") {
        return `${key}=${encodeURIComponent(params[key])}`;
      }
    }).join("&");
    const headerColumns = [
      translate(langData, lang, LangSetUpForList.sl.key) || "ক্র/নং",
      translate(langData, lang, LangSetUpForEmployee.list.employeeId.key) || "employee_id",
      translate(langData, lang, LangSetUpForEmployee.list.name_en.key) || "Name (English)",
      translate(langData, lang, LangSetUpForEmployee.list.fathersNameEn.key) || "Father Name (English)",
      translate(langData, lang, LangSetUpForEmployee.list.motherEn.key) || "Mother Name (English)",
      translate(langData, lang, LangSetUpForEmployee.list.nid.key) || "NID",
      translate(langData, lang, LangSetUpForEmployee.list.email.key) || "E-mail",
      translate(langData, lang, LangSetUpForEmployee.list.contact.key) || "Contact Number",
      translate(langData, lang, LangSetUpForEmployee.list.address.key) || "Address",
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
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.employee_management.key) || 'Employee Management' },
    { href: '/admin/employee-management', label: translate(langData, lang, LangSetUpForMenu.employee_management.submodule.employee_list.key) || 'Employee List' }
  ]

  const handleExpandClick = () => setExpand(!expand)

  const handleExportToPdf = async () => {
    const headerColumns = columns.filter(column => column.id !== "action").map(pdf => pdf.header);
    const paramString = Object.keys(params).map(key => {
      if (key !== "page" && key !== "limit") {
        return `${key}=${encodeURIComponent(params[key])}`;
      }
    }).join("&");

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

  return (
    <Box className="table-page">
      <Box className="contentMainField" >
        <Paper>
          <Box className="breadCrumbBg">
            <BreadCrumb listItems={breadcrumbLink} />
          </Box>
        </Paper>
        <Box className="contentField">
          {/* Panel search area start */}
          <Paper className="paperBody">
            <List className="collapsField"
              sx={{ padding: 0, bgcolor: 'background.paper' }}
              component="nav">
              <Box className="dropToggle">
                <Typography>
                  {/* {methods.watch().officetypeId.value && (<><span>Office Type:</span> <span className="textColor">{methods.watch().officetypeId.label},</span></>)}
                  {methods.watch().divisionId.value && (<><span>বিভাগঃ</span> <span className="textColor">{methods.watch().divisionId.label},</span></>)}
                  {methods.watch().districtId.value && (<><span> জেলাঃ</span><span className="textColor"> {methods.watch().districtId.label},</span></>)}
                  {methods.watch().upazilaId.value && (<><span> উপজেলাঃ </span> <span className="textColor"> {methods.watch().upazilaId.label},</span></>)}
                  {methods.watch().status !== "" ? (<><span> স্ট্যাটাসঃ  </span> <span className="textColor"> {methods.watch().status?.toString() === '1' ? 'Active' : 'Inactive'},</span></>) : ""} */}
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
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForEmployee.list.employeeId.key) || "Employee ID"}
                        </FormInputLabel>
                        <FormInputBootstrap name='employee_id' />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForEmployee.list.name_en.key) || "Name English"}
                        </FormInputLabel>
                        <FormInputBootstrap name='name_en' />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForEmployee.list.name_bn.key) || "Name Bangla"}
                        </FormInputLabel>
                        <FormInputBootstrap name='name_bn' />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForEmployee.list.nid.key) || "NID"}
                        </FormInputLabel>
                        <FormInputBootstrap name='nid' />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForEmployee.list.email.key) || "Email"}
                        </FormInputLabel>
                        <FormInputBootstrap name='email' />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForEmployee.form.mobile.key) || "Mobile"}
                        </FormInputLabel>
                        <FormInputBootstrap name='mobile' />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForEmployee.list.employeeType.key) || "Employee Type"}
                        </FormInputLabel>
                        <FormAutocomplete name='employeetypeId' dataSource={listArrayModify(employeeTypeList?.data)} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForEmployee.list.office.key) || "Office"}
                        </FormInputLabel>
                        <FormAutocomplete name='officeId' dataSource={listArrayModify(officeList?.data)} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={6} xl={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForEmployee.form.designation.key) || "Designation"}
                        </FormInputLabel>
                        <FormAutocomplete name='designationId' dataSource={listArrayModify(designationList?.data)} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={6} xl={3} >
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
                              <Button onClick={() => {
                                methods.reset();
                                setParams((params: any) => ({
                                  ...params,
                                  employee_id: "",
                                  name_en: "",
                                  name_bn: "",
                                  nid: "",
                                  email: "",
                                  mobile: "",
                                  employeetypeId: "",
                                  officeId: "",
                                  designationId: "",
                                  status: "",
                                }))
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
              </Collapse>
            </List>
          </Paper>
          {/* Panel search area end */}

          {/* Table area start */}
          <Paper className="paperBody">
            <Box className="tableField">
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
                    <Box component={"form"}>
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
                      <li>
                        <Button type="button" onClick={handleExportToExcel} startIcon={<ExcelIcon />}>
                          {translate(langData, lang, LangSetUpForList.export_to_excel.key) || "Export to Excel"}
                        </Button>
                      </li>
                      <li><Button onClick={handleExportToPdf} type="button" startIcon={<PdfIcon />}>
                        {translate(langData, lang, LangSetUpForList.export_to_pdf.key) || "Export to Pdf"}
                      </Button></li>
                      <li>
                        <Button type="button" onClick={() => router.push('/admin/employee-management/add')} startIcon={<AddIcon />}>
                          {translate(langData, lang, LangSetUpForEmployee.form.add_employee_button.key) || "Add Employee"}
                        </Button></li>
                    </ul>
                  </Box>
                </Grid>
              </Grid>
              {/* table search bar area end  */}
              {/* Table header body start */}
              <ReactTable dataSource={table} />
              {/* Table header body end */}
            </Box>
            {/* pagination start */}

            <Paper>
              <PaginationComponent
                paginationData={employeeManagement?.metaData}
                getPageNumber={(page: number) => onChangePagination({ page })}
                getJumpPageNumber={(page: number) => onChangePagination({ page })}
                getPageLimit={(limit: number) => onChangePagination({ limit })}
              />

            </Paper>
            {/* pagination end */}
          </Paper>
          {/* Table area end */}
        </Box>
      </Box>

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
        <Box sx={style}>
          <Button type="button" className="printButton" onClick={handleClickToPrintModal} startIcon={<PrintIcon />}> Print </Button>
          <Typography className="printButtonClose" onClick={handleClose}> <CloseIcon /> </Typography>
          <Box ref={componentRefModal} sx={{ padding: '1rem' }} >
            {/* <Box style={{ display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column', marginBottom: 5 }} >
              <Typography id="modal-modal-title" variant="h4" component="h2"> মসজিদভিত্তিক শিশু ও গণশিক্ষা কার্যক্রম </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2"> ইসলামিক ফাউন্ডেশন </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2"> আগারগাঁও শেরেবাংলানগর, ঢাকা-১২০৭ </Typography>
            </Box>
            <Divider /> */}
            <Box >
              <List >
                <ListItem>
                  <ListItemText style={{ flexBasis: "50%" }} ><span style={{ fontWeight: "bolder" }} >
                    {translate(langData, lang, LangSetUpForEmployee.list.employeeId.key) || "কর্মকর্তার আইডি"}:
                  </span> {modalData?.employee_id}</ListItemText>
                  <ListItemText style={{ flexBasis: "50%" }} ><span style={{ fontWeight: "bolder" }} >
                    {translate(langData, lang, LangSetUpForEmployee.form.designation.key) || "পদবী"}:
                  </span> {modalData?.designationId?.name_en}</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText style={{ flexBasis: "50%" }} ><span style={{ fontWeight: "bolder" }} >
                    {translate(langData, lang, LangSetUpForEmployee.list.employeeName.key) || "কর্মকর্তার নাম"}:
                  </span> {modalData?.name_en}</ListItemText>
                  <ListItemText style={{ flexBasis: "50%" }} ><span style={{ fontWeight: "bolder" }} >
                    {translate(langData, lang, LangSetUpForEmployee.form.dateOfJoining.key) || "যোগদানের তারিখ"}:
                  </span> {moment(modalData?.join_date).format('DD-MM-YYYY')}</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText style={{ flexBasis: "50%" }} ><span style={{ fontWeight: "bolder" }} >
                    {translate(langData, lang, LangSetUpForEmployee.form.fathersName.key) || "বাবার নাম"}:
                  </span> {modalData?.father_name}</ListItemText>
                  <ListItemText style={{ flexBasis: "50%" }} ><span style={{ fontWeight: "bolder" }} >
                    {translate(langData, lang, LangSetUpForEmployee.form.email.key) || "ই-মেইল:"}:
                  </span> {modalData?.email}</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText style={{ flexBasis: "50%" }} ><span style={{ fontWeight: "bolder" }} >
                    {translate(langData, lang, LangSetUpForEmployee.form.mothersName.key) || "মায়ের নাম"}:
                  </span> {modalData?.mother_name}</ListItemText>
                  <ListItemText style={{ flexBasis: "50%" }} ><span style={{ fontWeight: "bolder" }} >
                    {translate(langData, lang, LangSetUpForEmployee.form.mobile.key) || "মোবাইল নম্বর"}:
                  </span> {modalData?.mobile}</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText style={{ flexBasis: "50%" }} ><span style={{ fontWeight: "bolder" }} >
                    {translate(langData, lang, LangSetUpForEmployee.form.nid.key) || "এনআইডি"}:
                  </span> {modalData?.nid}</ListItemText>
                  <ListItemText style={{ flexBasis: "50%" }} ><span style={{ fontWeight: "bolder" }} >
                    {translate(langData, lang, LangSetUpForEmployee.form.address.key) || "ঠিকানা"}:
                  </span> {modalData?.address}</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText style={{ flexBasis: "50%" }} ><span style={{ fontWeight: "bolder" }} >
                    {translate(langData, lang, LangSetUpForEmployee.form.officerType.key) || "কর্মকর্তার ধরন"}:
                  </span> {modalData?.employeetypeId?.name_en}</ListItemText>
                  <ListItemText style={{ flexBasis: "50%" }} ><span style={{ fontWeight: "bolder" }} >
                    {translate(langData, lang, LangSetUpForList.status.key) || "স্ট্যাটাস"}:
                  </span> {modalData?.status}</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText style={{ flexBasis: "50%" }} >
                    <span style={{ fontWeight: "bolder" }} >
                      {translate(langData, lang, LangSetUpForEmployee.form.office.key) || "অফিস"}:
                    </span>
                    {modalData?.officeId?.name_en}
                  </ListItemText>
                </ListItem>

                <ListItemText>
                  <Box className="singleImgField">
                    <Typography component="span" className="label" style={{ fontWeight: "bolder", marginLeft: "20px" }}>
                      {translate(langData, lang, LangSetUpForEmployee.form.image.key) || "ছবি"}:
                    </Typography>
                    <img src={process.env.FILE_URL + '/' + modalData?.photo} alt="" style={{ width: '150px', height: "150px", marginLeft: "5px" }} />
                  </Box>
                </ListItemText>
              </List>

            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default EmployeeManagementList