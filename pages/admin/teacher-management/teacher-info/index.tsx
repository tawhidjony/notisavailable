import Skeletons from "components/Admin/Skeletons";
import React, { Suspense } from "react";
const TeacherInfoList = React.lazy(() =>
  import(
    "components/Admin/TeacherManagement/TeacherInfo/List"
  )
);

type Props = {}

const TeacherInfo = (props: Props) => {
  return (
    <Suspense fallback={<Skeletons />}>
      <TeacherInfoList />
    </Suspense>
  )
}

export default TeacherInfo