import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://householdserviceapi.onrender.com/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["services", "service"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register/',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    verifyCode: builder.mutation({
      query: (data) => ({
        url: 'auth/verify-account/',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout/',
        method: 'POST',
      }),
    }),
    sendVerificationCode: builder.mutation({
      query: (email) => ({
        url: 'auth/forgot-password/',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: 'auth/reset-password/',
        method: 'POST',
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: 'auth/profile/',
        method: 'PUT',
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => 'auth/profile/',
      method: 'GET', 
    }),
    getCategoriues: builder.query({
      query: () => 'service/categories/',
    }),
    getServices: builder.query({
      query: () => 'service/',
      method: 'GET',
      providesTags: ["services"] 
    }),
    getService: builder.query({
      query: (id) => `/service/${id}/`, 
      method: 'GET',
      providesTags: ["service"]
  }),
    getCart : builder.query({
      query: () => 'cart/',
      method: 'GET',
      providesTags: ["service"]
    }),
    addCartItem: builder.mutation({
      query: (newItem) => ({
        url: 'cart/add/',
        method: 'POST',
        body: newItem,
      }),
      invalidatesTags: ["services", "service"]
    }),
    deleteCartItem: builder.mutation({
      query: (id) => ({
        url: `cart/delete/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyCodeMutation,
  useLogoutMutation,
  useSendVerificationCodeMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useGetProfileQuery,
  useGetServicesQuery,
  useAddCartItemMutation,
  useGetCartQuery,
  useDeleteCartItemMutation,
  useGetCategoriuesQuery,
  useGetServiceQuery,
} = apiSlice;

export default apiSlice;
