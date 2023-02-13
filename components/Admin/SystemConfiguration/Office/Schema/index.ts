import * as yup from "yup";

export const panelSearchSchema = yup.object({
  status: yup.string().nullable(),
  officetypeId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  divisionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  districtId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  upazilaId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
}).required()

export const createSchemaValidation = yup.object({
  name_en: yup.string().required("Name is required"),
  name_bn: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  officetypeId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  divisionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  districtId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  upazilaId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
}).required()


export const updateSchemaValidation = yup.object({
  name_en: yup.string().required("Name is required"),
  name_bn: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  status: yup.number().required("Status is required"),
  officetypeId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  divisionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  districtId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  upazilaId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
}).required()