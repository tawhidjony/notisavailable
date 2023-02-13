import EditTeacherInfo from "components/Admin/TeacherManagement/TeacherInfo/Edit"

type Props = {
  id: string
}

const edit = ({ id }: Props) => {
  const data = {
    id: id,
  }
  return (
    <EditTeacherInfo data={data} />
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

export default edit