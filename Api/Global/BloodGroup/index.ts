import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse } from 'Utils/HttpClient';
export const bloodGroupApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['Blood'] }).injectEndpoints({
  endpoints: builder => ({
    getBloodGroup: builder.query<any, any | void>({
      query: (params: any) => {
        return {
          url: `/admin/bloodgroup`,
          params,
        };
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
      providesTags: ['Blood']
    }),

    getBloodGroupList: builder.query<any, void>({
      query: () => `/admin/bloodgroup/list`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['Blood']
    }),

  }),
  overrideExisting: true,
})


export const {
  useGetBloodGroupQuery,
  useGetBloodGroupListQuery
} = bloodGroupApiSlice
