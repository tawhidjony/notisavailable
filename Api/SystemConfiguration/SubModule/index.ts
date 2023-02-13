import { HttpClient, RTKTransformResponseShow } from 'Utils/HttpClient';

export const subModuleApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['submodules'] }).injectEndpoints({
    endpoints: builder => ({
        getSubModules: builder.query({
            query: () => `/admin/sub-module/list`,
            transformResponse: (res: any) => RTKTransformResponseShow(res.response),
            providesTags: ['submodules']
        })
    }),
    overrideExisting: true,
})


export const {
    useGetSubModulesQuery
} = subModuleApiSlice;
