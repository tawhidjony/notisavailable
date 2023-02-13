import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material"
import { Box } from "@mui/system"
import { useSavePrimaryAdmissionsMutation } from "Api/StudentManagement/PrimaryAdmission"
import FormInputBootstrap from "components/common/FormItem/FormInputBootstrap"
import FormSelect from "components/common/FormItem/FormSelect"
import { useHotNotification } from "context/HotNotificationProvider"
import { useEffect } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
type Props = {
  studentList: any,
  params: any
}

const CreateAdmission = (props: Props) => {
  const { setVisible, setNotification } = useHotNotification()
  const { studentList, params } = props
  const [createPrimaryAdmissionMultiple] = useSavePrimaryAdmissionsMutation();

  const primaryAdmissionInfos = studentList?.map((data: any) => {
    let primaryAdmissionCheck = data?.primaryAdmission?.length
    let primaryAdmissionInfo = data?.primaryAdmission?.find((admission: any) => admission?.studentId === data.id && admission.sessionId === data.sessionId)
    if (!primaryAdmissionCheck) {
      return {
        studentId: data?.id,
        name_en: data?.name_bn,
        father_name: data?.father_name_bn,
        mother_name: data?.mother_name_bn,
        village: data?.village,
        roll_number: data?.roll_number
      }
    } else {
      return {
        studentId: data?.id,
        name_en: data?.name_bn,
        father_name: data?.father_name_bn,
        mother_name: data?.mother_name_bn,
        village: data?.village,
        roll_number: data?.roll_number,
        institute_name: primaryAdmissionInfo?.institute_name,
        admission_on: primaryAdmissionInfo?.admission_on,
      }
    }
  })


  const methods = useForm({
    defaultValues: {
      primaryAdmissions: primaryAdmissionInfos
    }
  })

  const { control, reset, watch, setValue } = methods
  const { fields } = useFieldArray({ control, name: "primaryAdmissions" });

  const primaryAdmissionSubmit = async (item: any) => {
    let modifyData = item?.primaryAdmissions?.map((val: any) => {
      return {
        studentId: val?.studentId,
        sessionId: params?.sessionId,
        learningCenterId: params?.learning_center_id,
        institute_name: val?.institute_name,
        admission_on: val?.admission_on,
      }
    })

    try {
      await createPrimaryAdmissionMultiple(modifyData).unwrap().then((res: any) => {
        if (res) {
          setVisible(true);
          setNotification({
            autoClose: true,
          })
        }
      })
    } catch (error) {

    }
  }

  useEffect(() => {
    reset({
      primaryAdmissions: primaryAdmissionInfos
    })
  }, [reset, studentList])

  const admissionClasses = [
    { name: "1st class", id: "1st class" },
    { name: "2nd class", id: "2nd class" }
  ];

  return (
    <FormProvider {...methods} >
      {studentList?.length !== undefined ? (<>
        <Paper className="paperBody">
          <Box className="tableField tableSpacing" sx={{ padding: '10px' }} component="form" onSubmit={methods.handleSubmit(primaryAdmissionSubmit)}>
            <TableContainer className='tableContentField' >

              <Table className='table'>
                <TableHead>
                  <TableRow>
                    <TableCell className="TableHead" width={'2%'} >
                      SL
                    </TableCell>
                    <TableCell className="TableHead" width={'8%'} >
                      Student Name
                    </TableCell>
                    <TableCell className="TableHead" width={'7%'} >
                      Father Name
                    </TableCell>
                    <TableCell className="TableHead" width={'7%'} >
                      Mother Name
                    </TableCell>
                    <TableCell className="TableHead" width={'5%'} >
                      Roll No
                    </TableCell>
                    <TableCell className="TableHead" width={'7%'} >
                      Village Name
                    </TableCell>
                    <TableCell className="TableHead" width={'20%'} >
                      Admitted Institution Name
                    </TableCell>
                    <TableCell className="TableHead" width={'10%'} >
                      Admission on: 1st/2nd class
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((val: any, index: any) => (
                    <TableRow key={val.id}>
                      <TableCell className="TableContent">{index + 1}</TableCell>
                      <TableCell className="TableContent">
                        {val.name_en}
                      </TableCell>
                      <TableCell className="TableContent">{val.father_name}</TableCell>
                      <TableCell className="TableContent">{val.mother_name}</TableCell>
                      <TableCell className="TableContent">{val.roll_number}</TableCell>
                      <TableCell className="TableContent">{val.village}</TableCell>
                      <TableCell className="TableContent">
                        <FormInputBootstrap type="text" name={`primaryAdmissions.${index}.institute_name`} placeholder='Admitted Institution Name' />
                      </TableCell>
                      <TableCell className="TableContent">
                        <FormSelect name={`primaryAdmissions.${index}.admission_on`} defaultValue={1} size="small" id='Exam Name' dataSource={admissionClasses} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={14} sx={{ border: "none", padding: "0px" }} >
                      <Box sx={{ padding: '5px 0px', display: "flex", justifyContent: 'flex-end', alignItems: "center", gap: 1 }}  >
                        <Button type="submit" className="searchBtn">Reset</Button>
                        <Button type="submit" className="searchBtn" >Save as Draft</Button>
                        <Button type="submit" className="searchBtn">Save</Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        </Paper></>) : ""}
    </FormProvider>
  )
}

export default CreateAdmission