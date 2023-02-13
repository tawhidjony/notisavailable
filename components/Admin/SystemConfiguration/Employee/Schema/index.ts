import * as yup from "yup";

export const createSchemaValidation = yup.object({
  name_en: yup.string().required("Employee Type (English) is required"),
  name_bn: yup.string().required("Employee Type (Bangla) is required"),
}).required()


export const updateSchemaValidation = yup.object({
  name_en: yup.string().required("Employee Type (English) is required"),
  name_bn: yup.string().required("Employee Type (Bangla) is required"),
  status: yup.number().required("Status is required"),
}).required()