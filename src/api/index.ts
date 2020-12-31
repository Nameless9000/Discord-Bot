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
            const BASE_URL = process.env.BACKEND_URL;

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
            err = err.response.data.error;

            throw new Error(
                `${err.charAt(0).toUpperCase() + err.slice(1)}.`
            );
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

    /**
     * Generate an invite code.
     */
    async generateInvite() {
        return await this.request({
            endpoint: '/admin/invites',
            method: 'POST',
        });
    }

    /**
     *
     * @param {string} id The user's identifier.
     * @param {string} reason The reason for the blacklist.
     */
    async blacklist(id: string, reason: string) {
        return await this.request({
            endpoint: '/admin/blacklist',
            method: 'POST',
            body: {
                id,
                reason: reason ? reason : 'No reason provided',
            },
        });
    }

    /**
     * Get a user.
     * @param {string} id The user's identifier.
     */
    async getUser(id: string) {
        return await this.request({
            endpoint: `/admin/users/${id}`,
            method: 'GET',
        });
    }
}
