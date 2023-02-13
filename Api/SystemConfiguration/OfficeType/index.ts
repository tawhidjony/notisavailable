

import { tableQueryType } from 'Utils/GlobalTypes';
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse, RTKTransformResponseShow } from 'Utils/HttpClient';


export const officetypeSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['officetype'] }).injectEndpoints({
  endpoints: builder => ({
    getOfficetype: builder.query<any, tableQueryType | void>({
      query: (params: tableQueryType) => `/admin/officetype?page=${params.page}&limit=${params.limitPerPage}`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['officetype']

    }),

    getOfficeTypeList: builder.query<any, void>({
      query: () => `/admin/officetype/list`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
      providesTags: ['officetype']
    }),

    createOfficetype: builder.mutation({
      query: (data) => ({
        url: '/admin/officetype',
        method: 'POST',
        body: data
      }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['officetype']
    }),

    updateOfficeType: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/admin/officetype/${id}`, method: "PUT", body: data }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['officetype']
    }),

    statusOfficetype: builder.mutation({
      query: (id) => ({
        url: `/admin/officetype/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ['officetype']
    }),
    showOfficetype: builder.query({
      query: (id) => `/admin/officetype/${id}`,
      transformResponse: (res: any) => RTKTransformResponseShow(res.response),
      providesTags: [{ type: 'officetype' }],

    }),

    deleteOfficetype: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/officetype/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['officetype']
    }),

  }),
  overrideExisting: true,
})


export const {
  useGetOfficetypeQuery,
  useGetOfficeTypeListQuery,
  useCreateOfficetypeMutation,
  useStatusOfficetypeMutation,
  useShowOfficetypeQuery,
  useDeleteOfficetypeMutation,
  useUpdateOfficeTypeMutation
} = officetypeSlice
