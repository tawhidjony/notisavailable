import { combineReducers } from "@reduxjs/toolkit";
import { HttpClient } from "Utils/HttpClient";
import langReducer from '../../Api/SystemConfiguration/Language';

export const rootReducers = combineReducers({
  lang: langReducer,
  [HttpClient.reducerPath]: HttpClient.reducer,
})

