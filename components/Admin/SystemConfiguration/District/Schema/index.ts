import * as yup from "yup";

export const panelSearchSchema = yup.object({
  name_bn_search: yup.string().nullable(),
  name_en_search: yup.string().nullable(),
  status: yup.string().nullable(),
  division_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
}).required()

export const createSchemaValidation = yup.object({
  name_en: yup.string().required("Name ( english ) is required"),
  name_bn: yup.string().required("Name ( Bangla ) is required"),
  divisionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
}).required()


export const updateSchemaValidation = yup.object({
  divisionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  name_en: yup.string().required("Name ( english ) is required"),
  name_bn: yup.string().required("Name ( Bangla ) is required"),
  status: yup.number().required("This field is required"),
}).required()
