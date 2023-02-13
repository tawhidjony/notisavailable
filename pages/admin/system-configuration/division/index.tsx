import { CircularProgress } from "@mui/material"
import dynamic from "next/dynamic"
import { Suspense } from "react"

const DivisionList = dynamic(() => import("components/Admin/SystemConfiguration/Division/List"), { suspense: true })

const Division = () => {
  return (
    <Suspense fallback={<CircularProgress />} >
      <DivisionList />
    </Suspense>
  )
}

export default Division