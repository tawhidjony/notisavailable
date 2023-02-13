import * as yup from "yup";

export const panelSearchSchema = yup.object({
    districtId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }).nullable(),
    upazilaId: yup.object({ label: yup.string().nullable(), value: yup.string().nullable() }).nullable(),
    centerName: yup.object().shape({ label: yup.string().nullable().required(), value: yup.string().nullable().required() }).nullable().required(),
    centerCode: yup.object().shape({ label: yup.string().nullable().required(), value: yup.string().nullable().required() }).nullable().required(),
    session: yup.object().shape({ label: yup.string().nullable().required(), value: yup.string().nullable().required() }).nullable().required(),
})