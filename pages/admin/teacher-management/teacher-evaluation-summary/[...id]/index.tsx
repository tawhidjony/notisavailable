import { useShowTeacherEvaluationSummeryQuery } from "Api/TeacherManagement/TeacherEvaluation"
import ViewTeacherEvaluation from "components/Admin/TeacherManagement/TeacherEvaluation/View"

type Props = {
  params: {
    sessionId: string,
    divisionId: string,
    districtId: string,
    upazilaId: string,
  }
}

const View = (props: Props) => {

  const showData = useShowTeacherEvaluationSummeryQuery(props.params)
  return (
    <ViewTeacherEvaluation data={showData} />
  )
}

export async function getServerSideProps(context: any) {

  const { id } = context.query
  const [sessionId, divisionId, districtId, upazilaId] = id
  const params = { sessionId, divisionId, districtId, upazilaId }
  return {
    props: { params },
  }
}
export default View