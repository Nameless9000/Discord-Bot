import 'dotenv/config';
import { Client } from 'eris';
import { handleCommands, handleEvents } from '../utils/HandlerUtil';
import API from '../api';
import BaseCommand from '../utils/structures/BaseCommand';

const BOT_TOKEN = process.env.BOT_TOKEN;
const API_KEY = process.env.API_KEY;

/**
 * Astral's discord client.
 */
export default class DiscordClient extends Client {
    /**
     * A map of all of the commands the client has.
     */
    commands: Map<string, BaseCommand>;

    /**
     * The API class, used to make requests to the backend.
     */
    api: API;

    constructor() {
        super(BOT_TOKEN);

        this.api = new API(API_KEY);
        this.commands = new Map();
    }

    /**
     * Start the discord bot.
     */
    async init() {
        try {
            await handleCommands(this);
            await handleEvents(this);

            this.connect();
        } catch (err) {
            throw new Error(err);
        }
    }
}
