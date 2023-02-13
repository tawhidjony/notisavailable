import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse } from 'Utils/HttpClient';

export const courseApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['Course'] }).injectEndpoints({
  endpoints: builder => ({
    getCourseList: builder.query<any, void>({
      query: () => `/admin/course/list`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['Course']
    }),

  }),
  overrideExisting: true,
})

export const {
  useGetCourseListQuery
} = courseApiSlice
