import { createResponder, ResponderType, URLStore } from "#base";
import {
  brBuilder,
  createEmbed,
  createLinkButton,
  createRow,
  findMember,
} from "@magicyan/discord";
import { channelMention, EmbedBuilder, Guild, OverwriteType, TextChannel } from "discord.js";
import { res, sendTicketLog } from "#functions";
import { menus } from "#menus";
import { settings } from "#settings";
import { TicketCategory } from "types/TicketCategory.js";
import { icon } from "functions/utils/emojis.js";

createResponder({
  customId: "ticket/control/:action",
  types: [
    ResponderType.UserSelect,
    ResponderType.ChannelSelect,
    ResponderType.StringSelect,
  ],
  cache: "cached",
  async run(interaction, { action }) {
    const { client, guild, values, member } = interaction;

    const channel = interaction.channel as TextChannel;
    const embed = createEmbed({ from: interaction });
    const urlStore = new URLStore(embed.data.url);

    const { ownerId, category } = urlStore.record as {
      ownerId: string;
      category: TicketCategory;
    };
    const ticketOwner = findMember(guild).byId(urlStore.record.ownerId!);

    const [selected] = values;

    switch (action) {
      case "staff": {
        switch (selected) {
          case "notify": {
            interaction.update({});
            if (!ticketOwner) {
              interaction.followUp(res.danger("O dono do ticket não existe"));
              return;
            }
            const embed = createEmbed({
              color: settings.colors.cpx,
              thumbnail: guild.iconURL(),
              description: brBuilder(
                `# ${icon.bell_white} Você está sendo notificado`,
                `${member} está chamando no seu ticket em ${channel.url} `
              ),
              footer: {
                text: "™ CPX © All rights reserved",
                iconURL: guild.iconURL(),
              },
            });
            const row = createRow(
              createLinkButton({
                url: channel.url,
                label: "Acessar ticket",
              })
            );
            ticketOwner
              .send({ embeds: [embed], components: [row] })
              .then(() => {
                interaction.followUp(res.success("Notificado com sucesso"));
                sendTicketLog({
                  color: "warning",
                  guild,
                  executor: member,
                  text: `Notificou o dono do ticket ${channel.name}`,
                });
              })
              .catch(() => {
                interaction.followUp(res.danger("Não foi possivel notificar"));
              });
            return;
          }
          case "add": {
            interaction.update(menus.tickets.control.add());
            return;
          }
          case "remove": {
            const members = guild.members.cache.filter((m) =>
              channel.permissionOverwrites.cache.has(m.id)
            );
            members.delete(urlStore.record.ownerId!);
            if (members.size < 1) {
              await interaction.update({});
              interaction.followUp(
                res.danger("Não há membros para remover desse canal")
              );
            }
            interaction.update(menus.tickets.control.remove(members));
            return;
          }
          case "move": {
            interaction.update(menus.tickets.control.move());
            return;
          }
          case "assume": {
            await channel.setName(member.nickname as string);
            const allowed = [member.user.id, ownerId];

            const overwritesOfMembers =
              channel.permissionOverwrites.cache.filter(
                (po) => po.type === 1 && !allowed.includes(po.id)
              );

            for (const po of overwritesOfMembers.values()) {
              await channel.permissionOverwrites.delete(po.id);
            }
            const overwritesOfRoles = channel.permissionOverwrites.cache.filter(
              (po) => po.type === 0 && !allowed.includes(po.id)
            );

            for (const po of overwritesOfRoles.values()) {
              await channel.permissionOverwrites
                .edit(po.id, {
                  ViewChannel: false,
                })
                .catch(console.error);
            }

            await channel.permissionOverwrites.edit(member.id, {
              ViewChannel: true,
              SendMessages: true,
              ReadMessageHistory: true,
            });
            await channel.permissionOverwrites.edit(ownerId, {
              ViewChannel: true,
              SendMessages: true,
              ReadMessageHistory: true,
            });
            await interaction.reply(
              res.success(`Ticket assumido por ${member.displayName}`)
            );
            //edita o embed setando quem assumiu
            const messages = await channel.messages.fetch({ limit: 10 });
            const panelMessage = messages.find((msg) =>
              msg.embeds?.[0]?.description?.includes("Responsavél pelo Ticket:")
            );
         
            if (panelMessage) {
              const embed = panelMessage.embeds[0];
              const updatedDescription = embed.description?.replace(
                "> **Responsavél pelo Ticket:**\n--",
                `> **Responsavél pelo Ticket:**\n> ${member}`
              );

              const newEmbed = EmbedBuilder.from(embed).setDescription(updatedDescription as string);;

              await panelMessage.edit({ embeds: [newEmbed] });
            }
            return;
          }
        }
      }
      case "add": {
        for (const userId of values) {
          channel.permissionOverwrites.create(userId, { ViewChannel: true });
        }
        await interaction.update(menus.tickets.control.staff(urlStore));
        interaction.followUp(res.success("Membros adicionados com sucesso"));
        sendTicketLog({
          color: "warning",
          guild,
          executor: member,
          text: `Adicionou membros ao ticket ${channel.name}`,
        });
        return;
      }
      case "remove": {
        for (const userId of values) {
          channel.permissionOverwrites.delete(userId);
        }
        await interaction.update(menus.tickets.control.staff(urlStore));
        interaction.followUp(res.success("Membros removidos com sucesso"));
        sendTicketLog({
          color: "warning",
          guild,
          executor: member,
          text: `Removeu membros ao ticket ${channel.name}`,
        });
        return;
      }
      case "move": {
        interaction.update(menus.tickets.control.close(urlStore));
        channel.setParent(selected);
        interaction.followUp(res.success("Ticket movido com sucesso"));
        sendTicketLog({
          color: "warning",
          guild,
          executor: member,
          text: `Ticket ${channel.name} movido para ${channelMention(
            selected
          )}`,
        });
        return;
      }
    }
  },
});
