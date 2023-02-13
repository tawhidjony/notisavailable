
import { tableQueryType } from 'Utils/GlobalTypes';
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse, RTKTransformResponseShow } from 'Utils/HttpClient';

export const divisionApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['Division'] }).injectEndpoints({
  endpoints: builder => ({

    getDivision: builder.query<any, tableQueryType | void>({
      query: (params: tableQueryType) => `/admin/division?page=${params.page}&limit=${params.limitPerPage}`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['Division']
    }),

    getDivisionList: builder.query<any, void>({
      query: () => `/admin/division/list`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['Division']

    }),

    createDivision: builder.mutation({
      query: (data) => ({ url: '/admin/division', method: 'POST', body: data }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['Division']
    }),

    updateDivision: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/admin/division/${id}`, method: "PUT", body: data }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['Division']
    }),

    statusDivision: builder.mutation({
      query: (id) => ({ url: `/admin/division/status/${id}`, method: "PATCH" }),
      invalidatesTags: ['Division']
    }),

    showDivision: builder.query({
      query: (id) => `/admin/division/${id}`,
      transformResponse: (res: any) => RTKTransformResponseShow(res.response),
      providesTags: [{ type: 'Division' }],
    }),

    deleteDivision: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/division/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Division']
    }),

  }),
  overrideExisting: true,
})

export const {
  useGetDivisionQuery,
  useShowDivisionQuery,
  useGetDivisionListQuery,
  useCreateDivisionMutation,
  useUpdateDivisionMutation,
  useStatusDivisionMutation,
  useDeleteDivisionMutation
} = divisionApiSlice
