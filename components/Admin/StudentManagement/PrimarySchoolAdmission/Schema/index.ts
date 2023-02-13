import * as yup from "yup";

export const panelSearchSchema = yup.object({
  division: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  district: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  upazila: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  center_code: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  center_name: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
  session: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }),
});