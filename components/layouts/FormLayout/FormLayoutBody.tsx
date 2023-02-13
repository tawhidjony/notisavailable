import { Box } from '@mui/material'

type IProps = {
  children: React.ReactNode
}

const FormLayoutBody = ({ children }: IProps) => {
  return (<Box>{children}</Box>)
}

export default FormLayoutBody