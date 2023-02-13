import EditUpazila from "components/Admin/SystemConfiguration/Upazila/Edit";

type Props = {}

const Edit = (props: Props) => {
  return (
    <EditUpazila />
  )
}

export async function getServerSideProps(context: any) {
  return { props: {}, }
}

export default Edit