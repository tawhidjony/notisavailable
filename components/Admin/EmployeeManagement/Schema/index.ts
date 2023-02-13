import * as yup from "yup";

export const panelSearchSchema = yup.object({
  status: yup.string().nullable(),
  employee_id: yup.string().nullable(),
  name_en: yup.string().nullable(),
  name_bn: yup.string().nullable(),
  nid: yup.string().nullable(),
  email: yup.string().nullable(),
  mobile: yup.string().nullable(),
  employeetypeId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }).nullable(),
  officeId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }).nullable(),
  designationId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }).nullable(),
}).required()

export const createValidation = yup.object({
  employee_id: yup.string().nullable(),
  name_en: yup.string().required("This field is required"),
  name_bn: yup.string().required("This field is required"),
  father_name: yup.string().required("This field is required"),
  mother_name: yup.string().required("This field is required"),
  nid: yup.string().required("This field is required"),
  join_date: yup.date().nullable(),
  email: yup.string().required("This field is required"),
  mobile: yup.string().required("This field is required"),
  address: yup.string().nullable(),

  officeId: yup.object({
    label: yup.string().required().nullable(),
    value: yup.string().required().nullable()
  }).required("This field is required").nullable(),

  employeetypeId: yup.object({
    label: yup.string().required().nullable(),
    value: yup.string().required().nullable()
  }).required("This field is required").nullable(),
  designationId: yup.object({
    label: yup.string().required().nullable(),
    value: yup.string().required().nullable()
  }).required("This field is required").nullable(),
  photo: yup.mixed().nullable(),

}).required()

export const updateValidation = yup.object({
  employee_id: yup.string().required("This field is required"),
  name_en: yup.string().required("This field is required"),
  name_bn: yup.string().required("This field is required"),
  father_name: yup.string().required("This field is required"),
  mother_name: yup.string().required("This field is required"),
  nid: yup.string().required("This field is required"),
  join_date: yup.string().required("This field is required"),
  email: yup.string().required("This field is required"),
  mobile: yup.string().required("This field is required"),
  address: yup.string().required("This field is required"),
  officeId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  employeetypeId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  designationId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  photo: yup.mixed().nullable(),
  status: yup.number().required("This field is required"),

}).required()
