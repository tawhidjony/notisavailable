import EditDistrict from "components/Admin/SystemConfiguration/District/Edit";

type Props = {}

const Edit = (props: Props) => {
  return (
    <EditDistrict />
  )
}

export async function getServerSideProps(context: any) {
  return { props: {}, }
}

export default Edit