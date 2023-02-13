import * as yup from "yup";

export const createSchemaValidation = yup.object({
  name_en: yup.string().required("Office Type is required"),
  name_bn: yup.string().required("Office Type is required"),
}).required()


export const updateSchemaValidation = yup.object({
  name_en: yup.string().required("Office Type is required"),
  name_bn: yup.string().required("Office Type is required"),
  status: yup.number().required("Office Type is required"),
}).required()