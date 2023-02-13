import { Box } from "@mui/material";
import React, { Suspense } from "react";
import Skeletons from "../../../../components/Admin/Skeletons";
const LearningCenterList = React.lazy(() => import('components/Admin/Center/LearningCenter/List'));


type Props = {}

const LearningCenter = (props: Props) => {
  return (
    <Box>
      <Suspense fallback={<Skeletons />} >
        <LearningCenterList />
      </Suspense>
    </Box>
  )
}

export default LearningCenter