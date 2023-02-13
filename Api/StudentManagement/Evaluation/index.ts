
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse } from 'Utils/HttpClient';


export const evaluationApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['studentevaluation'] }).injectEndpoints({
    endpoints: builder => ({
        createStudentMonthlyEvaluation: builder.mutation({
            query: (data) => ({ url: '/admin/studentevaluation/multiple', method: 'POST', body: data }),
            transformResponse: (res: any) => RTKTransformResponse(res.response),
            transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
            invalidatesTags: ['studentevaluation']
        }),
        getStudentYearlyEvaluation: builder.query<any, any | void>({
            query: (params: any) => {
                return {
                    url: `/admin/student/yearlyevaluation`,
                    params,
                };
            },
            transformResponse: (res: any) => RTKTransformResponse(res.response),
            transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
        }),
        getStudentMonthlyEvaluation: builder.query<any, any | void>({
            query: (params: any) => {
                return {
                    url: `/admin/studentevaluation/centerwise-student-list`,
                    params,
                };
            },
            transformResponse: (res: any) => RTKTransformResponse(res.response),
            transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
        }),
        exportToStudentMonthlyEvaluationCenterPDF: builder.mutation({
            queryFn: async (data, api, extraOptions, baseQuery) => {
                const result: any = await baseQuery({
                    url: `/admin/studentevaluation/center/pdf?${data.panelSearch}`,
                    method: 'POST',
                    body: data,
                    responseHandler: ((response) => response.blob())
                })
                const hiddenElement = document.createElement('a');
                const url = window.URL || window.webkitURL;
                const blobPDF = url.createObjectURL(result.data);
                hiddenElement.href = blobPDF;
                hiddenElement.target = '_blank';
                hiddenElement.download = `Monthly_Evaluation-Center_List.pdf`;
                hiddenElement.click();
                return { data: null }
            }
        }),
        exportToStudentMonthlyEvaluationStudentPDF: builder.mutation({
            queryFn: async (data, api, extraOptions, baseQuery) => {
                const result: any = await baseQuery({
                    url: `/admin/studentevaluation/pdf?${data.panelSearch}`,
                    method: 'POST',
                    body: data,
                    responseHandler: ((response) => response.blob())
                })
                const hiddenElement = document.createElement('a');
                const url = window.URL || window.webkitURL;
                const blobPDF = url.createObjectURL(result.data);
                hiddenElement.href = blobPDF;
                hiddenElement.target = '_blank';
                hiddenElement.download = `Monthly_Evaluation_Student_List.pdf`;
                hiddenElement.click();
                return { data: null }
            }
        }),
        exportToStudentYearlyEvaluationPDF: builder.mutation({
            queryFn: async (data, api, extraOptions, baseQuery) => {
                const result: any = await baseQuery({
                    url: `/admin/student/yearlyevaluationpdf?${data.panelSearch}`,
                    method: 'POST',
                    body: data,
                    responseHandler: ((response) => response.blob())
                })
                const hiddenElement = document.createElement('a');
                const url = window.URL || window.webkitURL;
                const blobPDF = url.createObjectURL(result.data);
                hiddenElement.href = blobPDF;
                hiddenElement.target = '_blank';
                hiddenElement.download = `Yearly_Evaluation.pdf`;
                hiddenElement.click();
                return { data: null }
            }
        }),
    }),
    overrideExisting: true,
})


export const {
    useCreateStudentMonthlyEvaluationMutation,
    useGetStudentYearlyEvaluationQuery,
    useExportToStudentYearlyEvaluationPDFMutation,
    useGetStudentMonthlyEvaluationQuery,
    useExportToStudentMonthlyEvaluationCenterPDFMutation,
    useExportToStudentMonthlyEvaluationStudentPDFMutation
} = evaluationApiSlice;

