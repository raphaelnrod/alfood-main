import IPrato from "interfaces/IPrato";
import HttpService from "./Http.service";

export default class PratoService extends HttpService {

    /**
    * ADMIN SERVICE ONLY !
    */
    admin = () => {
        const getRequest = super.get;
        const postRequest = super.post;
        const deleteRequest = super.delete;
        const patchRequest = super.patch;

        /**
         * Retorna todos os pratos da base de dados.
         */
         function getAll() {
            return getRequest<IPrato[]>('/v2/pratos/');
        }

        function saveNew(prato: IPrato) {
            return postRequest<IPrato>('/v2/pratos/', prato);
        }

        function deletePrato(id: number){
            return deleteRequest('/v2/pratos/', id);
        }

        function findById(id: number) {
            return getRequest<IPrato>(`/v2/pratos/${id}/`);
        }

        function edit(id: number, prato: IPrato) {
            return patchRequest<IPrato>(`/v2/pratos/`, id, prato);
        }

        return {
            getAll, saveNew, deletePrato, findById, edit
        }
    }

}