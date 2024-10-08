import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER } from '../../constants/config.js'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER}/api/v1` }),
  tagTypes: ['chat'],
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => ({ url: '/chat/all-chats', credentials: 'include' }),
      providesTags: ['chat'],
    }),
  }),
})

export default api
export const { useGetChatsQuery } = api
