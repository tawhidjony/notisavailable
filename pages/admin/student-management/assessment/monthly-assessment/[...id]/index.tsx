import { useGetStudentInfoQuery } from "Api/StudentManagement/StudentInfo";
import EditMonthlyAssessment from "components/Admin/StudentManagement/Assessment/MonthlyAssessmentList/Edit";
import ViewMonthlyAssessmentList from "components/Admin/StudentManagement/Assessment/MonthlyAssessmentList/View";


type Props = {
  learning_center_id: string,
  sessionId: string,
  month: string,
  viewEdit: string
}

const View = (props: Props) => {
  const { learning_center_id, sessionId, month, viewEdit } = props;
  const params = {
    learning_center_id,
    sessionId,
    month,
    viewEdit
  };

  const data = useGetStudentInfoQuery(params);

  return (
    viewEdit === "view" ?
      <ViewMonthlyAssessmentList studentList={data?.data?.data} /> :
      <EditMonthlyAssessment studentList={data?.data?.data} />
  )
}

export async function getServerSideProps(context: any) {
  const { params } = context
  const { id } = params && params
  const [learning_center_id, sessionId, month, viewEdit] = id;
  return {
    props: {
      learning_center_id,
      sessionId,
      month,
      viewEdit
    },
  }
}
export default View
