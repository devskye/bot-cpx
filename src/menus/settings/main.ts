import {  ButtonBuilder, ButtonStyle} from "discord.js";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { settings } from "#settings";

export function settingMainMenu() {

    
    const embed = createEmbed({
        color:settings.colors.primary,
        author: {
            name: "Configurações",
            iconURL:"https://cdn.discordapp.com/attachments/1042233845930231808/1042233954799323166/logo.png"
        },
        description: brBuilder(
            `#  ⚙️ Configurações`,
            
            `- 📝 Definir canais`,
            `- 📁 Definir categoria do servidor`,
             `- 👥 Definir cargos de tickets`
        )
    })
        
           
    const row = createRow(
        new  ButtonBuilder({
            customId: "settings/channels",
            label: "Canais",emoji:"📝",
            style: ButtonStyle.Secondary
        }),
        new  ButtonBuilder({
            customId: "settings/parents",
            label: "Categorias",emoji:"📁",
            style: ButtonStyle.Secondary
        }),
        new  ButtonBuilder({
            customId: "settings/roles",
            label: "Cargos de tickets",emoji:"👥",
            style: ButtonStyle.Secondary
        })
    )
      
        

    return { ephemeral: true, embeds: [embed], components: [row] };
}