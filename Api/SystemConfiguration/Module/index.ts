import { HttpClient, RTKTransformResponseShow } from 'Utils/HttpClient';

export const moduleApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['modules'] }).injectEndpoints({
    endpoints: builder => ({
        getModules: builder.query({
            query: () => `/admin/module/list`,
            transformResponse: (res: any) => RTKTransformResponseShow(res.response),
            providesTags: ['modules']
        })
    }),
    overrideExisting: true,
})


export const {
    useGetModulesQuery
} = moduleApiSlice;
