
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse, RTKTransformResponseShow } from 'Utils/HttpClient';


export const teacherTeacherEvaluation = HttpClient.enhanceEndpoints({ addTagTypes: ['TeacherEvaluation'] }).injectEndpoints({
  endpoints: builder => ({

    getTeacherEvaluation: builder.query<any, void>({
      query: (params: any) => {
        return {
          url: `admin/teacherevaluation/groups-list`,
          params,
        };
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
      providesTags: ['TeacherEvaluation']
    }),

    createTeacherEvaluationMultiple: builder.mutation({
      query: (data) => ({ url: '/admin/teacherevaluation/multiple', method: 'POST', body: data }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['TeacherEvaluation']
    }),
    showTeacherEvaluationSummery: builder.query({
      query: (params: any) => {
        return {
          url: "/admin/teacherevaluation",
          params
        }
      },
      transformResponse: (res: any) => RTKTransformResponseShow(res.response.data),
      providesTags: ['TeacherEvaluation']
    }),
    exportToTeacherEvaluationPDF: builder.mutation({
      queryFn: async (data, api, extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: `/admin/teacherevaluation/pdf?${data.panelSearch}`,
          method: 'POST',
          body: data,
          responseHandler: ((response) => response.blob())
        })
        const hiddenElement = document.createElement('a');
        const url = window.URL || window.webkitURL;
        const blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = '_blank';
        hiddenElement.download = `Teacher_Evaluation.pdf`;
        hiddenElement.click();
        return { data: null }
      }
    }),
    exportToTeacherEvaluationExcel: builder.mutation({
      queryFn: async (data, api, extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: `/admin/teacherevaluation/excel?${data.panelSearch}`,
          method: 'POST',
          body: data,
          responseHandler: ((response) => response.blob())
        })
        const hiddenElement = document.createElement('a');
        const url = window.URL || window.webkitURL;
        const blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = '_blank';
        hiddenElement.download = `Teacher_Evaluation.xlsx`;
        hiddenElement.click();
        return { data: null }
      }
    }),

  }),
  overrideExisting: true,
})

export const {
  useGetTeacherEvaluationQuery,
  useCreateTeacherEvaluationMultipleMutation,
  useShowTeacherEvaluationSummeryQuery,
  useExportToTeacherEvaluationPDFMutation,
  useExportToTeacherEvaluationExcelMutation
} = teacherTeacherEvaluation
