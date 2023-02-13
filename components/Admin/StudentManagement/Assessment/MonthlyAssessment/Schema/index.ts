import * as yup from "yup";
export const panelSearchSchema = yup.object({
    session: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }).nullable(),
    month: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }).nullable(),
    district: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }).nullable(),
    upazilla: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }).nullable(),
    centerType: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }).nullable(),
    centerName: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }).nullable(),
    centerCode: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }).nullable()
});