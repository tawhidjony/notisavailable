import Skeletons from "components/Admin/Skeletons";
import React, { Suspense } from "react";
const PrimaryStudentEntryForm = React.lazy(() =>
  import(
    "components/Admin/StudentManagement/PrimarySchoolAdmission/Add"
  )
);

type Props = {}

const StudentEntry = (props: Props) => {
  return (
    <Suspense fallback={<Skeletons />}>
      <PrimaryStudentEntryForm />
    </Suspense>
  )
}

export default StudentEntry