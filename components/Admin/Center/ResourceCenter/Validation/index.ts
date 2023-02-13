import * as yup from "yup";

export const createValidation = yup.object({
  code: yup.string().required("This field is required"),
  name_en: yup.string().required("This field is required"),
  name_bn: yup.string().required("This field is required"),
  description: yup.string().nullable(),
  resourcecentertypeId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  latitude: yup.string().nullable(),
  longitude: yup.string().nullable(),
  divisionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  districtId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  upazilaId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  union: yup.string().nullable(),
  area: yup.string().nullable(),
  address: yup.string().nullable(),
  citycorporationId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  type: yup.string().nullable(),
  photo: yup.mixed().nullable()
}).required()

export const updateValidation = yup.object({
  code: yup.string().required("This field is required"),
  name_en: yup.string().required("This field is required"),
  name_bn: yup.string().required("This field is required"),
  description: yup.string().nullable(),
  resourcecentertypeId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  latitude: yup.string().nullable(),
  longitude: yup.string().nullable(),
  divisionId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  districtId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  upazilaId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  union: yup.string().nullable(),
  area: yup.string().nullable(),
  address: yup.string().nullable(),
  citycorporationId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  type: yup.string().nullable(),
  photo: yup.mixed().nullable(),
  status: yup.string()
}).required()


export const panelSearchSchema = yup.object({
  code_search: yup.string().nullable(),
  name_bn_search: yup.string().nullable(),
  division_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  district_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  upazila_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  citycorporation_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  resourcecentertype_search: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  status_search: yup.string().nullable(),
}).required()
