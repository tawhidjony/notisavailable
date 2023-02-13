import React, { Suspense } from "react";
import Skeletons from "../../../../components/Admin/Skeletons";
const UpazilaList = React.lazy(() => import('components/Admin/SystemConfiguration/Upazila/List'));

type Props = {}

const Upazila = (props: Props) => {
  return (

    <Suspense fallback={<Skeletons length={20} />} >
      <UpazilaList />
    </Suspense>
  )
}

export default Upazila