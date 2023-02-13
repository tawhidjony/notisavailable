import React, { Suspense } from "react";
import Skeletons from "../../../../components/Admin/Skeletons";
const DesignationList = React.lazy(() => import('components/Admin/SystemConfiguration/Disignation/List'));


const Designation = () => {
  return (
    <Suspense fallback={<Skeletons />} >
      <DesignationList />
    </Suspense>
  )
};

export default Designation;
