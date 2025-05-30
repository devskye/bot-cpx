import { URLStore } from "#base";
import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { THUMBNAIL_URL } from "data/assets.js";
import { ButtonBuilder, ButtonStyle, GuildMember } from "discord.js";
import { icon } from "functions/utils/emojis.js";


export  function ticketControlPanel(member: GuildMember, urlStore: URLStore) {
  const embed = createEmbed({
     url: urlStore,
     color: settings.colors.cpx,
    /*  author: createEmbedAuthor(member,{prefix: "Ticket de "}), */
     thumbnail:THUMBNAIL_URL,
   
     description:brBuilder(
         `## Este ticket foi aberto por ${member}`,
        `> **A equipe já está ciente da abertura do seu ticket, basta aguardar e em breve será atendido.**`,
        "",
        `${icon.contrato} **INFORMAÇÕES IMPORTANTES** ${icon.contrato}`,
        "",
        "> - Não flode no ticket.",
        "> - Não marque excessivamente a equipe.",
        "> - Não abra ticket sem **NECESSIDADE**.",
        "",
        `> **Responsavél pelo Ticket:**`,
          "--",
        
     ),
     footer: { text: "™ CPX © All rights reserved", iconURL: THUMBNAIL_URL },

   })
   const row = createRow(
    new ButtonBuilder({
       customId: "ticket/control/staff",
       label: "Painel Staff",
       emoji: icon.configuracoes_da_web,
       style: ButtonStyle.Secondary
     }),
    new ButtonBuilder({
       customId: "ticket/control/close",
       label: "Fechar Ticket",
       emoji: icon.cancelar,
       style: ButtonStyle.Secondary
     })
   )
   return { embeds: [embed], components: [row] };
  };   