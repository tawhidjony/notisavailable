import Skeletons from "components/Admin/Skeletons";
import React, { Suspense } from "react";
const CreateTeacherEvaluation = React.lazy(() =>
  import(
    "components/Admin/TeacherManagement/TeacherEvaluation/Add"
  )
);

type Props = {}

const AddTeacherEvaluation = (props: Props) => {
  return (
    <Suspense fallback={<Skeletons />}>
      <CreateTeacherEvaluation />
    </Suspense>
  )
}

export default AddTeacherEvaluation