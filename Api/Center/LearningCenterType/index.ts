import { LearningCenterList } from 'components/Admin/Center/LearningCenter/Model';
import { tableQueryType } from 'Utils/GlobalTypes';
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse, RTKTransformResponseShow } from 'Utils/HttpClient';
export const LearningCenterTypeApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['Learningcentertype'] }).injectEndpoints({
  endpoints: builder => ({

    getLearningcentertypeList: builder.query<any, tableQueryType | void>({
      query: (params: tableQueryType) => `/admin/learningcentertype?page=${params.page}&limit=${params.limitPerPage}`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res),
      providesTags: ['Learningcentertype']
    }),

    getLearningcentertypeAllList: builder.query<any, void>({
      query: () => `/admin/learningcentertype/list`,
      transformResponse: (res: any) => RTKTransformResponse(res.response),
      transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
      providesTags: ['Learningcentertype']
    }),



    createLearningCenterTypeList: builder.mutation<void, LearningCenterList>({
      query: (data) => ({
        url: '/admin/learningcentertype',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Learningcentertype']
    }),

    showLearningCenterType: builder.query({
      query: (id) => `/admin/learningcentertype/${id}`,
      transformResponse: (res: any) => RTKTransformResponseShow(res.response),
      providesTags: ['Learningcentertype']
    }),



    deleteOfficetype: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/learningcentertype/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Learningcentertype']
    }),


  }),
  overrideExisting: true,
})


export const {
  useGetLearningcentertypeListQuery,
  useGetLearningcentertypeAllListQuery,
  useCreateLearningCenterTypeListMutation,
  useShowLearningCenterTypeQuery
} = LearningCenterTypeApiSlice
