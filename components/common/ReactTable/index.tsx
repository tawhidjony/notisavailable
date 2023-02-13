
import { Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { flexRender } from '@tanstack/react-table';
type Props = {
  dataSource: any
}
const ReactTable = ({ dataSource }: Props) => {

  const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
    '&.TableContent:last-child': {
      textAlign: "center"
    },
    '&.TableHead:nth-last-of-type(-n + 2)': {
      minWidth: '5%',
      width: '8%',
      textAlign: "center"
    }
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
    '&.TableContent:last-child': {
      textAlign: "center",
      width: '5%'
    },
    '&.TableContent:nth-last-of-type(-n + 2)': {
      minWidth: '5%',
      width: '8%',
      textAlign: "center"
    }
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: '1px solid #9ed9ba',
    },
  }));


  return (
    <TableContainer className="tableContentField">
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          {dataSource?.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <StyledTableHeadCell key={header.id} className="TableHead">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </StyledTableHeadCell>))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {dataSource?.getRowModel().rows?.length > 0 ?
            dataSource?.getRowModel().rows.map((row: any) => {
              const headerLength = dataSource?.getHeaderGroups()[0].headers?.length
              return (
                <StyledTableRow key={row.id}>
                  {row.getVisibleCells().map((cell: any) => (
                    <StyledTableCell key={cell.id} className="TableContent">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </StyledTableCell>))}
                </StyledTableRow>
              )
            })
            : <StyledTableRow>
              <StyledTableCell sx={{ padding: "4rem !important" }} colSpan={dataSource?.getHeaderGroups()[0].headers?.length} className="TableContent">
                <Typography fontSize={30} >Data Not Found!!</Typography>
              </StyledTableCell>
            </StyledTableRow>}

        </TableBody>

      </Table>
    </TableContainer>
  )
}

export default ReactTable