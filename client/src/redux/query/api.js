import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER } from '../../constants/config.js'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER}/api/v1` }),
  tagTypes: ['chat', 'user', 'message'],
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
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: '/user/accept-request',
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['chat'],
    }),
    getChatDetails: builder.query({
      query: ({ chatId, populate }) => {
        let url = `/chat/${chatId}`

        if (populate) {
          url += `?populate=true`
        }

        return {
          url,
          credentials: 'include',
        }
      },
      providesTags: ['chat'],
    }),
    getOldMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `/chat/messages/${chatId}?page=${page}`,
        credentials: 'include',
      }),
      keepUnusedDataFor: 0,
    }),
    sendAttachments: builder.mutation({
      query: (data) => ({
        url: '/chat/send-attachments',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
  }),
})

export default api
export const {
  useGetChatsQuery,
  useLazySearchUserQuery,
  useSendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
  useGetChatDetailsQuery,
  useGetOldMessagesQuery,
  useSendAttachmentsMutation,
} = api
