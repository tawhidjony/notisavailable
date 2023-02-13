import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse, RTKTransformResponseShow } from 'Utils/HttpClient';

export const districtApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['District'] }).injectEndpoints({
  endpoints: builder => ({
    getDistricts: builder.query<any, any | void>({
      query: (params: any) => {
        return {
          url: `/admin/district`,
          params,
        };
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
      providesTags: ['District']
    }),

    getDistrictList: builder.query<any, any | void>({
      query: (params: any) => {
        return {
          url: `/admin/district/list`,
          params
        }
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['District']
    }),

    createDistrict: builder.mutation({
      query: (data) => ({ url: '/admin/district', method: 'POST', body: data }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['District']
    }),

    updateDistrict: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/district/${id}`,
        method: "PUT",
        body: data
      }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['District']
    }),

    statusDistrict: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/district/status/${id}`,
        method: "PATCH",
        body: data
      }),
    }),

    showDistrict: builder.query({
      query: (id) => `/admin/district/${id}`,
      transformResponse: (res: any) => RTKTransformResponseShow(res.response),
      providesTags: ['District']
    }),

    deleteDistrict: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/district/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['District']
    }),

  }),
  overrideExisting: true,
})


export const {
  useGetDistrictsQuery,
  useGetDistrictListQuery,
  useCreateDistrictMutation,
  useUpdateDistrictMutation,
  useStatusDistrictMutation,
  useShowDistrictQuery,
  useDeleteDistrictMutation
} = districtApiSlice
