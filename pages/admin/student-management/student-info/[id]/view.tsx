import { useShowStudentInfoQuery } from "Api/StudentManagement/StudentInfo"
import ViewStudentInfo from "components/Admin/StudentManagement/StudentInfo/View"


type Props = {
  id: string
}

const View = ({ id }: Props) => {
  const data = useShowStudentInfoQuery(id)
  console.log('showData', data);

  return (
    <ViewStudentInfo data={data} />
  )
}

export async function getServerSideProps(context: any) {
  const { params } = context
  const { id } = params && params
  return {
    props: {
      id
    },
  }
}
export default View
