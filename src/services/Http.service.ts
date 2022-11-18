import instance from '../axiosConfig';

export default class HttpService {

    protected get<T>(url: string,) {
        return instance.get<T>(url);
    }

    protected post<T>(url: string, data?: unknown) {
        return instance.post<T>(url, data);
    }

    protected delete(url: string, id: number) {
        return instance.delete(`${url}${id}/`);
    }

    protected patch<T>(url: string, id: number, data?: unknown) {
        return instance.patch<T>(`${url}${id}/`, data);
    }

    protected put<T>(url: string, id: number, data?: unknown) {
        return instance.put<T>(`${url}${id}/`, data)
    }

}