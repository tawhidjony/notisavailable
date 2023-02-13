
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse, RTKTransformResponseShow } from 'Utils/HttpClient';


export const employeeManagementApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['EmployeeManagement'] }).injectEndpoints({
  endpoints: builder => ({
    getEmployeeManagement: builder.query<any, any | void>({
      query: (params: any) => {
        return {
          url: `/admin/employee`,
          params
        }
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
      providesTags: ['EmployeeManagement']
    }),

    createEmployeeManagement: builder.mutation<void, any>({
      query: (data) => ({
        url: '/admin/employee',
        method: 'POST',
        body: data
      }),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['EmployeeManagement']
    }),

    updateEmployeeManagement: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/employee/${id}`,
        method: "PUT",
        body: data
      }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['EmployeeManagement']
    }),

    showEmployeeManagement: builder.query({
      query: (id) => `/admin/employee/${id}`,
      transformResponse: (res: any) => RTKTransformResponseShow(res.response.data),
      providesTags: ['EmployeeManagement']
    }),

    deleteEmployeeManagement: builder.mutation({
      query: (id) => ({
        url: `/admin/employee/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (res: any) => RTKTransformResponseShow(res.response),
      invalidatesTags: ['EmployeeManagement']
    }),


    exportToEmployeePDF: builder.mutation({
      queryFn: async (data, api, extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: `/admin/employee/pdf?${data.panelSearch}`,
          method: 'POST',
          body: data,
          responseHandler: ((response) => response.blob())
        })
        console.log("data ", data);
        const hiddenElement = document.createElement('a');
        const url = window.URL || window.webkitURL;
        const blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = '_blank';
        hiddenElement.download = `Employee.pdf`;
        hiddenElement.click();
        return { data: null }
      }
    }),
    exportToEmployeeExcel: builder.mutation({
      queryFn: async (data, api, extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: `/admin/employee/excel?${data.panelSearch}`,
          method: 'POST',
          body: data,
          responseHandler: ((response) => response.blob())
        })
        const hiddenElement = document.createElement('a');
        const url = window.URL || window.webkitURL;
        const blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = '_blank';
        hiddenElement.download = `Employee_list.xlsx`;
        hiddenElement.click();
        return { data: null }
      }
    })

  }),
  overrideExisting: true,
})


export const {
  useGetEmployeeManagementQuery,
  useCreateEmployeeManagementMutation,
  useUpdateEmployeeManagementMutation,
  useShowEmployeeManagementQuery,
  useDeleteEmployeeManagementMutation,
  useExportToEmployeePDFMutation,
  useExportToEmployeeExcelMutation
} = employeeManagementApiSlice
