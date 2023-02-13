
import { tableQueryType } from 'Utils/GlobalTypes';
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse } from 'Utils/HttpClient';


export const placeSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['place'] }).injectEndpoints({
  endpoints: builder => ({
    getPlace: builder.query<any, tableQueryType | void>({
      query: (params: tableQueryType) => `/admin/place?page=${params.page}&limit=${params.limitPerPage}`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['place']
    }),



    getPlaceList: builder.query<any, void>({
      query: () => `/admin/place/list`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
      providesTags: ['place']
    }),


  }),
  overrideExisting: true,
})


export const {
  useGetPlaceQuery,
  useGetPlaceListQuery
} = placeSlice
