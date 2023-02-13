import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDeleteLanguageMutation, useGetLanguagesPaginationQuery } from 'Api/SystemConfiguration/Language';
import AlertDialog from "components/common/DeleteModal";
import BreadCrumb from 'components/common/PageBreadCrumb/BreadCrumb';
import PaginationComponent from "components/common/Pagination";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'Store';
import { AddIcon } from 'Utils/CustomIcons';
import { translate } from 'Utils/Handler';
import { ILanguageList } from "../Model";

const LanguageList = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [limitPerPage, setLimitPerPage] = useState(15)
  const [filterSearch, setFilterSearch] = useState("")
  const tableQuery = { limitPerPage, page }
  const [itemId, setItemIsd] = useState<string>('')
  const { data: languages } = useGetLanguagesPaginationQuery(tableQuery)
  const [deleteItem] = useDeleteLanguageMutation()
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  const languageData = useMemo(() => {
    if (filterSearch === "") { return languages?.data }
    return languages?.data?.filter((item: ILanguageList) => item.field_trans_en.toLowerCase().includes(filterSearch.toLocaleLowerCase()) || item.field_trans_bn.toLowerCase().includes(filterSearch.toLocaleLowerCase()))
  }, [languages, filterSearch])

  const onDeleteAlert = (value: { id: string }) => {
    setItemIsd(value?.id);
    setOpen(true)
  }

  const onDeleteSubmit = async () => {
    try {
      await deleteItem(itemId).unwrap().then((res) => setOpen(false)).catch((err) => console.error(err))
    } catch (error) {
      console.error(error);
    }
  }

  const paginationChange = (pageNumber: number) => {
    setPage(pageNumber);
  }

  const breadcumLink = [
    { href: '#', label: translate(langData, lang, "LangSetUpForMenu.system_configuration.key") || 'System Configuration' },
    { href: '/admin/system-configuration/language', label: translate(langData, lang, "LangSetUpForMenu.system_configuration.submodule[0].designation.key") || 'Language' }
  ]

  return (<>
    <Box className="table-page" >
      <Box className="contentMainField">

        <Paper>
          <Box className="breadCrumbBg">
            <BreadCrumb listItems={breadcumLink} />
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
                    <Typography>Search</Typography>
                    <Box component={'form'} >
                      <SearchIcon />
                      <input type="search" value={filterSearch} onChange={(e) => setFilterSearch(e.target.value)} placeholder="&nbsp; Type Here..." name="search" />
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
                        <Button type="button" onClick={() => router.push('/admin/system-configuration/language/add')} startIcon={<AddIcon />}>
                          {translate(langData, lang, "LangSetUpForDesignation.form.add_designation_title.key") || "Add Language"}
                        </Button>
                      </li>
                    </ul>
                  </Box>
                </Grid>
              </Grid>
              {/* table search bar area end  */}


              {/* table area start  */}
              <TableContainer component={Paper} className="tableContentField">
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell width={'5%'} className="TableHead ">SL</TableCell>
                      <TableCell className="TableHead">Module</TableCell>
                      <TableCell className="TableHead">SubModule</TableCell>
                      <TableCell className="TableHead">SubChildModule</TableCell>
                      <TableCell className="TableHead">Field Type</TableCell>
                      <TableCell className="TableHead">Title</TableCell>
                      <TableCell className="TableHead">Name En</TableCell>
                      <TableCell className="TableHead">Name BN</TableCell>
                      <TableCell width={'10%'} align="center" className="TableHead actionField">Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {languageData?.map((item: ILanguageList, index: number) => (
                      <TableRow key={`division-${index}`} sx={{ "table, thead": { border: 0 } }}>
                        <TableCell className="TableContent">{index + 1}</TableCell>
                        <TableCell className="TableContent">{item?.moduleId?.name_en}</TableCell>
                        <TableCell className="TableContent">{item?.submoduleId?.parentId?.name_en || item?.submoduleId?.name_en || "N/A"}</TableCell>
                        <TableCell className="TableContent">{item?.submoduleId?.parentId ? item?.submoduleId?.name_en : "N/A"}</TableCell>
                        <TableCell className="TableContent">{item.field_type}</TableCell>
                        <TableCell className="TableContent">{item.title}</TableCell>
                        <TableCell className="TableContent">{item.field_trans_en}</TableCell>
                        <TableCell className="TableContent">{item.field_trans_bn}</TableCell>
                        <TableCell align="center" className="TableContent actionField">
                          <Button type="button" color="primary">
                            <Link href={`/admin/system-configuration/language/[id]/edit`} as={`/admin/system-configuration/language/${item.id}/edit`}>
                              {/* <EditIcon color="primary" /> */}
                              <img src="/assets/icons/edit.svg" alt="delete-icon" />
                            </Link>
                          </Button>
                          <Button type="button" color="error" onClick={() => onDeleteAlert(item)} >
                            <img src="/assets/icons/delete.svg" alt="delete-icon" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
              </TableContainer>
              {/* table area end  */}
            </Box>
            {/* pagination start */}
            <PaginationComponent
              paginationData={languages?.metaData}
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
    </Box>
  </>)
}
export default LanguageList