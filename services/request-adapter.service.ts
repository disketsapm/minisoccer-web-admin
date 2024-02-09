import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    CreateAxiosDefaults,
    InternalAxiosRequestConfig,
} from 'axios';

interface RequestAdapterProps extends CreateAxiosDefaults {}

export class RequestAdapter {
    public adapter: AxiosInstance;

    constructor(props?: RequestAdapterProps) {
        const { baseURL = process.env.NEXT_PUBLIC_API_URL, ...rest } =
            props || {};
        this.adapter = axios.create({
            baseURL,
            ...rest,
        });

        this.adapter.interceptors.request.use(this.interceptRequest);
        this.adapter.interceptors.response.use(
            this.interceptResponse,
            this.handleError,
        );
    }

    private async interceptRequest(
        config: InternalAxiosRequestConfig,
    ): Promise<InternalAxiosRequestConfig> {
        {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        }
    }

    private async interceptResponse(
        response: AxiosResponse,
    ): Promise<AxiosResponse> {
        {
            if (response.status === 401 || response.status === 403) {
                console.log('unauthorized');
            }
            return response;
        }
    }

    private handleError(error: AxiosError): void {
        if (error.response?.status === 401 || error.response?.status === 403) {
            alert('token not valid or expired');
        }

        if (error.response?.status === 400) {
            console.log('bad request');
            throw error.response.data;
        }

        throw error;
    }

    public sendGetRequest<T>(
        url: string,
        params?: AxiosRequestConfig['params'],
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.adapter.get<T, AxiosResponse<T>>(url, {
            ...config,
            params,
        });
    }

    public sendPostRequest<B, T>(
        url: string,
        data?: B,
        config?: InternalAxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.adapter.post<B, AxiosResponse<T>>(url, data, config);
    }

    public sendPutRequest<B, T>(
        url: string,
        data?: B,
        config?: InternalAxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.adapter.put<B, AxiosResponse<T>>(url, data, config);
    }

    public sendPatchRequest<B, T>(
        url: string,
        data?: B,
        config?: InternalAxiosRequestConfig,
    ): Promise<AxiosResponse<B>> {
        return this.adapter.patch<T, AxiosResponse<B>>(url, data, config);
    }

    public sendDeleteRequest<T>(
        url: string,
        config?: InternalAxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.adapter.delete<T, AxiosResponse<T>>(url, config);
    }
}
