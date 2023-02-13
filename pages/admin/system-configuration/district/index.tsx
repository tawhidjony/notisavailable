import Skeletons from "components/Admin/Skeletons";
import React, { Suspense } from "react";
const DistrictList = React.lazy(() => import('components/Admin/SystemConfiguration/District/List'));


const District = () => {
  return (
    <Suspense fallback={<Skeletons />} >
      <DistrictList />
    </Suspense>
  )
}

export default District