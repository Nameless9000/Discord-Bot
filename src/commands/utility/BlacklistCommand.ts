import { Message, TextChannel } from 'eris';
import { Error, Success } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class BlacklistCommand extends BaseCommand {
    constructor() {
        super({
            name: 'blacklist',
            description: 'Blacklist a user.',
            usage: 'blacklist <uuid/username/email/invite/key/discord>',
            permissions: ['sendMessages', 'administrator'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!this.client.owners.includes(message.author.id)) return;

        if (!args[0]) return message.channel.createMessage({
            embed: Error('Provide an identifier.'),
        });

        try {
            const reason = args.slice(1).join(' ');

            await this.client.api.blacklist(args[0] || message.mentions[0].id, reason);

            message.channel.createMessage({
                embed: Success('Blacklisted user successfully.'),
            });
        } catch (err) {
            message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
