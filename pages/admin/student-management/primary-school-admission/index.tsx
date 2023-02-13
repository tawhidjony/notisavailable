import React, { Suspense } from "react";
import Skeletons from "../../../../components/Admin/Skeletons";
const PrimaryAdmissionList = React.lazy(() => import('components/Admin/StudentManagement/PrimarySchoolAdmission/List'));

type Props = {}


const PrimarySchoolAdmission = (props: Props) => {
  return (
    <div >
      <Suspense fallback={<Skeletons />} >
        <PrimaryAdmissionList />
      </Suspense>
    </div>
  )
}

export default PrimarySchoolAdmission