import { useShowPrimaryAdmissionInfoQuery } from "Api/StudentManagement/PrimaryAdmission"
import ViewPrimaryAdmission from "components/Admin/StudentManagement/PrimarySchoolAdmission/View"


type Props = {
  centerId: string,
  sessionId: string
}

const View = ({ centerId, sessionId }: Props) => {
  const data = useShowPrimaryAdmissionInfoQuery({ centerId, sessionId });

  return (
    <ViewPrimaryAdmission data={data?.data?.data} />
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
