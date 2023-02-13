import { tableQueryType } from 'Utils/GlobalTypes';
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse } from 'Utils/HttpClient';
export const ResourceCenterTypeApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['Resourcecentertype'] }).injectEndpoints({
  endpoints: builder => ({

    getResourceCentertypeList: builder.query<any, tableQueryType | void>({
      query: (params: tableQueryType) => `/admin/resourcecentertype?page=${params.page}&limit=${params.limitPerPage}`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['Resourcecentertype']
    }),

    getResourceCentertypeAllList: builder.query<any, void>({
      query: () => `/admin/resourcecentertype/list`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
      providesTags: ['Resourcecentertype']
    }),


  }),
  overrideExisting: true,
})


export const {
  useGetResourceCentertypeListQuery,
  useGetResourceCentertypeAllListQuery
} = ResourceCenterTypeApiSlice
