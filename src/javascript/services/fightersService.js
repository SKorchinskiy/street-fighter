import callApi from '../helpers/apiHelper';

class FighterService {
    #endpoint = 'fighters.json';

    #details = 'details/fighter/';

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id) {
        const mountedUrl = `${this.#details}${id}.json`;
        const fighterDetails = await callApi(mountedUrl);
        return fighterDetails;
        // todo: implement this method
        // endpoint - `details/fighter/${id}.json`;
    }
}

const fighterService = new FighterService();

export default fighterService;
