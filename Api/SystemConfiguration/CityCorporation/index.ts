
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse } from 'Utils/HttpClient';


export const cityCorporationApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['cityCorporation'] }).injectEndpoints({
  endpoints: builder => ({
    // getCityCorporationList: builder.query<any, void>({
    //   query: () => `/admin/citycorporation/list`,
    //   transformResponse: (res: any) => RTKTransformResponse(res.response),
    //   transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
    //   providesTags: ['cityCorporation']
    // }),

    getCityCorporationList: builder.query<any, any | void>({
      query: (params: any) => {
        return {
          url: `/admin/citycorporation/list`,
          params
        }
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['cityCorporation']
    }),


  }),
  overrideExisting: true,
})


export const {
  useGetCityCorporationListQuery,
} = cityCorporationApiSlice

