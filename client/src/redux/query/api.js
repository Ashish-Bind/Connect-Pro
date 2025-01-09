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
    getGroups: builder.query({
      query: () => ({ url: '/chat/all-group-chats', credentials: 'include' }),
      providesTags: ['chat'],
    }),
    getUserFriends: builder.query({
      query: (chatId) => {
        let url = `/user/all-friends/`

        if (chatId) {
          url += `?chatId=${chatId}`
        }

        return {
          url,
          credentials: 'include',
        }
      },
      providesTags: ['chat'],
    }),
    newGroup: builder.mutation({
      query: (data) => ({
        url: '/chat/new-group',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['chat'],
    }),
    renameGroup: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `/chat/${chatId}`,
        method: 'PUT',
        body: { name },
        credentials: 'include',
      }),
      invalidatesTags: ['chat'],
    }),
    removeGroupMember: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: `/chat/remove-member`,
        method: 'PUT',
        body: { chatId, userId },
        credentials: 'include',
      }),
      invalidatesTags: ['chat'],
    }),
    addGroupMember: builder.mutation({
      query: ({ chatId, members }) => ({
        url: `/chat/add-new-member`,
        method: 'PUT',
        body: { chatId, members },
        credentials: 'include',
      }),
      invalidatesTags: ['chat'],
    }),
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `/chat/${chatId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['chat'],
    }),
    adminLogin: builder.mutation({
      query: (secret) => ({
        url: `/admin/verify`,
        method: 'POST',
        credentials: 'include',
        body: { secret },
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `/admin/logout`,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    dashboardStats: builder.query({
      query: () => ({
        url: `/admin/stats`,
        credentials: 'include',
      }),
    }),
    userStats: builder.query({
      query: () => ({
        url: `/admin/users`,
        credentials: 'include',
      }),
    }),
    chatStats: builder.query({
      query: () => ({
        url: `/admin/chats`,
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
  useGetGroupsQuery,
  useGetUserFriendsQuery,
  useNewGroupMutation,
  useRenameGroupMutation,
  useRemoveGroupMemberMutation,
  useAddGroupMemberMutation,
  useDeleteChatMutation,
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useDashboardStatsQuery,
  useUserStatsQuery,
  useChatStatsQuery,
} = api
