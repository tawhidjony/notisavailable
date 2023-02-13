
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse, RTKTransformResponseShow } from 'Utils/HttpClient';


export const teacherInfoApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['TeacherInfo'] }).injectEndpoints({
  endpoints: builder => ({

    getTeacherInfo: builder.query<any, void>({
      query: (params: any) => {
        return {
          url: `/admin/teacher`,
          params,
        };
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
      providesTags: ['TeacherInfo']
    }),
    getTeacherInfoList: builder.query<any, void>({
      query: (params: any) => {
        return {
          url: `/admin/teacher/list`,
          params,
        };
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
      providesTags: ['TeacherInfo']
    }),

    createTeacherInfo: builder.mutation({
      query: (data) => ({ url: '/admin/teacher', method: 'POST', body: data }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['TeacherInfo']
    }),

    updateTeacherInfo: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/teacher/${id}`,
        method: "PUT",
        body: data
      }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['TeacherInfo']
    }),

    showTeacherInfo: builder.query({
      query: (id) => `/admin/teacher/${id}`,
      transformResponse: (res: any) => RTKTransformResponseShow(res.response.data),
      providesTags: ['TeacherInfo']
    }),

    deleteTeacherInfo: builder.mutation({
      query: (id) => ({
        url: `/admin/teacher/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (res: any) => RTKTransformResponseShow(res.response),
      invalidatesTags: ['TeacherInfo']
    }),

    exportToTeacherPDF: builder.mutation({
      queryFn: async (data, api, extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: `/admin/teacher/pdf?${data.panelSearch}`,
          method: 'POST',
          body: data,
          responseHandler: ((response) => response.blob())
        })
        const hiddenElement = document.createElement('a');
        const url = window.URL || window.webkitURL;
        const blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = '_blank';
        hiddenElement.download = `Teacher.pdf`;
        hiddenElement.click();
        return { data: null }
      }
    }),
    exportToTeacherExcel: builder.mutation({
      queryFn: async (data, api, extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: `/admin/teacher/excel?${data.panelSearch}`,
          method: 'POST',
          body: data,
          responseHandler: ((response) => response.blob())
        })
        const hiddenElement = document.createElement('a');
        const url = window.URL || window.webkitURL;
        const blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = '_blank';
        hiddenElement.download = `Teacher_list.xlsx`;
        hiddenElement.click();
        return { data: null }
      }
    })
  }),
  overrideExisting: true,
})

export const {
  useGetTeacherInfoQuery,
  useGetTeacherInfoListQuery,
  useCreateTeacherInfoMutation,
  useUpdateTeacherInfoMutation,
  useShowTeacherInfoQuery,
  useDeleteTeacherInfoMutation,
  useExportToTeacherPDFMutation,
  useExportToTeacherExcelMutation
} = teacherInfoApiSlice
