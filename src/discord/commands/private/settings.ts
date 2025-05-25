import { createCommand } from "#base";
import { ApplicationCommandType } from "discord.js";
import { menus } from "#menus";


createCommand({
    name: "config",
    description: "Comando de configurações",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        interaction.reply(menus.settings.main());
    }
});