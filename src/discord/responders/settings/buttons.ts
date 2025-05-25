import { createResponder, ResponderType } from "#base";
import { menus } from "#menus";
import { TicketCategory } from "types/TicketCategory.js";

createResponder({
    customId: "settings/roles/remove-button/:category", // BATE COM O NOVO ID
    types: [ResponderType.Button],
    cache: "cached",
    async run(interaction, { category }) {
        const { client, guild } = interaction;
        const guildData = client.mainGuildData;
        interaction.update(
            menus.settings.roles.remove(guildData, guild, category as TicketCategory)
        );
    }
});