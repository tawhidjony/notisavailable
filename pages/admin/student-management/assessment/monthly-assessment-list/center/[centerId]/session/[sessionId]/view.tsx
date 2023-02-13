import { useShowPrimaryAdmissionInfoQuery } from "Api/StudentManagement/PrimaryAdmission"
import ViewMonthlyAssessmentList from "components/Admin/StudentManagement/Assessment/MonthlyAssessmentList/View"


type Props = {
  centerId: string,
  sessionId: string
}

const View = ({ centerId, sessionId }: Props) => {
  const data = useShowPrimaryAdmissionInfoQuery({ centerId, sessionId });

  return (
    <ViewMonthlyAssessmentList />
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
export default View
