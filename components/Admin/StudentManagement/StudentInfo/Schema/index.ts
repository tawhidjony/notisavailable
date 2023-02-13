import * as yup from "yup";

export const createSchemaValidation = yup.object({
  learningcentertypeId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  learning_center_id: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  learningcentername: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  name_en: yup.string().required("This field is required"),
  name_bn: yup.string().required("This field is required"),
  roll_number: yup.string().required("This field is required"),
  dob: yup.string().required("This field is required"),
  age: yup.string().required("This field is required"),
  bcn: yup.string().required("This field is required"),
  nid: yup.string().required("This field is required"),
  sessionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  divisionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  districtId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  upazilaId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  union: yup.string().nullable(),
  ward: yup.string().nullable(),
  village: yup.string().nullable(),
  doa: yup.string().required("This field is required"),
  bloodgroupId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  gender_id: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  is_another_institute: yup.boolean().nullable(),
  institute_name: yup.string().nullable(),
  profession: yup.string().required("This field is required"),
  father_name_bn: yup.string().required("This field is required"),
  father_name_en: yup.string().required("This field is required"),
  father_nid: yup.string().required("This field is required"),
  father_occupation: yup.string().nullable(),
  father_mobile: yup.string().required("This field is required"),
  mother_name_bn: yup.string().required("This field is required"),
  mother_name_en: yup.string().required("This field is required"),
  mother_nid: yup.string().nullable(),
  mother_occupation: yup.string().nullable(),
  mother_mobile: yup.string().nullable(),
  is_guardian_absent: yup.boolean().nullable(),
  guardian_name_bn: yup.string().when("is_guardian_absent", {
    is: true,
    then: yup.string().required("This field is required")
  }).nullable(),
  guardian_name_en: yup.string().when("is_guardian_absent", {
    is: true,
    then: yup.string().required("This field is required")
  }).nullable(),
  guardian_mobile: yup.string().when("is_guardian_absent", {
    is: true,
    then: yup.string().required("This field is required")
  }).nullable(),
  guardian_occupation: yup.string().nullable(),
  guardian_nid: yup.string().nullable(),
  photo: yup.mixed().nullable(),

}).required()
export const updateSchemaValidation = yup.object({
  learningcentertypeId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  learning_center_id: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  learningcentername: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  name_en: yup.string().required("This field is required"),
  name_bn: yup.string().required("This field is required"),
  roll_number: yup.string().required("This field is required"),
  dob: yup.string().required("This field is required"),
  age: yup.string().required("This field is required"),
  bcn: yup.string().required("This field is required"),
  nid: yup.string().required("This field is required"),
  sessionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  divisionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  districtId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  upazilaId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  union: yup.string().nullable(),
  ward: yup.string().nullable(),
  village: yup.string().nullable(),
  doa: yup.string().required("This field is required"),
  bloodgroupId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  gender_id: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  is_another_institute: yup.boolean().nullable(),
  institute_name: yup.string().nullable(),
  profession: yup.string().required("This field is required"),
  father_name_bn: yup.string().required("This field is required"),
  father_name_en: yup.string().required("This field is required"),
  father_nid: yup.string().required("This field is required"),
  father_occupation: yup.string().nullable(),
  father_mobile: yup.string().required("This field is required"),
  mother_name_bn: yup.string().required("This field is required"),
  mother_name_en: yup.string().required("This field is required"),
  mother_nid: yup.string().nullable(),
  mother_occupation: yup.string().nullable(),
  mother_mobile: yup.string().nullable(),
  is_guardian_absent: yup.boolean().nullable(),
  guardian_name_bn: yup.string().when("is_guardian_absent", {
    is: true,
    then: yup.string().required("This field is required")
  }).nullable(),
  guardian_name_en: yup.string().when("is_guardian_absent", {
    is: true,
    then: yup.string().required("This field is required")
  }).nullable(),
  guardian_mobile: yup.string().when("is_guardian_absent", {
    is: true,
    then: yup.string().required("This field is required")
  }).nullable(),
  guardian_occupation: yup.string().nullable(),
  guardian_nid: yup.string().nullable(),
  photo: yup.mixed().nullable(),
  status: yup.number().required("This field is required"),

}).required()

export const panelSearchSchema = yup.object({
  division_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  district_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  upazila_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  center_type_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  center_code_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  center_name_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  name_bn_search: yup.string().nullable(),
  name_en_search: yup.string().nullable(),
  roll_number_search: yup.string().nullable(),
  status: yup.string().nullable(),

}).required()

export const panelSearchSchemaPrimary = yup.object({
  division_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  district_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  upazila_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  center_type_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  center_code_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  center_name_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  session: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
}).required()