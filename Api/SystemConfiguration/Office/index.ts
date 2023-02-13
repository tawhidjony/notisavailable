

import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse, RTKTransformResponseShow } from 'Utils/HttpClient';


export const officeSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['office'] }).injectEndpoints({
  endpoints: builder => ({
    getOffice: builder.query<any, any | void>({
      query: (params: any) => {
        return {
          url: `/admin/office`,
          params,
        };
      },
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['office']

    }),

    getOfficeList: builder.query<any, void>({
      query: () => `/admin/office/list`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['office']
    }),

    createOffice: builder.mutation({
      query: (data) => ({
        url: '/admin/office',
        method: 'POST',
        body: data
      }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['office']
    }),

    updateOffice: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/office/${id}`,
        method: "PUT",
        body: data
      }),
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      invalidatesTags: ['office']
    }),

    statusOffice: builder.mutation({
      query: (id) => ({
        url: `/admin/office/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ['office']
    }),
    showOffice: builder.query({
      query: (id) => `/admin/office/${id}`,
      transformResponse: (res: any) => RTKTransformResponseShow(res.response),
      providesTags: [{ type: 'office' }],

    }),

    deleteOffice: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/office/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['office']
    }),

    exportToOfficePDF: builder.mutation({
      queryFn: async (data, api, extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: `/admin/office/pdf?${data.panelSearch}`,
          method: 'POST',
          body: data,
          responseHandler: ((response) => response.blob())
        })
        const hiddenElement = document.createElement('a');
        const url = window.URL || window.webkitURL;
        const blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = '_blank';
        hiddenElement.download = `Office.pdf`;
        hiddenElement.click();
        return { data: null }
      }
    }),
    exportToOfficeExcel: builder.mutation({
      queryFn: async (data, api, extraOptions, baseQuery) => {
        const result: any = await baseQuery({
          url: `/admin/office/excel?${data.panelSearch}`,
          method: 'POST',
          body: data,
          responseHandler: ((response) => response.blob())
        })
        const hiddenElement = document.createElement('a');
        const url = window.URL || window.webkitURL;
        const blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = '_blank';
        hiddenElement.download = `Office.xlsx`;
        hiddenElement.click();
        return { data: null }
      }
    })
  }),

  overrideExisting: true,
})


export const {
  useGetOfficeQuery,
  useGetOfficeListQuery,
  useCreateOfficeMutation,
  useUpdateOfficeMutation,
  useStatusOfficeMutation,
  useShowOfficeQuery,
  useDeleteOfficeMutation,
  useExportToOfficePDFMutation,
  useExportToOfficeExcelMutation
} = officeSlice
