import { useCallback, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'


const usePrintHook = () => {
  const componentRef = useRef(null)

  const handleClickToPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "React Print Islamic Foundation",
    onAfterPrint: () => alert("Print Success")
  })

  const ReactPrintButton = useCallback(() => {
    return handleClickToPrint()
  }, [])

  return { componentRef, handleClickToPrint, ReactPrintButton }
}

export default usePrintHook