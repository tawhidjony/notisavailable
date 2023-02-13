
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse, RTKTransformResponseShow } from 'Utils/HttpClient'


export const resourceCenterApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['resourcecenter'] }).injectEndpoints({
  endpoints: builder => ({

    getResourcecenter: builder.query<any, any | void>({
      query: (params: any) => {
        return {
          url: `/admin/resourcecenter`,
          params,
        }
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
      providesTags: ['resourcecenter']
    }),


    createResourcecenter: builder.mutation<void, any>({
      query: (data) => ({
        url: '/admin/resourcecenter',
        method: 'POST',
        body: data
      }),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['resourcecenter']

    }),


    showResourceCenter: builder.query({
      query: (id) => `/admin/resourcecenter/${id}`,
      transformResponse: (res: any) => RTKTransformResponseShow(res.response.data),
      providesTags: ['resourcecenter']
    }),

    updateResourceCenter: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/resourcecenter/${id}`,
        method: "PUT",
        body: data
      }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['resourcecenter']
    }),


    deleteresourceLearningtype: builder.mutation({
      query: (id) => ({
        url: `/admin/resourcecenter/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (res: any) => RTKTransformResponseShow(res.response),
      invalidatesTags: ['resourcecenter']
    }),

    exportToResourcePDF: builder.mutation({
      queryFn: async (data, api, extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: `/admin/resourcecenter/pdf?${data.panelSearch}`,
          method: 'POST',
          body: data,
          responseHandler: ((response) => response.blob())
        })
        const hiddenElement = document.createElement('a')
        const url = window.URL || window.webkitURL
        const blobPDF = url.createObjectURL(result.data)
        hiddenElement.href = blobPDF
        hiddenElement.target = '_blank'
        hiddenElement.download = `Resource_Center_List.pdf`
        hiddenElement.click()
        return { data: null }
      }
    }),

    exportToResourceCenterExcel: builder.mutation({
      queryFn: async (data, api, extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: `/admin/resourcecenter/excel?${data.panelSearch}`,
          method: 'POST',
          body: data,
          responseHandler: ((response) => response.blob())
        })
        const hiddenElement = document.createElement('a');
        const url = window.URL || window.webkitURL;
        const blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = '_blank';
        hiddenElement.download = `Resource_center_list.xlsx`;
        hiddenElement.click();
        return { data: null }
      }
    })

  }),
  overrideExisting: true,
})


export const {
  useGetResourcecenterQuery,
  useCreateResourcecenterMutation,
  useDeleteresourceLearningtypeMutation,
  useShowResourceCenterQuery,
  useUpdateResourceCenterMutation,
  useExportToResourcePDFMutation,
  useExportToResourceCenterExcelMutation
} = resourceCenterApiSlice

