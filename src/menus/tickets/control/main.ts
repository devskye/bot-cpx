import { URLStore } from "#base";
import { settings } from "#settings";
import { brBuilder, createEmbed, createEmbedAuthor, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, GuildMember } from "discord.js";
import { icon } from "functions/utils/emojis.js";


export  function ticketControlPanel(member: GuildMember, urlStore: URLStore) {
  const embed = createEmbed({
     url: urlStore,
     color: settings.colors.cpx,
     author: createEmbedAuthor(member,{prefix: "Ticket de "}),
     thumbnail:member.displayAvatarURL(),
     description:brBuilder(
        `Este ticket foi aberto por ${member}`,
        ">>> Para acelerar o processo,envie mais detalhes.",
        "sobre o assunto deste ticket e em breve",
        "nossa equipe irá respondê-lo(a"
        
     )

   })
   const row = createRow(
    new ButtonBuilder({
       customId: "ticket/control/staff",
       label: "Painel Staff",
       emoji: icon.shield_check,
       style: ButtonStyle.Secondary
     }),
    new ButtonBuilder({
       customId: "ticket/control/close",
       label: "Fechar Ticket",
       emoji: icon.action_x,
       style: ButtonStyle.Danger
     })
   )
   return { embeds: [embed], components: [row] };
  };   