import { useShowTeacherInfoQuery } from 'Api/TeacherManagement/TeacherInfo';
import ViewTeacherInfo from 'components/Admin/TeacherManagement/TeacherInfo/View';

type Props = {
  id: string
}

const ShowTeacherInfo = ({ id }: Props) => {
  const showData = useShowTeacherInfoQuery(id)
  return (
    <ViewTeacherInfo data={showData} />
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
export default ShowTeacherInfo