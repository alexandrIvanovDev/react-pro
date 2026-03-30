import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://jsonplaceholder.typicode.com/',
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Tasks'],
  endpoints: () => ({}),
});

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.v2.react-learning.ru/',
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
