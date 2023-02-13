
import React from "react";


export class ComponentToPrint extends React.PureComponent<any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { columns, dataSource } = this.props;

    const TableHeadItem = ({ item }: { item: string }) => <th style={{ border: '1px solid #bdbdbd', padding: '10px' }} >{item}</th>

    const TableRow = ({ item, column, index }: any) => <tr key={`table-row-${index}`} >
      {column.map((columnItem: IThead, index: number) => {
        return <td key={index} style={{ border: '1px solid #bdbdbd', padding: '8px' }}>{item[`${columnItem.value}`]}</td>
      })}
    </tr>

    return (
      <div style={{ padding: '10px' }}>
        <div style={{ padding: '1rem 0 .5rem', marginBottom: '1rem', borderBottom: '1px solid #e0e0e0' }}>
          <h1 style={{ textAlign: 'center' }}>Islamic Foundation Bangladesh</h1>
        </div>
        <table style={{ borderCollapse: 'collapse', width: '100%', padding: '16px' }} >
          <thead style={{ textAlign: 'left', backgroundColor: '#e0e0e0' }} >
            <tr>
              {columns?.map((item: IThead) => <TableHeadItem key={`thead-${item.id ?? ''}`} item={item.title ?? ''} />)}
            </tr>
          </thead>
          <tbody>
            {dataSource?.map((item: any, index: number) => <TableRow key={`tbody-${index ?? ''}`} item={item} column={columns} />)}
          </tbody>
        </table>

      </div>
    );


  }
}