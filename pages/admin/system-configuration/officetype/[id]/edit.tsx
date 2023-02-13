import EditOfficeType from "components/Admin/SystemConfiguration/OfficeType/Edit";

type Props = {}

const Edit = (props: Props) => {
  return (
    <EditOfficeType />
  )
}

export async function getServerSideProps(context: any) {
  return { props: {}, }
}

export default Edit