import EditDivision from "components/Admin/SystemConfiguration/Division/Edit";

type Props = {
  id: string
}

const Edit = (props: Props) => {

  return (
    <EditDivision propsData={props} />
  )
}

export async function getServerSideProps(context: any) {
  const ctx = context.query
  return {
    props: {
      id: ctx.id
    },
  }
}

export default Edit