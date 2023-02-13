import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse } from 'Utils/HttpClient';
export const genderApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['Degree'] }).injectEndpoints({
  endpoints: builder => ({
    getDegreeList: builder.query<any, void>({
      query: () => `/admin/degree/list`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['Degree']
    }),
  }),
  overrideExisting: true,
})


export const {
  useGetDegreeListQuery
} = genderApiSlice
