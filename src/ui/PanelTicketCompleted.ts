import { settings } from "#settings";
import { createEmbed } from "@magicyan/discord";
import { Guild, GuildMember } from "discord.js";
import { icon } from "functions/utils/emojis.js";


export const PanelTicketCompleted = (
  guild: Guild,
  reasonCloseTicket: string,
  owner: GuildMember,
  member: GuildMember,
  id:string,
  transcriptURL : string | undefined
) => {

  const embed = createEmbed({
    color: settings.colors.cpx,
    title: `Ticket finalizado  `,
    description: `> Olá ${owner}, seu ticket foi finalizado por ${member} no servidor *${guild.name}*.\n\n` +
    `${icon.setas_direitas} **Motivo do fechamento:**\n\`\`\`\n${reasonCloseTicket}\n\`\`\`\n\n` +
    `${icon.setas_direitas} **ID do Ticket:** \`${id}\`\n\n` + 
    `${icon.setas_direitas} **Transcrição:** ${transcriptURL ? `[Clique aqui](${transcriptURL})\n\n` : "Não foi possível gerar transcrição"}\n`,
     
    footer: { text: "™ CPX © All rights reserved", iconURL: guild.iconURL() },
  });
  return { embeds: [embed] };
};
