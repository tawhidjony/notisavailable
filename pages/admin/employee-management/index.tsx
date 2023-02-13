import Skeletons from "components/Admin/Skeletons";
import React, { Suspense } from "react";
const EmployeeManagementList = React.lazy(() =>
  import(
    "components/Admin/EmployeeManagement/List"
  )
);

type Props = {}

const EmployeeManagement = (props: Props) => {
  return (
    <Suspense fallback={<Skeletons />}>
      <EmployeeManagementList />
    </Suspense>
  )
}

export default EmployeeManagement 