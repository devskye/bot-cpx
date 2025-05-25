import { GuildSchema } from "#database";
import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import {
  ChannelSelectMenuBuilder,
  ChannelType,
  StringSelectMenuBuilder,
} from "discord.js";
import { formatedChannelMetion } from "functions/utils/mention.js";
import { settingsNav } from "./nav.js";
import { configOptionsParents } from "data/options.js";



export function settingsParentsMenu(guildData: GuildSchema) {
  const parents = guildData.parents ?? {};

  const display = configOptionsParents.map(
    ({ emoji, label, value }) =>
      `${emoji} ${label}: ${formatedChannelMetion(
       parents[value]?.id,
        "`Não definido`"
      )}`
  );
  const embed = createEmbed({
    color: settings.colors.primary,
    description: brBuilder(`#  ⚙️ Configurar categorias`, ...display),
  });

  const row = createRow(
    new StringSelectMenuBuilder({
      customId: "settings/parents/select",
      placeholder: "Selecione o canal que deseja",
      options: Array.from(configOptionsParents),
    })
  );
  const navRow = createRow(settingsNav.main);
  return { ephemeral: true, embeds: [embed], components: [row, navRow] };
}

export function settingsParentMenu(guildData: GuildSchema, selected: string) {
  const parents = guildData.parents ?? {};

  const {emoji,label} = configOptionsParents.find(({ value }) => value === selected)!;


  const chanenelKey = selected as keyof typeof parents;

  const embed = createEmbed({
    color: settings.colors.primary,
    description: brBuilder(
      `# ${emoji} Configurar ${label}`,
      `Selecione a categoria para ${label.toLowerCase()}`,
      `Atualmente: ${formatedChannelMetion(
       parents[chanenelKey]?.id,
        "`Não definido`"
      )}`
    ),
  });
  const row = createRow(
    new ChannelSelectMenuBuilder({
      customId: `settings/parent/${selected}`,
      placeholder: "Selecione o canal que deseja",
      channelTypes: [ChannelType.GuildCategory],
    })
  );

  const navRow = createRow(settingsNav.back("parents"), settingsNav.main);
  return { ephemeral: true, embeds: [embed], components: [row,navRow] };
}
