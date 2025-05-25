import { ButtonBuilder, ButtonStyle } from "discord.js";
import { icon } from "functions/utils/emojis.js";

export const ticketNav = {
    staff: new ButtonBuilder({
        customId: "ticket/control/back",
        label: "Voltar", 
        style: ButtonStyle.Danger,
        emoji:icon.arrow_left
    }),
    close: new ButtonBuilder({
        customId: "ticket/control/back-close",
        label: "Voltar", 
        style: ButtonStyle.Danger,
        emoji:icon.arrow_left
    })
} 