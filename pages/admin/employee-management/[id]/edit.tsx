import EditNewEmployeeManagement from 'components/Admin/EmployeeManagement/Edit';

type Props = {
  id: string
}

const Edit = ({ id }: Props) => {
  const data = {
    id: id,
  }
  return (
    <EditNewEmployeeManagement data={data} />
  )
}

export async function getServerSideProps(context: any) {
  const { params } = context
  const { id } = params
  return {
    props: {
      id
    },
  }
}

export default Edit