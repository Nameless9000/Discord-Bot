import { Member, Guild } from 'eris';
import { Embed } from '../utils/Embeds';
import BaseEvent from '../utils/structures/BaseEvent';

export default class guildMemberUpdateEvent extends BaseEvent {
    constructor() {
        super({
            name: 'guildMemberUpdate',
        });
    }

    async run(_guild: Guild, newMember: Member, oldMember: Member ) {
        if (!newMember.roles.includes(process.env.BOOSTER_ROLE) && oldMember.roles.includes(process.env.BOOSTER_ROLE)) return;

        try {
            (await newMember.user.getDMChannel()).createMessage({
                embed: new Embed()
                    .setTitle('Thank you for boosting!')
                    .setDescription(`Hello, ${newMember.user.username}.\n\nThank you for boosting Astral, in order to claim your invite, please create a ticket in the support channel, (<#785920865170096158>).`).embed,
            });
        } catch (err) {}
    }
}
