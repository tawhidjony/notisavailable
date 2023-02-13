import Skeletons from "components/Admin/Skeletons";
import React, { Suspense } from "react";
const AddNewEmployeeManagement = React.lazy(() =>
  import(
    "components/Admin/EmployeeManagement/Add"
  )
);

type Props = {}

const CreateEmployeeManagement = (props: Props) => {
  return (
    <Suspense fallback={<Skeletons />}>
      <AddNewEmployeeManagement />
    </Suspense>
  )
}

export default CreateEmployeeManagement