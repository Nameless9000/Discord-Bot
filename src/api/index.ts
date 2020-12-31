import Axios, { Method } from 'axios';

/**
 * The API class, used to make requests to the backend.
 */
export default class API {
    /**
     * The api key, used to make requests to the backend.
     */
    apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * Send a request to the api.
     * @param {{ endpoint: string, method: Method, body: object }} data The request data.
     */
    async request(data: { endpoint: string, method: Method, body?: object }) {
        try {
            const BASE_URL = 'https://api2.astral.cool';

            const res = await Axios({
                url: `${BASE_URL}${data.endpoint}`,
                method: data.method,
                headers: {
                    'Authorization': this.apiKey,
                },
                data: {
                    ...data.body,
                },
            });

            return res.data;
        } catch (err) {
            throw new Error(err.response.data.error);
        }
    }

    /**
     * Get the statistics on the uploaded files.
     */
    async getFileStats() {
        return await this.request({
            endpoint: '/files',
            method: 'GET',
        });
    }

    /**
     * Get all of the server's statistics.
     */
    async getTotalStats() {
        const totalUsers = (await this.request({
            endpoint: '/users',
            method: 'GET',
        })).total;

        const totalFiles = (await this.getFileStats()).total;

        return {
            totalUsers,
            totalFiles,
        };
    }
}
