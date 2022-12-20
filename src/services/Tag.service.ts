import { IGeneric } from "interfaces/IGeneric";
import HttpService from "./Http.service";

export default class TagService extends HttpService {

    /**
    * ADMIN SERVICE ONLY !
    */
    admin = () => {
        const getRequest = super.get;

        /**
         * Retorna todas as tags existentes na base de dados
         */
         function getAll() {
            return getRequest<{tags: IGeneric[]}>('/v2/tags/');
        }

        return {
            getAll
        }
    }

}