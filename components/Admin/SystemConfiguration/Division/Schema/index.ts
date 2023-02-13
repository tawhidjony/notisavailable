import * as yup from "yup";

export const createSchemaValidation = yup.object({
  name_en: yup.string().required("Name ( english ) is required"),
  name_bn: yup.string().required("Name ( Bangla ) is required"),
}).required()


export const updateSchemaValidation = yup.object({
  name_en: yup.string().required("Name ( english ) is required"),
  name_bn: yup.string().required("Name ( Bangla ) is required"),
  status: yup.number().required("This field is required"),
}).required()