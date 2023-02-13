
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse, RTKTransformResponseShow } from 'Utils/HttpClient';


export const upazilaSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['upazila'] }).injectEndpoints({
  endpoints: builder => ({
    getUpazila: builder.query<any, any | void>({
      query: (params: any) => {
        return {
          url: `/admin/upazila`,
          params,
        };
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['upazila']
    }),
    getUpazilaList: builder.query<any, any | void>({
      query: (params: any) => {
        return {
          url: `/admin/upazila/list`,
          params
        }
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['upazila']
    }),

    createUpazila: builder.mutation({
      query: (data) => ({ url: '/admin/upazila', method: 'POST', body: data }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['upazila']
    }),
    updateUpazila: builder.mutation({
      query: ({ id, ...data }) => ({ url: '/admin/upazila/' + id, method: 'PUT', body: data }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['upazila']
    }),

    showUpazila: builder.query({
      query: (id) => `/admin/upazila/${id}`,
      transformResponse: (res: any) => RTKTransformResponseShow(res.response),
      providesTags: ['upazila'],

    }),

    deleteUpazila: builder.mutation({
      query: (id) => ({
        url: `/admin/upazila/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['upazila']
    }),

  }),
  overrideExisting: true,
})


export const {
  useGetUpazilaQuery,
  useGetUpazilaListQuery,
  useShowUpazilaQuery,
  useCreateUpazilaMutation,
  useUpdateUpazilaMutation,
  useDeleteUpazilaMutation
} = upazilaSlice
