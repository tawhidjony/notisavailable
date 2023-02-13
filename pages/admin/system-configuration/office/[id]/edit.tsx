import EditOffice from "components/Admin/SystemConfiguration/Office/Edit";

type Props = {}

const Edit = (props: Props) => {
  return (
    <EditOffice />
  )
}

export async function getServerSideProps(context: any) {
  return { props: {}, }
}

export default Edit