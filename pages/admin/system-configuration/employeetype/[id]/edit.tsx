import EditEmployeeType from "components/Admin/SystemConfiguration/Employee/Edit";

type Props = {}

const Edit = (props: Props) => {
  return (
    <EditEmployeeType />
  )
}

export async function getServerSideProps(context: any) {
  return { props: {}, }
}

export default Edit