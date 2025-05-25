
import { URLStore } from "#base";
import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";
import { icon } from "functions/utils/emojis.js";
import { THUMBNAIL_URL } from 'data/assets.js';

export function ticketClosePanel(urlStore: URLStore) {
  const embed = createEmbed({
    url: urlStore,
    color: settings.colors.cpx,
    description: brBuilder(
      `##  ${icon.martelo} Encerramento de Ticket`,
      "*Este ticket está pronto para ser finalizado.*",
      "",
      "Escolha abaixo o que deseja fazer:",
      " > - Transcrever ticket",
      "> - Fechar ticket"
    ),
    author:{
      name: "CPX • Gerenciamento de Tickets",
      iconURL: THUMBNAIL_URL
    },
    thumbnail: THUMBNAIL_URL
  });
  const row = createRow(
    new ButtonBuilder({
      customId: "ticket/control/transcript",
      label: "Transcrever",
      emoji: icon.contrato,
      style: ButtonStyle.Secondary,
    }),
    
    new ButtonBuilder({
      customId: "ticket/control/delete",
      label: "Deletar",
      emoji: icon.action_x,
      style: ButtonStyle.Secondary,
    })
  );
 
  return { ephemeral:true,embeds: [embed], components: [row] };
}
