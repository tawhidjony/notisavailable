import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Pagination, Paper, Select, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
const PaginationItem = dynamic(() => import('@mui/material/PaginationItem'), { ssr: false })


const PaginationButton = styled(Button)({
    textTransform: 'capitalize',
    fontSize: '5px',
    '&.MuiPaginationItem-icon': {
        fontSize: '16px'
    }
})

const CustomPagination = styled(PaginationItem)({
    color: '#066e38',
    '&.Mui-selected': {
        backgroundColor: '#066e38',
        color: '#FFFFFF'
    },
    '&.MuiPaginationItem-root': {
        border: '1px solid #f1f2f3',
        minWidth: '32px',
        height: '30px',
        borderRadius: '4px',
        fontSize: '1rem',
    }
})

const PaginationComponent = (props: any) => {

    const { paginationData } = props && props

    const inputRef = useRef<HTMLInputElement>(null);
    const [limitPerPage, setLimitPerPage] = useState("10")

    const paginationChange = (event: ChangeEvent<unknown>, value: number) => {
        props.getPageNumber(value);
    }

    const totalPage = Math.ceil(Number(paginationData?.totalCount) / Number(paginationData?.limit)) || 0

    const onSubmitJumpPageNumber = (e: SyntheticEvent) => {
        e.preventDefault()
        props?.getJumpPageNumber(inputRef.current?.value)
    }

    const onChangePageDataLimit = (event: SelectChangeEvent) => {
        setLimitPerPage(event.target.value);
        props.getPageLimit(Number(event.target.value));
        props.getPageNumber(1);
    }

    // const rangeStart = paginationData?.page;
    // const rangeEnd = endIndex > items.length ? items.length : endIndex;

    return (
        <Paper>
            {paginationData?.totalCount <= 10 ? "" : (<Box className="paginationField" sx={{ p: 1.2 }}>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                >
                    <Grid item xs={12} sm={12} md={12} lg={9} xl={8}>
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="space-between"
                        >
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                <Pagination
                                    variant="outlined"
                                    shape="rounded"
                                    defaultPage={1}
                                    page={paginationData?.page ?? 1}
                                    count={totalPage || 1}
                                    onChange={paginationChange}
                                    showFirstButton={true}
                                    showLastButton={true}
                                    renderItem={(items) => <CustomPagination
                                        components={{
                                            first: (props) => <PaginationButton {...props} component="a" startIcon={<KeyboardDoubleArrowLeftIcon />} >First</PaginationButton>,
                                            last: (props) => <PaginationButton {...props} component="a" endIcon={<KeyboardDoubleArrowRightIcon />} >Last</PaginationButton>
                                        }} {...items}
                                    />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                <Box className="pageinputField">
                                    <span className="pageNumberText">Page</span>
                                    <span className="pageNumber">
                                        <form onSubmit={onSubmitJumpPageNumber} >
                                            <input type="number" ref={inputRef} />
                                            <Button type="submit" >Go</Button>
                                        </form>
                                    </span>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* {`Showing ${rangeStart}  of ${totalPage}`} */}
                    <Grid item xs={12} sm={12} md={12} lg={3} xl={4}>
                        <Box className="showPage">
                            <span>Show :</span>
                            <Box sx={{ minWidth: 120 }} >
                                <FormControl size="small" fullWidth>
                                    <InputLabel>Per page</InputLabel>
                                    <Select
                                        label="Per page"
                                        value={limitPerPage}
                                        onChange={onChangePageDataLimit}
                                    >
                                        <MenuItem color="black" value={10}>10</MenuItem>
                                        <MenuItem value={15}>15</MenuItem>
                                        <MenuItem value={20}>20</MenuItem>
                                        <MenuItem value={30}>30</MenuItem>
                                        <MenuItem value={50}>50</MenuItem>
                                        <MenuItem value={100}>100</MenuItem>
                                        <MenuItem value={500}>500</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>)}

        </Paper>
    )
}

export default PaginationComponent