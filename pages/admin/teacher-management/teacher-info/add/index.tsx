import React, { Suspense } from "react";
import Skeletons from "../../../../../components/Admin/Skeletons";
const CreateTeacherInfo = React.lazy(() =>
  import(
    "components/Admin/TeacherManagement/TeacherInfo/Add"
  )
);

type Props = {}

const AddTeacherInfo = (props: Props) => {
  return (
    <Suspense fallback={<Skeletons />}>
      <CreateTeacherInfo />
    </Suspense>
  )
}

export default AddTeacherInfo