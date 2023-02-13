
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse, RTKTransformResponseShow } from 'Utils/HttpClient';


export const studentInfoApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['studentInfo', 'studentList'] }).injectEndpoints({
  endpoints: builder => ({
    getStudentInfo: builder.query<any, any | void>({
      query: (params: any) => {
        return {
          url: `/admin/student`,
          params,
        };
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
      providesTags: ['studentInfo']
    }),

    getStudentList: builder.query<any, any | void>({
      query: (params: any) => {
        return {
          url: `/admin/student/list`,
          params,
        };
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
      providesTags: ['studentList']
    }),

    createStudentInfo: builder.mutation({
      query: (data) => ({ url: '/admin/student', method: 'POST', body: data }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['studentInfo']
    }),
    updateStudentInfo: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/student/${id}`,
        method: "PUT",
        body: data
      }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['studentInfo']
    }),

    showStudentInfo: builder.query({
      query: (id) => `/admin/student/${id}`,
      transformResponse: (res: any) => RTKTransformResponseShow(res.response),
      providesTags: ['studentInfo']
    }),


    deleteStudentInfo: builder.mutation({
      query: (id) => ({
        url: `/admin/student/delete/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (res: any) => RTKTransformResponseShow(res.response),
      invalidatesTags: ['studentInfo']
    }),

    exportToStudentListPDF: builder.mutation({
      queryFn: async (data, api, extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: `/admin/student/pdf?${data.panelSearch}`,
          method: 'POST',
          body: data,
          responseHandler: ((response) => response.blob())
        })
        const hiddenElement = document.createElement('a');
        const url = window.URL || window.webkitURL;
        const blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = '_blank';
        hiddenElement.download = `Student_List.pdf`;
        hiddenElement.click();
        return { data: null }
      }
    }),
    exportToStudentExcel: builder.mutation({
      queryFn: async (data, api, extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: `/admin/student/excel?${data.panelSearch}`,
          method: 'POST',
          body: data,
          responseHandler: ((response) => response.blob())
        })
        const hiddenElement = document.createElement('a');
        const url = window.URL || window.webkitURL;
        const blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = '_blank';
        hiddenElement.download = `Student_list.xlsx`;
        hiddenElement.click();
        return { data: null }
      }
    })


  }),
  overrideExisting: true,
})


export const {
  useGetStudentInfoQuery,
  useShowStudentInfoQuery,
  useDeleteStudentInfoMutation,
  useCreateStudentInfoMutation,
  useUpdateStudentInfoMutation,
  useGetStudentListQuery,
  useExportToStudentListPDFMutation,
  useExportToStudentExcelMutation
} = studentInfoApiSlice

