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


const options = [
  { emoji: "📄", label: "Logs", value: "logs", description: "Canal de logs" },
  {
    emoji: "✉️",
    label: "Transcripts",
    value: "transcripts",
    description: "Canal de transcripts",
  },
] as const;

export function settingsChannelsMenu(guildData: GuildSchema) {
  const channels = guildData.channels ?? {};

  const display = options.map(
    ({ emoji, label, value }) =>
      `${emoji} ${label}: ${formatedChannelMetion(
        channels[value]?.id,
        "`Não definido`"
      )}`
  );
  const embed = createEmbed({
    color: settings.colors.primary,
    description: brBuilder(`#  ⚙️ Configurar canais`, ...display),
  });

  const row = createRow(
    new StringSelectMenuBuilder({
      customId: "settings/channels/select",
      placeholder: "Selecione o canal que deseja",
      options: Array.from(options),
    })
  );
  const navRow = createRow(settingsNav.main);
  return { ephemeral: true, embeds: [embed], components: [row, navRow] };
}

export function settingsChannelMenu(guildData: GuildSchema, selected: string) {
  const channels = guildData.channels ?? {};

  const {emoji,label} = options.find(({ value }) => value === selected)!;


  const chanenelKey = selected as keyof typeof channels;

  const embed = createEmbed({
    color: settings.colors.primary,
    description: brBuilder(
      `# ${emoji} Configurar ${label}`,
      `Selecione o canal para ${label.toLowerCase()}`,
      `Atualmente: ${formatedChannelMetion(
        channels[chanenelKey]?.id,
        "`Não definido`"
      )}`
    ),
  });
  const row = createRow(
    new ChannelSelectMenuBuilder({
      customId: `settings/channel/${selected}`,
      placeholder: "Selecione o canal que deseja",
      channelTypes: [ChannelType.GuildText],
    })
  );

  const navRow = createRow(settingsNav.back("channels"), settingsNav.main);
  return { ephemeral: true, embeds: [embed], components: [row,navRow] };
}
