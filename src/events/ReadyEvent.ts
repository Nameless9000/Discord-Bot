import BaseEvent from '../utils/structures/BaseEvent';

export default class ReadyEvent extends BaseEvent {
    constructor() {
        super({
            name: 'ready',
        });
    }

    /**
     * Update the bots status.
     */
    async changeStatus() {
        try {
            const { total } = await this.client.api.getFileStats();

            this.client.editStatus('dnd', {
                name: `over ${total} files.`,
                type: 3,
            });

            setTimeout(async () => {
                await this.changeStatus();
            }, 300000);
        } catch (err) {}
    }

    async run() {
        await this.changeStatus();

        console.log(`Logged in as ${this.client.user.username}#${this.client.user.discriminator}`);
    }
}
