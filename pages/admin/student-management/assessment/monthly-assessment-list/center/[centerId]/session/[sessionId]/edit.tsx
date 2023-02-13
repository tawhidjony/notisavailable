import { useGetStudentListQuery } from "Api/StudentManagement/StudentInfo"
import EditMonthlyAssessmentList from "components/Admin/StudentManagement/Assessment/MonthlyAssessmentList/Edit"

type Props = {
  centerId: string,
  sessionId: string
}

const Edit = ({ centerId, sessionId }: Props) => {
  const params = {
    sessionId,
    learning_center_id: centerId
  };

  const { data: studentList } = useGetStudentListQuery(params)

  return (
    <EditMonthlyAssessmentList studentList={studentList?.data} params={params} />
  )
}

export async function getServerSideProps(context: any) {
  const { params } = context
  const { centerId, sessionId } = params && params
  return {
    props: {
      centerId,
      sessionId
    },
  }
}

export default Edit