import { Box } from "@mui/material";
import React, { Suspense } from "react";
import Skeletons from "../../../../components/Admin/Skeletons";
const ResourceCenterList = React.lazy(() => import('components/Admin/Center/ResourceCenter/List'));

type Props = {}

const Resourcecenter = (props: Props) => {
  return (
    <Box>
      <Suspense fallback={<Skeletons />} >
        <ResourceCenterList />
      </Suspense>
    </Box>
  )
}

export default Resourcecenter