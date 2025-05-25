import { createResponder, ResponderType, URLStore } from "#base";
import { getIncluideRoles, res, sendTicketLog } from "#functions";
import { menus } from "#menus";
import {
  createLinkButton,
  createRow,
  findChannel,
  limitText,
} from "@magicyan/discord";
import { ChannelType, OverwriteData, TextChannel } from "discord.js";
import { newSelectMenu } from "menus/tickets/main.js";
import { TicketCategory } from "types/TicketCategory.js";

createResponder({
  customId: "tickets/panel/open",
  types: [ResponderType.StringSelect],
  cache: "cached",
  async run(interaction) {
    const { client, guild, member, values } = interaction;
    const selectedCategoryId = values[0] as TicketCategory;
    const guildData = client.mainGuildData;

    // Check for existing tickets in any category
    const allTicketCategories = [
      "donate",
      "whitelist",
      "suporte",
      "streamer",
      "ilegal",
      "legal",
      "bugs",
      "kids",
      "roupas",
      "var",
      "priority",
    ] as const;
    let existingTicketChannel: TextChannel | undefined;

    for (const category of allTicketCategories) {
      const categoryId = guildData.parents?.[category]?.id;
      if (!categoryId) continue;

      const ticketChannel = findChannel(guild)
        .inCategoryId(categoryId)
        .byFilter((c) => Boolean(c.topic?.includes(member.user.id)));

      if (ticketChannel) {
        existingTicketChannel = ticketChannel;
        break;
      }
    }

    if (existingTicketChannel) {
      const row = createRow(
        createLinkButton({
          url: existingTicketChannel.url,
          label: "Abrir ticket",
        })
      );
      await interaction.reply(
        res.danger(`Você já possui um ticket aberto!`, { components: [row] })
      );
      return;
    }

    const ticketParentId = guildData.parents?.[selectedCategoryId]?.id ?? "";
    const ticketParent = findChannel(guild, ChannelType.GuildCategory).byId(
      ticketParentId
    );

    await interaction.reply(
      res.warning(`Aguarde um momento, estamos criando o seu ticket`)
    );
     await interaction.message.edit({
      components: [newSelectMenu],
    }) 
    if (!ticketParent) {
      interaction.editReply(
        res.danger(
          "Esse sistema não está configurado corretamente, contate um administrador"
        )
      );
      return;
    }

    const roles = getIncluideRoles(
      guildData.tickets?.roles?.[selectedCategoryId],
      guild
    );

    const perms: OverwriteData[] = roles.map((role) => ({
      id: role.id,
      allow: ["ViewChannel"],
    }));

    perms.push(
      { id: guild.id, deny: ["ViewChannel"], allow: ["SendMessages"] },
      { id: member.id, allow: ["ViewChannel"] }
    );

    guild.channels
      .create({
        name: `${limitText(member.user.username, 18)}-${selectedCategoryId}`,
        parent: ticketParentId,
        permissionOverwrites: perms,
        topic: member.id,
        type: ChannelType.GuildText,
      })
      .then((channel) => {
        const row = createRow(
          createLinkButton({ url: channel.url, label: "Acessar Ticket" })
        );
        const date = new Date();
        const urlStore = new URLStore(channel.url);
        urlStore.set("ownerId", member.user.id);
        urlStore.set("ownerUsername", member.user.username);
        urlStore.set("category", selectedCategoryId);
        urlStore.set("createdAt", date.toISOString());

        channel.send(menus.tickets.control.main(member, urlStore));
        interaction.editReply(
          res.success(`Ticket criado com sucesso!`, { components: [row] })
        );
        sendTicketLog({
          color: "success",
          guild,
          executor: member,
          text: `Novo ticket aberto na categoria ${selectedCategoryId}`,
        });
      })
      .catch(() => {
        interaction.editReply(res.danger(`Não foi possivel criar o ticket!`));
      });
  },
});
