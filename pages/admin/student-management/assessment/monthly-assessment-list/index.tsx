import Skeletons from "components/Admin/Skeletons";
import React, { Suspense } from "react";
const MonthlyAssessmentList = React.lazy(() => import('components/Admin/StudentManagement/Assessment/MonthlyAssessmentList/List'));

type Props = {}


const PrimarySchoolAdmission = (props: Props) => {
  return (
    <div >
      <Suspense fallback={<Skeletons />} >
        <MonthlyAssessmentList />
      </Suspense>
    </div>
  )
}

export default PrimarySchoolAdmission