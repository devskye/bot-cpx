import { icon } from "functions/utils/emojis.js";
import { URLStore } from "#base";
import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { StringSelectMenuBuilder } from "discord.js";
import { THUMBNAIL_URL } from "data/assets.js";

export function ticketStaffPanel(urlStore: URLStore) {
  const embed = createEmbed({
    url: urlStore,
    color: settings.colors.cpx,
    author: {
      name: "CPX • Gerenciamento de Tickets",
      iconURL: THUMBNAIL_URL,
    },
    thumbnail: THUMBNAIL_URL,
    description: brBuilder(
      `# ${icon.martelo} Painel Staff`,
      "*Gerencie este ticket utilizando o menu abaixo.*",
      "",
      " > Selecione uma das opções para **realizar ações administrativas** no ticket atual."
    ),
  });

  const row = createRow(
    new StringSelectMenuBuilder({
      customId: "ticket/control/staff",
      placeholder: "Selecione o que deseja fazer",
      options: [
        {
          label: "Notificar",
          value: "notify",
          emoji: icon.bell,
          description:
            "Envia uma DM ao criador do ticket com uma mensagem personalizada.",
        },
        {
          label: "Adicionar membros",
          value: "add",
          emoji: icon.user_plus,
          description: "Permite que novos usuários tenham acesso ao ticket.",
        },
        {
          label: "Remover membros",
          value: "remove",
          emoji: icon.user_minus,
          description: "Remove o acesso de um usuário deste ticket.",
        },
        {
          label: "Mover ticket",
          value: "move",
          emoji: icon.arrow_left,
          description:
            "Move o ticket para outra categoria ou canal de suporte.",
        },
        {
          label: "Assumir ticket",
          value: "assume",
          emoji: icon.file_check,
          description: "Marca você como responsável por este ticket.",
        },
      ],
    })
  );

  return {
    ephemeral: true,
    embeds: [embed],
    components: [row],
  };
}
