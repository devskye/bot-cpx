/* import { TicketCategory } from './../../../../.history/src/types/TicketCategory_20250509230247';

import { createResponder, ResponderType, URLStore } from "#base";
import { getIncluideRoles, res, sendTicketLog } from "#functions";
import {
  createLinkButton,
  createRow,
  findChannel,
  limitText,
} from "@magicyan/discord";
import { ChannelType, OverwriteData } from "discord.js";
import { menus } from "#menus";

createResponder({
  customId: "ticket/panel/open",
  types: [ResponderType.StringSelect],
  cache: "cached",
  async run(interaction) {
    const { client, member, guild, values } = interaction;
    const selected = values[0] as keyof typeof TicketCategory
    console.log("valor",values)
    const guildData = client.mainGuildData;
    const ticketParentId = guildData.parents?.[selected].id ?? "";
    const ticketParent = findChannel(guild, ChannelType.GuildCategory).byId(
      ticketParentId
    );

    await interaction.reply(
      res.warning(`Aguarde um momento, estamos criando o seu ticket`)
    );

    if (!ticketParent) {
      interaction.editReply(
        res.danger(
          "Esse sistema não está configurado corretamente, contate um administrador"
        )
      );
      return;
    }

    const ticketChannel = findChannel(guild)
      .inCategoryId(ticketParentId)
      .byFilter((c) => Boolean(c.topic?.includes(member.user.id)));

    if (ticketChannel) {
      const row = createRow(
        createLinkButton({ url: ticketChannel.url, label: "Abrir ticket" })
      );
      interaction.editReply(
        res.danger(`Você já possui um ticket aberto!`, { components: [row] })
      );
      return;
    }
    const roles = getIncluideRoles(guildData.tickets?.roles, guild);

    const perms: OverwriteData[] = roles.map((role) => ({
      id: role.id,
      allow: ["ViewChannel"],
    }));

    perms.push(
      { id: guild.id, deny: ["ViewChannel"], allow: ["SendMessages"] },
      { id: member.id, allow: ["ViewChannel"] }
    ); // deny : pra todo mundo nega ver o canal e allow pra todo mundo pode enviar msg, logo quem pode enviar msg só é quem ver

    guild.channels
      .create({
        name: `${limitText(member.user.username, 18)}-ticket`,
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
        const urlStore = new URLStore(channel.url); // função pra salvar dados na url
        urlStore.set("ownerId", member.user.id);
        urlStore.set("ownerUsername", member.user.username);

        urlStore.set("createdAt", date.toISOString());
        console.log(urlStore);
        console.log(urlStore.record);
        
        channel.send(menus.tickets.control.main(member, urlStore));
        interaction.editReply(res.success(`Ticket criado com sucesso!`,{components:[row]}));
        sendTicketLog({
            color: "success",guild,executor:member,
            text:"Novo ticket aberto",

        });
      })
      .catch(() => {
        interaction.editReply(res.danger(`Não foi possivel criar o ticket!`));
      });
  },
});
 */