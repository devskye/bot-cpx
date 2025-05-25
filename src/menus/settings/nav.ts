import { ButtonBuilder, ButtonStyle } from "discord.js";
import { icon } from "functions/utils/emojis.js";

export const settingsNav = {
    main: new ButtonBuilder({
        customId: "settings/main",
        label: "Menu Principal", 
        emoji:icon.other_home,
        style: ButtonStyle.Danger
    }),
    back: (menu: string) => new ButtonBuilder({
        customId: `settings/${menu}`,
        label: "Voltar", 
        emoji: icon.arrow_left,
        style: ButtonStyle.Danger,
        
    })
} 