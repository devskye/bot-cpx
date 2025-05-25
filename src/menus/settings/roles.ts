import { GuildSchema } from "#database";

import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, Guild, RoleSelectMenuBuilder, StringSelectMenuBuilder } from "discord.js";
import { settingsNav } from "./nav.js";
import { getIncluideRoles } from "functions/utils/roles.js";
import { TicketCategory } from "types/TicketCategory.js";
import { configOptionsRoles } from "data/options.js";



/* const categories = [
    { emoji: "📄", label: "Suporte", value: "suporte" as TicketCategory },
    { emoji: "🐛", label: "Bugs", value: "bugs" as TicketCategory },
    { emoji: "⚠️", label: "Denúncias", value: "complaint" as TicketCategory }
] as const; */

export const settingsRolesMenu = (guildData: GuildSchema, guild: Guild) => {
    const embed = createEmbed({
        color: settings.colors.primary,
        description: brBuilder(
            `# Cargos dos tickets`,
            "Selecione a categoria para configurar os cargos",
            ...configOptionsRoles.map(({ emoji, label, value }) => {
                const roles = getIncluideRoles(guildData.tickets?.roles?.[value], guild);
                return `${emoji} **${label}**:\n${
                    roles.size === 0 ? "- Nenhum cargo configurado"
                    : roles.map(role => `- ${role} 👤 ${role.members.size} membros`).join("\n")
                }`;
            })
        )
    });

    const row = createRow(
        new StringSelectMenuBuilder({
            customId: "settings/roles/category",
            placeholder: "Selecione a categoria",
            options: configOptionsRoles.map(({ emoji, label, value }) => ({
                emoji,
                label,
                value,
                description: `Configurar cargos para ${label.toLowerCase()}`
            }))
        })
    );

    const navRow = createRow(settingsNav.main);
    return { embeds: [embed], components: [row, navRow] };
}

export const settingsRolesCategoryMenu = (guildData: GuildSchema, guild: Guild, category: TicketCategory) => {
    const roles = getIncluideRoles(guildData.tickets?.roles?.[category], guild);
    const categoryInfo = configOptionsRoles.find(c => c.value === category)!;

    const embed = createEmbed({
        color: settings.colors.primary,
        description: brBuilder(
            `# ${categoryInfo.emoji} Cargos de ${categoryInfo.label}`,
            "Cargos que podem gerenciar os tickets desta categoria",
            roles.size === 0 ? "- Nenhum cargo configurado"
            : roles.map(role => `- ${role} 👤 ${role.members.size} membros`).join("\n")
        )
    });

   const row = createRow(
        new RoleSelectMenuBuilder({
            customId: `settings/roles/add/${category}`,
            placeholder: "Selecione os cargos para adicionar",
            minValues: 1,
            maxValues: Math.min(25, guild.roles.cache.size)
        })
    );

    const buttonRow = createRow(
        new ButtonBuilder({
            customId:  `settings/roles/remove-button/${category}`, // botão que exibe o menu
            label: "Remover cargos",
            emoji: "➖",
            style: ButtonStyle.Danger,
            disabled: roles.size < 1
        })
    );

    const navRow = createRow(
        settingsNav.back("roles"),
        settingsNav.main
    ); 

    return { embeds: [embed], components: [row, buttonRow, navRow] };
}

export const settingsRolesRemoveMenu = (guildData: GuildSchema, guild: Guild, category: TicketCategory) => {
    const roles = getIncluideRoles(guildData.tickets?.roles?.[category], guild);
    const categoryInfo = configOptionsRoles.find(c => c.value === category)!;

    const embed = createEmbed({
        color: settings.colors.danger,
        description: `Selecione os cargos que deseja remover de ${categoryInfo.label}`
    });

    const row = createRow(
        new StringSelectMenuBuilder({
            customId: `settings/roles/remove/${category}`,
            placeholder: "Selecione os cargos",
            minValues: 1,
            maxValues: Math.min(25, roles.size),
            options: roles.first(25).map(role => ({
                label: role.name,
                value: role.id,
                description: role.members.size + " membros",
                emoji: "👤"
            }))
        })
    );

    const navRow = createRow(
        settingsNav.back("roles"),
        settingsNav.main
    );

    return { embeds: [embed], components: [row, navRow] };
} 