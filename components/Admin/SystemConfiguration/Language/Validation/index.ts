import * as yup from "yup";

export const createValidation = yup.object({
  title: yup.string().required("Title is required"),
  field_trans_en: yup.string().required("Field is required").min(3, "Field must be at least 3 digits"),
  field_trans_bn: yup.string().required("Field is required").min(3, "Field must be at least 3 digits"),
  moduleId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  submoduleId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  subchildmoduleId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  field_type: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
}).required()


export const updateValidation = yup.object({
  field_trans_en: yup.string().required("Field is required").min(3, "Field must be at least 3 digits"),
  field_trans_bn: yup.string().required("Field is required").min(3, "Field must be at least 3 digits"),
  title: yup.string().required("Title is required"),
  field_type: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  moduleId: yup.object({ label: yup.string().required("Required"), value: yup.string().required("Required") }),
  submoduleId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  subchildmoduleId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
}).required()