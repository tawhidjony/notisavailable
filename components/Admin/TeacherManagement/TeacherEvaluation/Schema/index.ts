import * as yup from "yup";

export const panelSearchSchema = yup.object({
  learning_center_id: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  divisionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  districtId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  upazilaId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
}).required()

export const createSchemaValidation = yup.object({
  name_en: yup.string().required("Name is required"),
  name_bn: yup.string().required("Name is required"),
  cluster_number: yup.string().required("Name is required"),
  nid: yup.string().required("Name is required"),
  father_name: yup.string().required("Name is required"),
  mother_name: yup.string().required("Name is required"),
  dob: yup.string().required("Name is required"),
  mobile: yup.string().required("Name is required"),
  doj: yup.string().required("Name is required"),
  start_time: yup.string().required("Name is required"),
  end_time: yup.string().required("Name is required"),
  area: yup.string().required("Name is required"),
  bank_name: yup.string().required("Name is required"),
  branch_name: yup.string().required("Name is required"),
  account: yup.string().required("Name is required"),
  routing: yup.string().required("Name is required"),
  nature: yup.string().required("Name is required"),
  training: yup.string().required("Name is required"),
  photo: yup.string().nullable(),
  gender_id: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  learning_center_id: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  course_id: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  divisionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  districtId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  upazilaId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  teacherEducations: yup.array()
}).required()


export const updateSchemaValidation = yup.object({
  name_en: yup.string().required("Name is required"),
  name_bn: yup.string().required("Name is required"),
  cluster_number: yup.string().required("Name is required"),
  nid: yup.string().required("Name is required"),
  father_name: yup.string().required("Name is required"),
  mother_name: yup.string().required("Name is required"),
  dob: yup.string().required("Name is required"),
  mobile: yup.string().required("Name is required"),
  doj: yup.string().required("Name is required"),
  start_time: yup.string().required("Name is required"),
  end_time: yup.string().required("Name is required"),
  area: yup.string().required("Name is required"),
  bank_name: yup.string().required("Name is required"),
  branch_name: yup.string().required("Name is required"),
  account: yup.string().required("Name is required"),
  routing: yup.string().required("Name is required"),
  nature: yup.string().required("Name is required"),
  training: yup.string().required("Name is required"),
  photo: yup.string().nullable(),
  gender_id: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  learning_center_id: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  course_id: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  divisionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  districtId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  upazilaId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  status: yup.number().required("Status is required"),
  teacherEducations: yup.array()
}).required()