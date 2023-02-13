import { Box, Skeleton } from '@mui/material'
import { FC } from 'react'
type ISkeleton = {
  length?: number
}
const Skeletons: FC<ISkeleton> = ({ length }) => {
  return (<>
    {Array(length || 5).fill(0).map((value, index) => {
      return (<Box sx={{ marginBottom: "10px" }} key={index}>
        <Skeleton variant="rectangular" width={'100%'} height={20} />
      </Box>)
    })}
  </>)
}

export default Skeletons
