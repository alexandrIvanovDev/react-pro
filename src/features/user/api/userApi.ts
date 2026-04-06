import { userApi } from 'shared/api/baseApi';
import type { User } from './type';

export const user = userApi.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<User, string>({
      query: (token) => ({
        url: 'users/me',
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const { useMeQuery } = user;
