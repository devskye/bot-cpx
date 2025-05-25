
import { URLStore } from "#base"
import { createEmbed, createRow } from "@magicyan/discord";
import {
    ButtonBuilder,
    ButtonStyle,
} from "discord.js";

import { settings } from "#settings";

export function ticketDeletePanel(urlStore:URLStore) {
  const embed = createEmbed({
    url: urlStore,
    color: settings.colors.danger,
    description: "Deseja mesmo deletar este canal",
  });
  const row = createRow(
    new ButtonBuilder({
      customId: "ticket/control/trashbin",
      label: "Confirmar",emoji:"🗑️",
      style: ButtonStyle.Danger,

    })
  );

  return { ephemeral: true, embeds: [embed], components: [row] };
}
