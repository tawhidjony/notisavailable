
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse, RTKTransformResponseShow } from 'Utils/HttpClient';


export const learningCenterApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['LearningCenter'] }).injectEndpoints({

  endpoints: builder => ({
    getLearningcenter: builder.query<any, any | void>({
      query: (params: any) => {
        return {
          url: `/admin/center`,
          params,
        };
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
      providesTags: ['LearningCenter']
    }),

    getLearningCenterList: builder.query<any, any | void>({
      query: (params: any) => {
        return {
          url: `/admin/center/list`,
          params
        }
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['LearningCenter']
    }),

    createLearningcenter: builder.mutation<void, any>({
      query: (data) => ({
        url: '/admin/center',
        method: 'POST',
        body: data
      }),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['LearningCenter']

    }),

    updateLearningCenter: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/center/${id}`,
        method: "PUT",
        body: data
      }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['LearningCenter']
    }),

    showLearningCenter: builder.query({
      query: (id) => `/admin/center/${id}`,
      transformResponse: (res: any) => RTKTransformResponseShow(res.response.data),
      providesTags: ['LearningCenter']
    }),


    deleteLearningcenter: builder.mutation({
      query: (id) => ({
        url: `/admin/center/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (res: any) => RTKTransformResponseShow(res.response),
      invalidatesTags: ['LearningCenter']
    }),

    exportToEducationPDF: builder.mutation({
      queryFn: async (data, api, extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: `/admin/center/pdf?${data.panelSearch}`,
          method: 'POST',
          body: data,
          responseHandler: ((response) => response.blob())
        })
        const hiddenElement = document.createElement('a');
        const url = window.URL || window.webkitURL;
        const blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = '_blank';
        hiddenElement.download = `Education_Center_List.pdf`;
        hiddenElement.click();
        return { data: null }
      }
    }),

    exportToLearningCenterExcel: builder.mutation({
      queryFn: async (data, api, extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: `/admin/center/excel?${data.panelSearch}`,
          method: 'POST',
          body: data,
          responseHandler: ((response) => response.blob())
        })
        const hiddenElement = document.createElement('a');
        const url = window.URL || window.webkitURL;
        const blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = '_blank';
        hiddenElement.download = `Learning_center_list.xlsx`;
        hiddenElement.click();
        return { data: null }
      }
    })


  }),

  overrideExisting: true,
})


export const {
  useGetLearningcenterQuery,
  useGetLearningCenterListQuery,
  useCreateLearningcenterMutation,
  useShowLearningCenterQuery,
  useDeleteLearningcenterMutation,
  useUpdateLearningCenterMutation,
  useExportToEducationPDFMutation,
  useExportToLearningCenterExcelMutation
} = learningCenterApiSlice
