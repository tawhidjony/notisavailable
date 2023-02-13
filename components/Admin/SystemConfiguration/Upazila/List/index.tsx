
import { yupResolver } from '@hookform/resolvers/yup';
import { ExpandLess } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

import TuneIcon from '@mui/icons-material/Tune';
import { Button, Collapse, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useGetDistrictListQuery } from 'Api/SystemConfiguration/District';
import { useGetDivisionListQuery } from 'Api/SystemConfiguration/Division';
import { useDeleteUpazilaMutation, useGetUpazilaQuery } from 'Api/SystemConfiguration/Upazila';
import { PrimaryButton } from 'components/common/Button';
import CollapseButton from 'components/common/Button/CollapseButton';
import AlertDialog from 'components/common/DeleteModal';
import FormAutocomplete from 'components/common/FormItem/FormAutocomplete';
import { FormInputLabel } from 'components/common/FormItem/FormInputBootstrap';
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
import { TransitionGroup } from 'react-transition-group';
import { RootState } from 'Store';
import { useDebounce } from 'use-debounce';
import { AddIcon, DeleteIcon, EditIcon, PrintIcon } from "Utils/CustomIcons";
import { EnumPaginationType } from 'Utils/Enums/PaginationType';
import { IndexSerial, listArrayModify, translate } from 'Utils/Handler';
import { LangSetUpForForm } from 'Utils/Language/MasterData/Form';
import { LangSetUpForList } from 'Utils/Language/MasterData/List';
import { LangSetUpForMenu } from 'Utils/Language/Menu';
import { LangSetUpForUpazila } from 'Utils/Language/SystemConfiguration/Upazila';
import { TypeOf } from 'yup';
import { IUpazilaList } from '../Model';
import { panelSearchSchema } from '../Schema';
const columnHelper = createColumnHelper<IUpazilaList>();

const UpazilaList = () => {

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
    divisionId: "",
    districtId: "",
    status: undefined
  })

  const { data: upazila } = useGetUpazilaQuery(params)
  const [deleteItem] = useDeleteUpazilaMutation()
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  type IPanelSearchSchemaProp = TypeOf<typeof panelSearchSchema>;
  const methods = useForm<IPanelSearchSchemaProp>({
    mode: 'onChange',
    resolver: yupResolver(panelSearchSchema),
    defaultValues: {
      divisionId: { label: '', value: '' },
      districtId: { label: '', value: '' },
      status: ''
    },
  })

  const { data: divisionList } = useGetDivisionListQuery()
  const { data: districtList } = useGetDistrictListQuery({ divisionId: methods?.watch()?.divisionId?.value })

  const panelSearchOnSubmit: SubmitHandler<IPanelSearchSchemaProp> = (items: IPanelSearchSchemaProp) => {
    let divisionId = items?.divisionId?.value;
    let districtId = items?.districtId?.value;
    let status = items?.status !== "" ? Number(items.status) : "";
    setParams((params: any) => ({ ...params, districtId, status, divisionId }))
  }



  const columns = useMemo(() => [
    columnHelper.accessor((tableField, index) => IndexSerial(params.page, params.limit, index), {
      id: 'SL',
      header: translate(langData, lang, LangSetUpForList.sl.key) || "SL",
    }),
    columnHelper.accessor((tableField) => tableField?.districtId?.division?.name_en, {
      id: 'divisionId',
      // header: "Division Name"
      header: translate(langData, lang, LangSetUpForUpazila.list.division.key) || "Division Name",
    }),
    columnHelper.accessor((tableField) => tableField?.districtId?.name_en, {
      id: 'districtId',
      header: translate(langData, lang, LangSetUpForUpazila.list.district.key) || "District Name",
    }),
    columnHelper.accessor((tableField) => tableField?.name_en, {
      id: 'name_e',
      header: translate(langData, lang, LangSetUpForUpazila.list.upazila.key) || "Upazila Name",
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
              href={`/admin/system-configuration/upazila/${data.row.original.id}/edit`}
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
  ], [lang, langData])

  const table = useReactTable({
    data: upazila?.data || [].length === 0,
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
  const onDeleteSubmit = async () => {
    await deleteItem(itemId).unwrap().then((res) => setOpen(false))
  }

  const handleClickToPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "React Print Islamic Foundation",
    onAfterPrint: () => console.log("Print Success")
  })


  const breadcrumbList = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.system_configuration.key) || 'System Configuration' },
    {
      href: '/admin/system-configuration/upazila', label: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila
        .key) || 'Upazila'
    }
  ]




  const resetPanelSearch = () => {
    methods.reset();
    setParams((params: any) => ({
      ...params,
      divisionId: "",
      districtId: "",
      status: ""
    }))
  }
  return (
    <Box className="table-page">
      <Box className="contentMainField">
        <Paper>
          <Box className="breadCrumbBg">
            <BreadCrumb listItems={breadcrumbList} />
          </Box>
        </Paper>

        <Box className="contentField">
          <Paper sx={{ mt: 1, p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }} >
              <Box>
                {methods.watch().divisionId?.value || methods.watch().districtId?.value || methods.watch()?.status ? (
                  <Typography variant='h6' >
                    {methods.watch().divisionId?.value && (<><span>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division"}:
                    </span> <span className="textColor">{methods.watch('divisionId.label')}, </span></>)}
                    {methods.watch().districtId.value && (<><span>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District"}:
                    </span><span className="textColor"> {methods.watch('districtId.label')}, </span></>)}
                    {methods.watch().status !== "" ? (<><span>
                      {translate(langData, lang, LangSetUpForList.status.key) || "Status"}:
                    </span> <span className="textColor"> {methods.watch().status?.toString() === '1' ? 'Active' : 'Inactive'}</span></>) : ""}
                  </Typography>
                ) : (<Typography variant='h5' color="primary" >Upazila Panel Search</Typography>)}
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
                      <Grid container spacing={2}>
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
                        <Grid item xs={12} lg={4} >
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
                      <li>
                        <Button type="button" onClick={() => router.push('/admin/system-configuration/upazila/add')} startIcon={<AddIcon />}>
                          {translate(langData, lang, LangSetUpForUpazila.form.add_upazila_title.key) || "Add Upazila"}
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
              paginationData={upazila?.metaData}
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

export default UpazilaList