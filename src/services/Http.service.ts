import instance from '../axiosConfig';

export default class HttpService {

    protected get<T>(url: string,) {
        return instance.get<T>(url);
    }

    protected post<T>(url: string, data?: any) {
        return instance.post<T>(url, data);
    }

    protected delete(url: string, id: number){
        return instance.delete(`${url}${id}/`);
    }

    protected patch<T>(url: string, id: number, data?: any) {
        return instance.patch<T>(`${url}${id}/`, data);
    }
    
}