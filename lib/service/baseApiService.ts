import type { AxiosInstance } from "axios";
import { axiosInstance } from "../axios/axiosInstance";

export interface RequestConfig {
    headers?: Record<string, string>;
    params?: any;
}

export class BaseAPIService {
    axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axiosInstance;
    }

    get = async (url: string, params?: any): Promise<any> => {
        const response = await this.axiosInstance.get(url, { params });
        return response.data;
    };

    post = async (url: string, data: any, config?: RequestConfig): Promise<any> => {
        const response = await this.axiosInstance.post(url, data, config);
        return response.data;
    };

    put = async (url: string, data: any): Promise<any> => {
        const response = await this.axiosInstance.put(url, data);
        return response.data;
    };

    patch = async (url: string, data: any): Promise<any> => {
        const response = await this.axiosInstance.patch(url, data);
        return response.data;
    };

    delete = async (url: string): Promise<any> => {
        const response = await this.axiosInstance.delete(url);
        return response.data;
    };
}

export const baseAPIService = new BaseAPIService();
