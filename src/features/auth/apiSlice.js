import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://householdserviceapi.onrender.com/',
    baseUrl: 'http://127.0.0.1:8000/',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      // const session_key = Cookies.get('session_key'); 

      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }
      // if (session_key) {
      //   headers.set('session_key', session_key); 
      // }

      return headers;
    },
  }),
  tagTypes: ["services", "service", "cart", "order"],
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
    getCategories: builder.query({
      query: () => 'service/categories/',
    }),
    getServices: builder.query({
      query: ({ page }) => `service/?page=${page}`,
      method: 'GET',
      providesTags: ["services"] 
    }),
    getService: builder.query({
      query: (id) => `/service/${id}/`, 
      method: 'GET',
      // providesTags: ["service"]
    }),
    getFeaturedServices: builder.query({ 
      query : () => 'service/featured/',
      method: 'GET',
      
    }),
    addCartItem: builder.mutation({
      query: (body) => ({
        url: 'cart/add/',
        method: 'POST',
        body: body,
        credentials: 'include',  
      }),
      invalidatesTags: ["cart"],
    }),
    getCart: builder.query({
      query: () => 'cart/',
      providesTags: ["cart"],
    }),
    deleteCartItem: builder.mutation({
      query: (id) => ({
        url: `cart/remove/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ["cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: 'cart/clear_cart/',
        method: 'DELETE',
      }),
      invalidatesTags: ["cart"],
    }),
    addOrderItem: builder.mutation({
      query: (orderData) => {
        return {
          url: 'order/create/', 
          method: 'POST',       
          body: orderData          
        };
      }
    }),

    UserOrders: builder.query({
      query: () => 'orders/my/',
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
  useGetCategoriesQuery,
  useGetServiceQuery,
  useGetFeaturedServicesQuery,
  useAddOrderItemMutation,
  useClearCartMutation,
  useUserOrdersQuery,
} = apiSlice;

export default apiSlice;
