
import SearchIcon from '@mui/icons-material/Search';

import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useDeleteDesignationMutation, useExportToExcelMutation, useExportToPDFMutation, useGetDesignationQuery } from 'Api/SystemConfiguration/Designation';
import AlertDialog from 'components/common/DeleteModal';
import BreadCrumb from 'components/common/PageBreadCrumb/BreadCrumb';
import PaginationComponent from 'components/common/Pagination';
import ReactPrint from "components/common/ReactPrint";
import ReactTable from "components/common/ReactTable";
import { globalFilterTableData } from 'components/common/ReactTable/utility/GlobalDataFilter';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from "react-to-print";
import { RootState } from 'Store';
import { useDebounce } from 'use-debounce';
import { AddIcon, DeleteIcon, EditIcon, ExcelIcon, PdfIcon, PrintIcon } from "Utils/CustomIcons";
import { IndexSerial, translate } from 'Utils/Handler';
import { LangSetUpForList } from 'Utils/Language/MasterData/List';
import { LangSetUpForMenu } from 'Utils/Language/Menu';
import { LangSetUpForDesignation } from 'Utils/Language/SystemConfiguration/Designation';
import { IDesignationList } from '../Model';


const columnHelper = createColumnHelper<IDesignationList>();

const DesignationList = () => {

  const componentRef = useRef(null);
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [limitPerPage, setLimitPerPage] = useState(10)
  const [itemId, setItemIsd] = useState<string>('')


  const [searchValue, setSearchValue] = useState("");
  const [globalFilter] = useDebounce(searchValue, 1000);


  const tableQuery = { limitPerPage, page }
  const { data: designation } = useGetDesignationQuery(tableQuery)
  const [deleteItem] = useDeleteDesignationMutation()
  const [exportToPDF] = useExportToPDFMutation();
  const [exportToExcel] = useExportToExcelMutation();
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  const columns = useMemo(() => [
    columnHelper.accessor((tableField, index) => IndexSerial(page, limitPerPage, index), {
      id: 'SL',
      header: translate(langData, lang, LangSetUpForList.sl.key) || "SL"
    }),
    columnHelper.accessor((tableField) => tableField.name_en, {
      id: 'name_en',
      header: translate(langData, lang, LangSetUpForDesignation.list.name_en.key) || "Name (English)"
    }),
    columnHelper.accessor((tableField) => tableField.name_bn, {
      id: 'name_bn',
      header: translate(langData, lang, LangSetUpForDesignation.list.name_bn.key) || "Name (Bangla)"
    }),
    columnHelper.accessor((tableField) => tableField.priority, {
      id: 'priority',
      header: translate(langData, lang, LangSetUpForDesignation.form.priority.key) || "Priority"
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
              href={`/admin/system-configuration/designation/${data.row.original.id}/edit`}
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
  ], [lang, langData, page, limitPerPage])


  const table = useReactTable({
    data: designation?.data || [].length === 0,
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

  const paginationChange = (page: number) => setPage(page);

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
  const breadcrumbLink = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.system_configuration.key) || 'System Configuration' },
    { href: '/admin/system-configuration/designation', label: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.designation.key) || 'Designation' }
  ]

  const pdfColumns = [
    {
      title: translate(langData, lang, LangSetUpForList.sl.key),
      value: 'sl',
      id: 1,
    },
    {
      title: translate(langData, lang, LangSetUpForDesignation.list.name_en.key),
      value: 'name_en',
      id: 2,
    },
    {
      title: translate(langData, lang, LangSetUpForDesignation.list.name_bn.key),
      value: 'name_bn',
      id: 3,
    },
    {
      title: translate(langData, lang, LangSetUpForDesignation.form.priority.key),
      value: 'priority',
      id: 4,
    },
    {
      title: translate(langData, lang, LangSetUpForList.status.key),
      value: 'status',
      id: 5,
    }
  ];

  const handleExportToPdf = async () => {
    const headerColumns = pdfColumns.map(pdf => pdf.title);
    const data = {
      headerColumns,
      totalColumns: headerColumns.length,
      lang
    };
    try {
      console.log(data);
      await exportToPDF(data);
    } catch (error) {
      console.error("PDF err ", error);
    }
  };

  //Excel
  const handleExportToExcel = async () => {
    const headerColumns = pdfColumns.map(pdf => pdf.title);
    const data = {
      headerColumns,
      totalColumns: pdfColumns.length,
      lang
    };
    try {
      await exportToExcel(data);
    } catch (error) {
      console.error("PDF err ", error);
    }
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
                        name="search"
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
                      <li>
                        <Button type="button" onClick={handleExportToPdf} startIcon={<PdfIcon />}>
                          {translate(langData, lang, LangSetUpForList.export_to_pdf.key) || "Export to Pdf"}
                        </Button>
                      </li>

                      <li>
                        <Button type="button" onClick={() => router.push('/admin/system-configuration/designation/add')} startIcon={<AddIcon />}>
                          {translate(langData, lang, LangSetUpForDesignation.form.add_designation_title.key) || "Add Designation"}
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
              paginationData={designation?.metaData}
              getPageNumber={paginationChange}
              getjumpPageNumber={(pageNumber: number) => setPage(pageNumber)}
              getPageLimit={(limitNumber: number) => setLimitPerPage(limitNumber)}
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

export default DesignationList