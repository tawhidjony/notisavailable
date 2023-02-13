import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get('_jwtToken')

const HTTP = axios.create({
	baseURL: process.env.SERVER_URL
});

export const setAuthToken = (token: any) => {
	HTTP.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const setFromAuthResponse = (res: Record<string, any>) => {
	console.log('res', res.data.response.data.auth);
	console.log('res', res.data.response.data.auth.token);

	Cookies.set("_jwtToken", res.data.response.data.auth.token)
	Cookies.set("_user", JSON.stringify(res.data.response.data.auth))
}

setAuthToken(token);


export const RTKBaseQuery = fetchBaseQuery({
	baseUrl: `${process.env.SERVER_URL}`,
	prepareHeaders(headers) {
		headers.set('Authorization', `Bearer ${token}`)
	}
})

export const RTKTransformResponse = (response: any) => {
	return {
		data: response?.data,
		errors: response?.error,
		metaData: response?.metadata,
		message: response?.message
	}
}

export const RTKTransformErrorResponse = (response: any) => {
	return {
		errors: response?.data?.error,
		message: response?.data?.message
	}
}


export default HTTP;
