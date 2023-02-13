
type Props = {}

const errorMessage = (props: any) => {
  const { errors } = props && props
  const names: any = [];
  const messages: any = [];
  errors.forEach((data: any) => {
    names.push(data.field)
    messages.push(data.message)
  })

  return { names, messages }
}

export default errorMessage