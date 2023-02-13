import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import Cookies from 'js-cookie';


// File or Image Upload Endpoint Configuration =========================>
export const HttpClientFileUpload = axios.create({
  baseURL: process.env.FILE_UPLOAD_SERVER_URL
})
export const setAuthToken = (token: any) => {
  HttpClientFileUpload.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  HttpClientFileUpload.defaults.headers.common['Content-Type'] = 'multipart/form-data';
};
setAuthToken(Cookies.get('_jwtAdminToken'));


// RTK Query Api Endpoint Configuration =========================>
const HttpApiQuery = fetchBaseQuery({
  baseUrl: `${process.env.SERVER_URL}`,
  prepareHeaders: (headers) => {
    const token = Cookies.get('_jwtToken')
    headers.set("authorization", `Bearer ${token}`)

  }
})

export const HttpClient = createApi({
  reducerPath: 'if_api_query',
  baseQuery: HttpApiQuery,
  endpoints: () => ({}),
})

export const RTKTransformResponse = (response: any) => {
  return {
    data: response?.data,
    errors: response?.error,
    metaData: response?.metadata,
    message: response?.message,
    statusCode: response?.statusCode,
  }
}

export const RTKTransformResponseShow = (response: any) => {
  return {
    data: response,
    statusCode: response?.statusCode,
  }
}

export const RTKTransformErrorResponse = (response: any) => {
  return {
    errors: response?.data?.errors,
    message: response?.data?.message,
    status: response?.status
  }
}