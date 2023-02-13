import React, { Suspense } from "react";
import Skeletons from "../../../../components/Admin/Skeletons";
const OfficeTypeList = React.lazy(() => import('components/Admin/SystemConfiguration/OfficeType/List'));

type Props = {}

const OfficeType = (props: Props) => {
  return (
    <Suspense fallback={<Skeletons />} >
      <OfficeTypeList />
    </Suspense>
  )
}

export default OfficeType