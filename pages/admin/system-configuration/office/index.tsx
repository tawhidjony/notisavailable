import React, { Suspense } from "react";
import Skeletons from "../../../../components/Admin/Skeletons";
const OfficeList = React.lazy(() => import('components/Admin/SystemConfiguration/Office/List'));

type Props = {}

const Office = (props: Props) => {
  return (
    <Suspense fallback={<Skeletons />} >
      <OfficeList />
    </Suspense>
  )
}

export default Office