import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER } from '../../constants/config.js'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER}/api/v1` }),
  tagTypes: ['chat', 'user'],
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => ({ url: '/chat/all-chats', credentials: 'include' }),
      providesTags: ['chat'],
    }),
    searchUser: builder.query({
      query: (search) => ({
        url: `/user/search-user/?username=${search}`,
        credentials: 'include',
      }),
      providesTags: ['user'],
    }),
    sendRequest: builder.mutation({
      query: (data) => ({
        url: '/user/send-request',
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['user'],
    }),
    getNotifications: builder.query({
      query: () => ({
        url: '/user/all-notifications',
        credentials: 'include',
      }),
      keepUnusedDataFor: 0,
    }),
  }),
})

export default api
export const {
  useGetChatsQuery,
  useLazySearchUserQuery,
  useSendRequestMutation,
  useGetNotificationsQuery,
} = api
