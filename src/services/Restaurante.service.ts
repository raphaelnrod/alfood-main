import HttpService from "./Http.service";
import IRestaurante from "../interfaces/IRestaurante";
import { IPaginacao } from "../interfaces/IPaginacao";


export default class RestauranteService extends HttpService {

    public getRestaurantes(param: string = '') {
        return super.get<IRestaurante>('/v1/restaurantes/' + param);
    }
}