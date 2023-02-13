import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'Store';
import { EnumLangTypes } from 'Utils/Enums/LangType';
import { tableQueryType } from 'Utils/GlobalTypes';
import { HttpClient, RTKTransformErrorResponse, RTKTransformResponse, RTKTransformResponseShow } from 'Utils/HttpClient';

export interface LangState {
    lang: EnumLangTypes;
    langData: []
}

const initialState: LangState = {
    lang: EnumLangTypes.BANGLA,
    langData: []
};

export const selectLang = (state: RootState) => state.lang.lang;
export const langSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        reduxSetLang: (state, action: PayloadAction<{ lang: EnumLangTypes }>) => {
            state.lang = action.payload.lang;
        },
        reduxSetLangData(state, action: PayloadAction<{ langData: [] }>) {
            state.langData = action.payload.langData;
        }
    },
});

export const langApiSlice = HttpClient.enhanceEndpoints({ addTagTypes: ['language', 'languagePagination'] }).injectEndpoints({
    endpoints: builder => ({
        getLanguages: builder.query({
            query: () => `/admin/language/list`,
            transformResponse: (res: any) => RTKTransformResponseShow(res.response),
            providesTags: ['language']
        }),
        getLanguagesPagination: builder.query<any, tableQueryType | void>({
            query: (params: tableQueryType) => `/admin/language?page=${params.page}&limit=${params.limitPerPage}`,
            transformResponse: (res: any) => RTKTransformResponse(res.response),
            transformErrorResponse: (res: any) => RTKTransformErrorResponse(res.response),
            providesTags: ['languagePagination']
        }),
        createLanguage: builder.mutation<void, any>({
            query: (data) => ({
                url: '/admin/language',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['languagePagination', 'language']
        }),
        showLanguage: builder.query({
            query: (id) => `/admin/language/${id}`,
            transformResponse: (res: any) => RTKTransformResponseShow(res.response),
            providesTags: ['language'],

        }),
        updateLanguage: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/admin/language/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['languagePagination', 'language']
        }),

        deleteLanguage: builder.mutation<void, string>({
            query: (id) => ({
                url: `/admin/language/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['languagePagination', 'language']
        }),
    }),
    overrideExisting: true,
})


export const {
    useGetLanguagesQuery,
    useGetLanguagesPaginationQuery,
    useCreateLanguageMutation,
    useDeleteLanguageMutation,
    useShowLanguageQuery,
    useUpdateLanguageMutation
} = langApiSlice;

export const { reduxSetLang, reduxSetLangData } = langSlice.actions;
export default langSlice.reducer;
