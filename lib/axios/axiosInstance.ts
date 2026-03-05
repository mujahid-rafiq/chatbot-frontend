import axios, { type AxiosRequestConfig, type AxiosInstance } from 'axios';

// Request Interceptor
const requestHandler = (request: any) => {
    // You can add logic for tokens here if needed in the future
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }

    // Handle FormData
    if (request.data instanceof FormData) {
        delete request.headers['Content-Type'];
    }
    return request;
};

// Response Success Interceptor
const successResponseHandler = (response: any) => {
    return response;
};

// Response Error Interceptor
const errorResponseHandler = async (error: any) => {
    if (error.response?.status === 401) {
        // Handle logout/redirect logic here
        // For now, we'll just log it
        console.warn('Unauthorized! Redirecting...');
        if (typeof window !== 'undefined') {
            // window.location.href = '/login'; 
        }
    }
    return Promise.reject(error);
};

export const getAxiosInstance = (config: AxiosRequestConfig = {}): AxiosInstance => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    const instance = axios.create({
        baseURL,
        ...config,
        headers: {
            'Content-Type': 'application/json',
            ...(config.headers || {}),
        },
    });

    // Attach interceptors
    instance.interceptors.request.use(requestHandler);
    instance.interceptors.response.use(successResponseHandler, errorResponseHandler);

    return instance;
};

export const axiosInstance = getAxiosInstance();
