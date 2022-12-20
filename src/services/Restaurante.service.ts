import HttpService from "./Http.service";
import IRestaurante from "../interfaces/IRestaurante";
import { IPaginacao } from "../interfaces/IPaginacao";
import IPrato from "interfaces/IPrato";


export default class RestauranteService extends HttpService {

    public getRestaurantes(param: string = '') {
        return super.get<IPaginacao<IRestaurante>>('/v1/restaurantes/' + param);
    }

    /**
    * ADMIN SERVICE ONLY !
    */
    admin = () => {
        const getRequest = super.get;
        const postRequest = super.post;
        const deleteRequest = super.delete;
        const patchRequest = super.patch;
        const putRequest = super.put;

        /**
         * Retorna todos os restaurantes da base de dados.
         */
        function getAll() {
            return getRequest<IRestaurante[]>('/v2/restaurantes/');
        }

        function saveNew(nome: string) {
            return postRequest<IRestaurante>('/v2/restaurantes/', {nome});
        }

        function deleteRestaurante(id: number){
            return deleteRequest('/v2/restaurantes/', id);
        }

        function findById(id: number) {
            return getRequest<IRestaurante>(`/v2/restaurantes/${id}/`);
        }

        function editName(id: number, restaurante: {nome:string}) {
            return patchRequest<IRestaurante>(`/v2/restaurantes/`, id, restaurante);
        }

        function addPrato(prato: IPrato){
            if(!prato.id) throw new Error("Prato sem id válido.");
            return putRequest(`/v2/pratos`, prato.id, prato);
        }

        return {
            getAll, saveNew, deleteRestaurante, findById, editName, addPrato
        }
    }

}
