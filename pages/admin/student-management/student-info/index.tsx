import React, { Suspense } from "react";
import Skeletons from "../../../../components/Admin/Skeletons";
const StudentManagementList = React.lazy(() => import('components/Admin/StudentManagement/StudentInfo/List'));

type Props = {}


const StudentManagement = (props: Props) => {
  return (
    <div >
      <Suspense fallback={<Skeletons />} >
        <StudentManagementList />
      </Suspense>
    </div>
  )
}

export default StudentManagement