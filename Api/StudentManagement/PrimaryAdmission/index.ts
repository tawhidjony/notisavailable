
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse, RTKTransformResponseShow } from 'Utils/HttpClient';


export const primaryAdmissionApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['primaryAdmission', 'primaryAdmissionInfo', 'studentList'] }).injectEndpoints({
    endpoints: builder => ({
        savePrimaryAdmissions: builder.mutation({
            query: (data) => ({ url: '/admin/primaryadmission/multiple', method: 'POST', body: data }),
            transformResponse: (res: any) => RTKTransformResponse(res.response),
            transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
            invalidatesTags: ["primaryAdmission", "primaryAdmissionInfo", "studentList"]
        }),

        getPrimaryAdmission: builder.query<any, any | void>({
            query: (params: any) => {
                return {
                    url: `/admin/primaryadmission`,
                    params,
                };
            },
            transformResponse: (res: any) => RTKTransformResponse(res.response),
            transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
            providesTags: ['primaryAdmission']
        }),

        showPrimaryAdmissionInfo: builder.query<any, any | void>({
            query: ({ centerId, sessionId }) => `/admin/primaryadmission/center/${centerId}/session/${sessionId}`,
            transformResponse: (res: any) => RTKTransformResponse(res.response),
            transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
            providesTags: ['primaryAdmissionInfo']
        }),

        deletePrimaryAdmissionInfo: builder.mutation({
            query: ({ centerId, sessionId }) => ({
                url: `/admin/primaryadmission/delete/center/${centerId}/session/${sessionId}`,
                method: 'DELETE',
            }),
            transformResponse: (res: any) => RTKTransformResponseShow(res.response),
            invalidatesTags: ["primaryAdmission", "primaryAdmissionInfo", "studentList"]
        }),

        exportToPrimaryAdmissionListPDF: builder.mutation({
            queryFn: async (data, api, extraOptions, baseQuery) => {
                const result: any = await baseQuery({
                    url: `/admin/primaryadmission/pdf?${data.panelSearch}`,
                    method: 'POST',
                    body: data,
                    responseHandler: ((response) => response.blob())
                })
                const hiddenElement = document.createElement('a');
                const url = window.URL || window.webkitURL;
                const blobPDF = url.createObjectURL(result.data);
                hiddenElement.href = blobPDF;
                hiddenElement.target = '_blank';
                hiddenElement.download = `Primary_Admission_Center_List.pdf`;
                hiddenElement.click();
                return { data: null }
            }
        }),

        exportToPrimaryAdmissionListExcel: builder.mutation({
            queryFn: async (data, api, extraOptions, baseQuery) => {
                const result: any = await baseQuery({
                    url: `/admin/primaryadmission/excel?${data.panelSearch}`,
                    method: 'POST',
                    body: data,
                    responseHandler: ((response) => response.blob())
                })
                const hiddenElement = document.createElement('a');
                const url = window.URL || window.webkitURL;
                const blobPDF = url.createObjectURL(result.data);
                hiddenElement.href = blobPDF;
                hiddenElement.target = '_blank';
                hiddenElement.download = `Primary_Admission_Center_List.xlsx`;
                hiddenElement.click();
                return { data: null }
            }
        }),

    }),
    overrideExisting: true,
})


export const {
    useSavePrimaryAdmissionsMutation,
    useGetPrimaryAdmissionQuery,
    useShowPrimaryAdmissionInfoQuery,
    useDeletePrimaryAdmissionInfoMutation,
    useExportToPrimaryAdmissionListPDFMutation,
    useExportToPrimaryAdmissionListExcelMutation
} = primaryAdmissionApiSlice;