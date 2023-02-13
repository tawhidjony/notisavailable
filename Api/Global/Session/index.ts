import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse } from 'Utils/HttpClient';
export const sessionApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['Session'] }).injectEndpoints({
  endpoints: builder => ({
    getSessions: builder.query<any, any | void>({
      query: (params: any) => {
        return {
          url: `/admin/session`,
          params,
        };
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
      providesTags: ['Session']
    }),

    getSessionList: builder.query<any, void>({
      query: () => `/admin/session/list`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['Session']
    }),

  }),
  overrideExisting: true,
})


export const {
  useGetSessionsQuery,
  useGetSessionListQuery
} = sessionApiSlice
