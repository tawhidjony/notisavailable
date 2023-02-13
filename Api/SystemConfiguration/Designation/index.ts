
import { tableQueryType } from 'Utils/GlobalTypes';
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse, RTKTransformResponseShow } from 'Utils/HttpClient';


export const designationApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['Designation'] }).injectEndpoints({
  endpoints: builder => ({
    getDesignation: builder.query<any, tableQueryType | void>({
      query: (params: tableQueryType) => `/admin/designation?page=${params.page}&limit=${params.limitPerPage}`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['Designation']
    }),

    getDesignationList: builder.query<any, void>({
      query: () => `/admin/designation/list`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['Designation']
    }),

    createDesignation: builder.mutation({
      query: (data) => ({
        url: '/admin/designation',
        method: 'POST',
        body: data
      }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['Designation']
    }),

    updateDesignation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/designation/${id}`,
        method: "PUT",
        body: data
      }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['Designation']
    }),

    showDesignation: builder.query({
      query: (id) => `/admin/designation/${id}`,
      transformResponse: (res: any) => RTKTransformResponseShow(res.response),
      providesTags: ['Designation']
    }),

    deleteDesignation: builder.mutation({
      query: (id) => ({
        url: `/admin/designation/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Designation']
    }),
    exportToPDF: builder.mutation({
      queryFn: async (data, api, extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: '/admin/designation/pdf',
          method: 'POST',
          body: data,
          responseHandler: ((response) => response.blob())
        })
        const hiddenElement = document.createElement('a');
        const url = window.URL || window.webkitURL;
        const blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = '_blank';
        hiddenElement.download = `Designation.pdf`;
        hiddenElement.click();
        return { data: null }
      }
    }),
    exportToExcel: builder.mutation({
      queryFn: async (data, api, extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: '/admin/designation/excel',
          method: 'POST',
          body: data,
          responseHandler: ((response) => response.blob())
        })
        const hiddenElement = document.createElement('a');
        const url = window.URL || window.webkitURL;
        const blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = '_blank';
        hiddenElement.download = `Designation.xlsx`;
        hiddenElement.click();
        return { data: null }
      }
    })
  }),
  overrideExisting: true,
})


export const {
  useGetDesignationQuery,
  useGetDesignationListQuery,
  useCreateDesignationMutation,
  useUpdateDesignationMutation,
  useShowDesignationQuery,
  useDeleteDesignationMutation,
  useExportToPDFMutation,
  useExportToExcelMutation,

} = designationApiSlice

