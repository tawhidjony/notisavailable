import * as yup from "yup";

export const panelSearchSchema = yup.object({
  status: yup.string().nullable(),
  divisionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  districtId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
}).required()
export const createSchemaValidation = yup.object({
  name_en: yup.string().required("Name (English) is required"),
  name_bn: yup.string().required("Name Bangla) is required"),
  divisionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  districtId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
}).required()


export const updateSchemaValidation = yup.object({
  name_en: yup.string().required("Name (English) is required"),
  name_bn: yup.string().required("Name (Bangla) is required"),
  status: yup.number().required("Status is required"),
  divisionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  districtId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
}).required()