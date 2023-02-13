import { createColumnHelper, flexRender } from '@tanstack/react-table';

const columnHelper = createColumnHelper<any>();
const ReactPrint = ({ dataSource, dataRef }: any) => {
  return (<>
    <div style={{ padding: '10px' }} ref={dataRef} >
      <div style={{ padding: '1rem 0 .5rem', marginBottom: '1rem', borderBottom: '1px solid #e0e0e0' }}>
        <h1 style={{ textAlign: 'center' }}>Islamic Foundation Bangladesh</h1>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%', padding: '16px' }}>
        <thead style={{ textAlign: 'left', backgroundColor: '#e0e0e0' }}>
          {dataSource.getHeaderGroups().map((headerGroup: any) => {

            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.slice(0, -2).map((header: any) => {
                  return (
                    <th key={header.id} style={{ border: '1px solid #bdbdbd', padding: '10px' }}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>)
                })}
              </tr>)
          })}
        </thead>
        <tbody>
          {dataSource.getRowModel().rows.map((row: any) => {
            return (<tr key={row.id}>
              {row.getVisibleCells().slice(0, -2).map((cell: any) => (
                <td key={cell.id} style={{ border: '1px solid #bdbdbd', padding: '8px' }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>))}
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  </>)
}


export default ReactPrint