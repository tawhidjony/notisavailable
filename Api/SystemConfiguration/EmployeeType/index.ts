
import { tableQueryType } from 'Utils/GlobalTypes';
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse, RTKTransformResponseShow } from 'Utils/HttpClient';


export const employeeTypeSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['employeeType'] }).injectEndpoints({
  endpoints: builder => ({
    getEmployeeType: builder.query<any, tableQueryType | void>({
      query: (params: tableQueryType) => `/admin/employeetype?page=${params.page}&limit=${params.limitPerPage}`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['employeeType']

    }),
    getEmployeeTypeList: builder.query<any, void>({
      query: () => `/admin/employeetype/list`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['employeeType']
    }),

    createEmployeeType: builder.mutation({
      query: (data) => ({
        url: '/admin/employeetype',
        method: 'POST',
        body: data
      }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['employeeType']
    }),

    updateEmployeeType: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/employeetype/${id}`,
        method: "PUT",
        body: data
      }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['employeeType']
    }),

    statusEmployeeType: builder.mutation({
      query: (id) => ({
        url: `/admin/employeetype/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ['employeeType']
    }),
    showEmployeeType: builder.query({
      query: (id) => `/admin/employeetype/${id}`,
      transformResponse: (res: any) => RTKTransformResponseShow(res.response),
      providesTags: [{ type: 'employeeType' }],

    }),

    deleteEmployeeType: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/employeetype/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['employeeType']
    }),
  }),
  overrideExisting: true,
})


export const {
  useGetEmployeeTypeQuery,
  useGetEmployeeTypeListQuery,
  useCreateEmployeeTypeMutation,
  useUpdateEmployeeTypeMutation,
  useStatusEmployeeTypeMutation,
  useShowEmployeeTypeQuery,
  useDeleteEmployeeTypeMutation
} = employeeTypeSlice

