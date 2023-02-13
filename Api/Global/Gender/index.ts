import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse } from 'Utils/HttpClient';
export const genderApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['Gender'] }).injectEndpoints({
  endpoints: builder => ({
    getGender: builder.query<any, any | void>({
      query: (params: any) => {
        return {
          url: `/admin/gender`,
          params,
        };
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
      providesTags: ['Gender']
    }),

    getGenderList: builder.query<any, void>({
      query: () => `/admin/gender/list`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['Gender']
    }),

  }),
  overrideExisting: true,
})


export const {
  useGetGenderQuery,
  useGetGenderListQuery
} = genderApiSlice
