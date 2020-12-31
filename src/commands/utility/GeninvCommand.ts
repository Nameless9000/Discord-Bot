import { Message, TextChannel } from 'eris';
import { Embed, Error } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class GeninvCommand extends BaseCommand {
    constructor() {
        super({
            name: 'geninv',
            description: 'Generate an invite.',
            usage: 'geninv',
            permissions: ['sendMessages', 'administrator'],
        });
    }

    async run(message: Message<TextChannel>, _args: Array<string>) {
        if (!message.member.roles.includes(process.env.ADMIN_ROLE)) return;

        try {
            const { link, code } = await this.client.api.generateInvite();
            const embed = new Embed()
                .setTitle('Generated Invite')
                .setUrl(link)
                .addFields([
                    {
                        name: 'Direct Link',
                        value: `[Click Here](${link})`,
                    },
                    {
                        name: 'Code',
                        value: `||\`${code}\`||`,
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
