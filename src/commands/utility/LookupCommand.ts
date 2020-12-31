import { Message, TextChannel } from 'eris';
import { Embed, Error } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class LookupCommand extends BaseCommand {
    constructor() {
        super({
            name: 'lookup',
            description: 'Lookup a user.',
            usage: 'lookup <uuid/uid/discord>)',
            permissions: ['sendMessages'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!args[0]) return message.channel.createMessage({
            embed: Error('Provide a identifier.'),
        });

        try {
            const { user } = await this.client.api.getUser(args[0] || message.mentions[0].id);
            const embed = new Embed()
                .setTitle(`${user.username} (${user.uid})`)
                .setUrl(`https://astral.cool/u/${user.uid}`)
                .addFields([
                    {
                        name: 'Username',
                        value: user.username,
                        inline: true,
                    },
                    {
                        name: 'Last Login',
                        value: new Date(user.lastLogin).toLocaleString(),
                        inline: true,
                    },
                    {
                        name: 'UID',
                        value: user.uid,
                        inline: true,
                    },
                    {
                        name: 'Uploads',
                        value: user.uploads,
                        inline: true,
                    },
                    {
                        name: 'Registration Date',
                        value: new Date(user.registrationDate).toLocaleString(),
                        inline: true,
                    },
                    {
                        name: 'Invited By',
                        value: user.invitedBy,
                        inline: true,
                    },
                    {
                        name: 'UUID',
                        value: `\`${user.uuid}\``,
                        inline: true,
                    },
                ]);

            message.channel.createMessage({
                embed: embed.embed,
            });
        } catch (err) {
            message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
