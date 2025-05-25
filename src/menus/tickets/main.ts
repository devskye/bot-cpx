import { settings } from "#settings";
import { createEmbed, createRow } from "@magicyan/discord";
import { BANNER2_URL, THUMBNAIL_URL } from "data/assets.js";
import { options } from "data/options.js";

import { Guild, StringSelectMenuBuilder } from "discord.js";
import { icon } from "functions/utils/emojis.js";



export function ticketsMainPanel(guild: Guild) {
  const embed = createEmbed({
    color: settings.colors.cpx,
    image: BANNER2_URL,
    title: "*ATENDIMENTO*",
    thumbnail: THUMBNAIL_URL,
    description:
      "*> Para abrir um ticket clique no menu abaixo.* \n" +
      `> ${icon.contrato} **LEIA ANTES DE ABRIR** ${icon.contrato} \n` +
      "\u200B\n" +
      "*> Não abra um ticket sem **NECESSIDADE**.*\n" +
      "*> Não marque excessivamente a equipe.*\n",

    footer: {
      text: "Todos os direitos reservados © Complexo Roleplay 2025",
      iconURL: THUMBNAIL_URL,
    },
  });

  const row = createRow(
    new StringSelectMenuBuilder({
      customId: "tickets/panel/open",
      placeholder: "Selecione o canal que deseja",
      options: Array.from(options),

    })
  );
 
  return { embeds: [embed], components: [row] };
}


export const newSelectMenu = createRow(
  new StringSelectMenuBuilder({
    customId: "tickets/panel/open",
    placeholder: "Selecione o canal que deseja",
    options: Array.from(options),
    disabled:false

  })
);
