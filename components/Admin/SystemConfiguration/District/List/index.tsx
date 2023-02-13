
import { yupResolver } from '@hookform/resolvers/yup';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Collapse, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useDeleteDistrictMutation, useGetDistrictsQuery } from "Api/SystemConfiguration/District";
import { useGetDivisionListQuery } from 'Api/SystemConfiguration/Division';
import AlertDialog from 'components/common/DeleteModal';
import FormAutocomplete from 'components/common/FormItem/FormAutocomplete';
import FormInputBootstrap, { FormInputLabel } from 'components/common/FormItem/FormInputBootstrap';
import FormSelect from 'components/common/FormItem/FormSelect';
import BreadCrumb from 'components/common/PageBreadCrumb/BreadCrumb';
import PaginationComponent from 'components/common/Pagination';
import ReactPrint from "components/common/ReactPrint";
import ReactTable from "components/common/ReactTable";
import { globalFilterTableData } from 'components/common/ReactTable/utility/GlobalDataFilter';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useReactToPrint } from "react-to-print";
import { RootState } from 'Store';
import { useDebounce } from 'use-debounce';
import { AddIcon, DeleteIcon, EditIcon, PrintIcon } from "Utils/CustomIcons";
import { EnumPaginationType } from 'Utils/Enums/PaginationType';
import { IndexSerial, listArrayModify, translate } from 'Utils/Handler';
import { LangSetUpForForm } from 'Utils/Language/MasterData/Form';
import { LangSetUpForList } from 'Utils/Language/MasterData/List';
import { LangSetUpForMenu } from 'Utils/Language/Menu';
import { LangSetUpForDistrict } from 'Utils/Language/SystemConfiguration/District';
import { TypeOf } from 'yup';
import { IDistrictList } from '../Model';
import { panelSearchSchema } from '../Schema';


const columnHelper = createColumnHelper<IDistrictList>();

const DistrictList = () => {

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
    divisionId: "",
    name_en: "",
    name_bn: "",
    status: undefined
  })

  const { data: district, refetch } = useGetDistrictsQuery(params)
  const { data: divisionList } = useGetDivisionListQuery()
  const [deleteItem] = useDeleteDistrictMutation()
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  type IPanelSearchSchemaProp = TypeOf<typeof panelSearchSchema>;
  const methods = useForm<IPanelSearchSchemaProp>({
    mode: 'onChange',
    resolver: yupResolver(panelSearchSchema),
    defaultValues: {
      division_search: { label: '', value: '' },
      name_bn_search: "",
      name_en_search: "",
      status: ""
    },
  })

  const panelSearchOnSubmit: SubmitHandler<IPanelSearchSchemaProp> = (items: IPanelSearchSchemaProp) => {
    let divisionId = items?.division_search?.value;
    let status = items?.status !== "" ? Number(items.status) : "";
    let name_en = items?.name_en_search;
    let name_bn = items?.name_bn_search;
    setParams((params: any) => ({ ...params, name_en, name_bn, status, divisionId }))
  }

  const columns = useMemo(() => [
    columnHelper.accessor((tableField, index) => "", {
      id: 'SL',
      header: translate(langData, lang, LangSetUpForList.sl.key) || "SL",
      cell: (props: any) => {
        const sl = IndexSerial(params.page, params.limit, props.row.index, lang)
        return sl;
      },
    }),
    columnHelper.accessor((tableField) => tableField.name_en, {
      id: 'name_en',
      header: translate(langData, lang, LangSetUpForDistrict.list.districtEn.key) || "Name (English)",
      //  "Name (English)"
    }),
    columnHelper.accessor((tableField) => tableField.name_bn, {
      id: 'name_bn',
      header: translate(langData, lang, LangSetUpForDistrict.list.districtBn.key) || "Name (Bangla)",
    }),
    columnHelper.accessor((tableField) => tableField.division?.name_en, {
      id: 'division',
      header: translate(langData, lang, LangSetUpForDistrict.list.division.key) || "Division",
    }),

    columnHelper.accessor((tableField) => tableField.status, {
      id: 'Status',
      header: translate(langData, lang, LangSetUpForList.status.key) || "Status",
      cell: (status) => {
        return (<Typography color={status.row.original.status === 1 ? "primary" : "error"} >{status.row.original.status === 1 ? "Active" : "Inactive"} </Typography>)
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
              href={`/admin/system-configuration/district/${data.row.original.id}/edit`}
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
    data: district?.data || [].length === 0,
    columns,
    filterFns: {
      fuzzy: globalFilterTableData
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
  const onDeleteSubmit = async () => {
    await deleteItem(itemId).unwrap().then((res) => setOpen(false))
  }

  const handleClickToPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "React Print Islamic Foundation",
    onAfterPrint: () => console.log("Print Success")
  })

  const handleExpandClick = () => setExpand(!expand);

  const breadcrumbList = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.system_configuration.key) || 'System Configuration' },
    {
      href: '/admin/system-configuration/district', label: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district
        .key) || 'District'
    }
  ]
  return (
    <Box className="table-page">
      <Box className="contentMainField">
        <Paper>
          <Box className="breadCrumbBg">
            <BreadCrumb listItems={breadcrumbList} />
          </Box>
        </Paper>

        <Box className="contentField">
          <Paper className="paperBody">
            <List className="collapsField"
              sx={{ padding: 0, bgcolor: 'background.paper' }}
              component="nav">
              <Box className="dropToggle">

                <Typography>
                  {methods.watch().division_search?.value && (<><span>
                    {translate(langData, lang, LangSetUpForDistrict.list.division.key) || "Division:"}
                  </span> <span className="textColor">{methods.watch('division_search.label')},</span></>)}
                  {methods.watch().name_en_search && (<><span>
                    {translate(langData, lang, LangSetUpForDistrict.list.districtEn.key) || "District English:"}
                  </span><span className="textColor"> {methods.watch('name_en_search')},</span></>)}
                  {methods.watch().name_bn_search && (<><span>
                    {translate(langData, lang, LangSetUpForDistrict.list.districtBn.key) || "District Bangla:"}
                  </span> <span className="textColor"> {methods.watch('name_bn_search')},</span></>)}
                  {methods.watch().status !== "" ? (<><span>
                    {translate(langData, lang, LangSetUpForList.status.key) || "Status:"}
                  </span> <span className="textColor"> {methods.watch().status?.toString() === '1' ? 'Active' : 'Inactive'}</span></>) : ""}
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
                          {translate(langData, lang, LangSetUpForDistrict.list.division.key) || "Division:"}
                        </FormInputLabel>
                        <FormAutocomplete name='division_search' dataSource={listArrayModify(divisionList?.data)} />
                      </Grid>

                      <Grid item xs={12} lg={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForDistrict.list.districtEn.key) || "District Name English:"}
                        </FormInputLabel>
                        <FormInputBootstrap name='name_en_search' />
                      </Grid>
                      <Grid item xs={12} lg={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForDistrict.list.districtBn.key) || "District Name Bangla"}
                        </FormInputLabel>
                        <FormInputBootstrap name='name_bn_search' />
                      </Grid>
                      <Grid item xs={12} lg={3} >
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
                              <Button onClick={() => { methods.reset(); setParams((params: any) => ({ ...params, name_en: "", name_bn: "", status: "", divisionId: "" })) }} type="button" className="resetBtn">
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
                        placeholder={translate(langData, lang, LangSetUpForList.typeHere.key) || "Type Here..."}
                        name="search" />
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
                      {/* <li><Button type="button" startIcon={<ExcelIcon />}>
                      {translate(langData, lang, LangSetUpForList.export_to_excel.key) || "Export to Excel"}
                      </Button></li>
                      <li><Button type="button" startIcon={<PdfIcon />}>
                      {translate(langData, lang, LangSetUpForList.export_to_pdf.key) || "Export to Pdf"}
                      </Button></li> */}
                      <li>
                        <Button type="button" onClick={() => router.push('/admin/system-configuration/district/add')} startIcon={<AddIcon />}>
                          {translate(langData, lang, LangSetUpForDistrict.form.add_district_title.key) || "Add District"}
                        </Button>
                      </li>
                    </ul>
                  </Box>
                </Grid>
                {/* table search bar area end  */}
              </Grid>

              {/* table area start  */}
              <ReactTable dataSource={table} />
              {/* table area end  */}

            </Box>
            {/* pagination start */}
            <PaginationComponent
              paginationData={district?.metaData}
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
      <Box sx={{ display: 'none' }}>
        <ReactPrint dataSource={table} dataRef={componentRef} />
      </Box>
    </Box>
  )
}

export default DistrictList