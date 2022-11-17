import { AxiosResponse } from "axios";
import instance from '../axiosConfig';
import { IPaginacao } from "../interfaces/IPaginacao";

export default class HttpService {

    protected get<T>(url: string) {
        return instance.get<IPaginacao<T>>(url);
    }

    protected post<T>(url: string, data?: any) {
        return instance.post<IPaginacao<T>>(url, data);
    }
}