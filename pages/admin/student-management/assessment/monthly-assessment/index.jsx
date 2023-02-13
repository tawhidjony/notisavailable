import React, { Suspense } from "react";
import Skeletons from "../../../../../components/Admin/Skeletons";
const AddMonthlyAssessment = React.lazy(() =>
  import(
    "../../../../../components/Admin/StudentManagement/Assessment/MonthlyAssessment/Add"
  )
);

const MonthlyAssessment = () => {
  return (
    <Suspense fallback={<Skeletons />}>
      <AddMonthlyAssessment />
    </Suspense>
  );
};

export default MonthlyAssessment;
