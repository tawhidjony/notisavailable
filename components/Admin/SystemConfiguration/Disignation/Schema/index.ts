import * as yup from "yup";

export const createSchemaValidation = yup.object({
  name_en: yup.string().required("Name (English) is required"),
  name_bn: yup.string().required("Name (Bangla) is required"),
  priority: yup.number()
    .typeError("Priority is required")
    .required("Priority is required")
}).required()


export const updateSchemaValidation = yup.object({
  name_en: yup.string().required("FName is required"),
  name_bn: yup.string().required("Name is required"),
  priority: yup.number().typeError("Priority is required").required("Priority is required"),
  status: yup.string().required("Status is required"),
}).required()