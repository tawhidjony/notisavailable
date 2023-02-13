import EditDesignation from "components/Admin/SystemConfiguration/Disignation/Edit"


type Props = {}

const Designation = (props: Props) => {
  return (
    <EditDesignation />
  )
}

export async function getServerSideProps(context: any) {
  return { props: {}, }
}

export default Designation