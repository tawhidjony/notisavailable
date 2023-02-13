import { yupResolver } from '@hookform/resolvers/yup';
import { ExpandLess } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { Button, Collapse, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { useGetDistrictListQuery } from 'Api/SystemConfiguration/District';
import { useGetDivisionListQuery } from 'Api/SystemConfiguration/Division';
import { useDeleteOfficeMutation, useExportToOfficeExcelMutation, useExportToOfficePDFMutation, useGetOfficeQuery } from 'Api/SystemConfiguration/Office';
import { useGetOfficeTypeListQuery } from 'Api/SystemConfiguration/OfficeType';
import { useGetUpazilaListQuery } from 'Api/SystemConfiguration/Upazila';
import { CollapseButton, PrimaryButton } from 'components/common/Button';
import AlertDialog from 'components/common/DeleteModal';
import FormAutocomplete from 'components/common/FormItem/FormAutocomplete';
import { FormInputLabel } from 'components/common/FormItem/FormInputBootstrap';
import FormSelect from 'components/common/FormItem/FormSelect';
import BreadCrumb from 'components/common/PageBreadCrumb/BreadCrumb';
import PaginationComponent from 'components/common/Pagination';
import ReactPrint from 'components/common/ReactPrint';
import ReactTable from 'components/common/ReactTable';
import { globalFilterTableData } from 'components/common/ReactTable/utility/GlobalDataFilter';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useCallback, useMemo, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { TransitionGroup } from 'react-transition-group';
import { RootState } from 'Store';
import { useDebounce } from 'use-debounce';
import { AddIcon, DeleteIcon, EditIcon, ExcelIcon, PdfIcon, PrintIcon } from 'Utils/CustomIcons';
import { EnumPaginationType } from 'Utils/Enums/PaginationType';
import { IndexSerial, listArrayModify, translate } from 'Utils/Handler';
import { LangSetUpForForm } from 'Utils/Language/MasterData/Form';
import { LangSetUpForList } from 'Utils/Language/MasterData/List';
import { LangSetUpForMenu } from 'Utils/Language/Menu';
import { LangSetUpForOffice } from 'Utils/Language/SystemConfiguration/Office';
import { TypeOf } from 'yup';
import { IOfficeList } from '../Model';
import { panelSearchSchema } from '../Schema';
const columnHelper = createColumnHelper<IOfficeList>();

const Office = () => {

  const componentRef = useRef(null);
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [expand, setExpand] = useState(true)
  const [itemId, setItemIsd] = useState<string>('')
  const [searchValue, setSearchValue] = useState("");
  const [globalFilter] = useDebounce(searchValue, 1000);
  const [params, setParams] = useState<any>({
    page: EnumPaginationType.PAGE,
    limit: EnumPaginationType.PER_PAGE_SIZE,
    officetypeId: "",
    divisionId: "",
    districtId: "",
    upazilaId: "",
    status: ""
  })

  const { data: officeList, refetch } = useGetOfficeQuery(params)
  const { data: officeTypeList } = useGetOfficeTypeListQuery()
  const { data: divisionList } = useGetDivisionListQuery()
  const { data: districtList } = useGetDistrictListQuery("")
  const { data: upazilaList } = useGetUpazilaListQuery("")
  const [deleteItem] = useDeleteOfficeMutation()
  const { lang, langData } = useSelector((state: RootState) => state.lang);
  const [exportToPDF] = useExportToOfficePDFMutation();
  const [exportToExcel] = useExportToOfficeExcelMutation();

  type IPanelSearchSchemaProp = TypeOf<typeof panelSearchSchema>;

  const methods = useForm<IPanelSearchSchemaProp>({
    mode: 'onChange',
    resolver: yupResolver(panelSearchSchema),
    defaultValues: {
      officetypeId: { label: '', value: '' },
      divisionId: { label: '', value: '' },
      districtId: { label: '', value: '' },
      upazilaId: { label: '', value: '' },
      status: ""
    },
  })

  const panelSearchOnSubmit: SubmitHandler<IPanelSearchSchemaProp> = (items: IPanelSearchSchemaProp) => {
    let officetypeId = items?.officetypeId?.value;
    let divisionId = items?.divisionId?.value;
    let districtId = items?.districtId?.value;
    let upazilaId = items?.upazilaId?.value;
    let status = (items?.status !== "") ? Number(items.status) : "";
    setParams((params: any) => ({ ...params, officetypeId, upazilaId, status, divisionId, districtId }))
  }

  const columns = useMemo(() => [
    columnHelper.accessor((tableField, index) => IndexSerial(params.page, params.limit, index), {
      id: 'sl',
      header: translate(langData, lang, LangSetUpForList.sl.key) || "SL",
    }),

    columnHelper.accessor((tableField) => tableField.name_en, {
      id: 'name_en',
      header: translate(langData, lang, LangSetUpForOffice.list.officeName.key) || "Office Name",
    }),
    columnHelper.accessor((tableField) => tableField?.officetypeId?.name_en, {
      id: 'officetypeId',
      header: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.officetype.key) || "Office Type",
    }),
    columnHelper.accessor((tableField) => tableField?.divisionId?.name_en, {
      id: 'divisionId',
      header: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division",
    }),
    columnHelper.accessor((tableField) => tableField?.districtId?.name_en, {
      id: 'districtId',
      header: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District",
    }),
    columnHelper.accessor((tableField) => tableField?.upazilaId?.name_bn, {
      id: 'upazilaId',
      header: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila",
    }),
    columnHelper.accessor((tableField) => tableField.address, {
      id: 'address',
      header: translate(langData, lang, LangSetUpForOffice.list.address.key) || "Address",
    }),
    columnHelper.accessor((tableField) => tableField.status, {
      id: 'status',
      header: translate(langData, lang, LangSetUpForList.status.key) || "Status",
      cell: (status) => {
        return (<Typography color={status.row.original.status === 1 ? "primary" : "error"} sx={{ p: .5 }} >{status.row.original.status === 1 ? "Active" : "Inactive"}</Typography>);
      }
    }),
    columnHelper.accessor(() => "", {
      id: 'action',
      header: translate(langData, lang, LangSetUpForList.action.key) || "Action",
      cell: (data) => {
        return (
          <Box className="actionField">
            <Button
              type="button"
              startIcon={<EditIcon />}
              LinkComponent={Link}
              href={`/admin/system-configuration/office/${data.row.original.id}/edit`}
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
    data: officeList?.data || [].length === 0,
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


  const breadcrumbLink = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.system_configuration.key) || 'System Configuration' },
    {
      href: '/admin/system-configuration/office', label: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.office
        .key) || 'Office'
    }
  ]
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
      translate(langData, lang, LangSetUpForOffice.list.officeName.key) || "Office Name",
      translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.officetype.key) || "Office Type",
      translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division",
      translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District",
      translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila",
      translate(langData, lang, LangSetUpForOffice.list.address.key) || "Address",
      translate(langData, lang, LangSetUpForList.status.key) || "স্ট্যাটাসঃ",
    ];
    const data = {
      headerColumns,
      totalColumns: headerColumns.length,
      panelSearch: paramString,
      lang
    };
    try {
      console.log('data', data);
      await exportToExcel(data);
    } catch (error) {
      console.error("Excel err ", error);
    }
  };

  const resetPanelSearch = () => {
    methods.reset();
    setParams((params: any) => ({ ...params, officetypeId: "", upazilaId: "", status: "", divisionId: "", districtId: "" }))
  };
  return (
    <Box className="table-page">
      <Box className="contentMainField">
        <Paper>
          <Box className="breadCrumbBg">
            <BreadCrumb listItems={breadcrumbLink} />
          </Box>
        </Paper>

        <Box className="contentField">

          <Paper sx={{ mt: 1, p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }} >
              <Box>
                {methods.watch().divisionId?.value || methods.watch().districtId?.value || methods.watch()?.status ? (
                  <Typography variant='h6' >
                    {methods.watch().officetypeId?.value && (<><span>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.officetype.key) || "Office Type"}:
                    </span> <span className="textColor">{methods.watch().officetypeId?.label}, </span></>)}
                    {methods.watch().divisionId?.value && (<><span>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division"}:
                    </span> <span className="textColor">{methods.watch().divisionId?.label}, </span></>)}
                    {methods.watch().districtId?.value && (<><span>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District"}:
                    </span><span className="textColor"> {methods.watch().districtId?.label}, </span></>)}
                    {methods.watch().upazilaId?.value && (<><span>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila"}:
                    </span> <span className="textColor"> {methods.watch().upazilaId?.label}, </span></>)}
                    {methods.watch()?.status !== "" ? (<><span>
                      {translate(langData, lang, LangSetUpForList?.status.key) || "Status"}
                    </span> <span className="textColor"> {methods.watch().status?.toString() === '1' ? 'Active' : 'Inactive'}, </span></>) : ""}
                  </Typography>
                ) : (<Typography variant='h5' color="primary" >Office Panel Search</Typography>)}
              </Box>
              <Box>
                <CollapseButton type='button' onClick={() => setExpand((prev) => !prev)} size='large' startIcon={expand ? <ExpandLess fontSize='large' /> : <TuneIcon />} />
              </Box>
            </Box>
            <Collapse in={expand} collapsedSize={0} >
              <TransitionGroup>
                <FormProvider {...methods}>
                  <Box sx={{ pt: 1 }} component="form" onSubmit={methods.handleSubmit(panelSearchOnSubmit)}>
                    <Box>
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="space-around"
                        alignItems="stretch"
                      >
                        <Grid item xs={12} lg={4} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.officetype.key) || "Office Type"}
                          </FormInputLabel>
                          <FormAutocomplete name='officetypeId' dataSource={listArrayModify(officeTypeList?.data)} />
                        </Grid>
                        <Grid item xs={12} lg={4} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division"}
                          </FormInputLabel>
                          <FormAutocomplete name='divisionId' dataSource={listArrayModify(divisionList?.data)} />
                        </Grid>
                        <Grid item xs={12} lg={4} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District"}
                          </FormInputLabel>
                          <FormAutocomplete name='districtId' dataSource={listArrayModify(districtList?.data)} />
                        </Grid>
                        <Grid item xs={12} lg={6} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila"}
                          </FormInputLabel>
                          <FormAutocomplete name='upazilaId' dataSource={listArrayModify(upazilaList?.data)} />
                        </Grid>
                        <Grid item xs={12} lg={6} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForList.status.key) || "Status"}
                          </FormInputLabel>
                          <FormSelect name='status' dataSource={[{ id: 0, name: "Inactive" }, { id: 1, name: "Active" }]} />
                        </Grid>

                      </Grid>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1, pt: 2 }}>
                      <PrimaryButton type='button' onClick={resetPanelSearch} variant='outlined' >
                        {translate(langData, lang, LangSetUpForForm.reset.key) || "Reset"}
                      </PrimaryButton>
                      <PrimaryButton type='submit' variant='outlined' >
                        {translate(langData, lang, LangSetUpForList.search.key) || "Search"}
                      </PrimaryButton>
                    </Box>
                  </Box>
                </FormProvider>
              </TransitionGroup>
            </Collapse>
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
                        <Button type="button" onClick={() => router.push('/admin/system-configuration/office/add')} startIcon={<AddIcon />}>
                          {translate(langData, lang, LangSetUpForOffice.form.add_office_title.key) || "Add New Office"}
                        </Button>
                      </li>
                    </ul>
                  </Box>
                </Grid>
                {/* table search bar area end  */}
              </Grid>
              {/* table search bar area end  */}

              {/* table area start  */}
              <ReactTable dataSource={table} />
            </Box>
            {/* pagination start */}
            <PaginationComponent
              paginationData={officeList?.metaData}
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

export default Office