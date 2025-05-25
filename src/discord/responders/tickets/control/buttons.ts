import { createResponder, ResponderType, URLStore } from "#base";
import {
  brBuilder,
  createEmbed,
  createModalFields,
  findChannel,
  findMember,
} from "@magicyan/discord";
import {
  codeBlock,
   TextChannel,
  TextInputStyle,
  time,
} from "discord.js";
import { getIncluideRoles, res, sendTicketLog } from "#functions";
import { menus } from "#menus";
import { createTranscript, ExportReturnType } from "discord-html-transcripts";
import { settings } from "#settings";

createResponder({
  customId: "ticket/control/:action",
  types: [ResponderType.Button, ResponderType.StringSelect],
  cache: "cached",
  async run(interaction, { action }) {
    const { client, guild, member } = interaction;
    const channel = interaction.channel as TextChannel;
    const embed = createEmbed({ from: interaction });
    const urlStore = new URLStore(embed.data.url);
    const ticketOwner = findMember(guild).byId(urlStore.record.ownerId!);
    const guildData = client.mainGuildData;
    const category = urlStore.record.category;

    if (!category) {
      interaction.reply(res.danger("Categoria do ticket não encontrada"));
      return;
    }

    const allowedRoles = getIncluideRoles(
      guildData.tickets?.roles?.[
        category as keyof typeof guildData.tickets.roles
      ],
      guild
    );

    if (!member.roles.cache.some((r) => allowedRoles.has(r.id))) {
      interaction.reply(
        res.danger("Você não tem permissão para executar essa ação")
      );
      return;
    }

    switch (action) {
      case "staff": {
        interaction.reply(menus.tickets.control.staff(urlStore));
        return;
      }
      case "back": {
        interaction.update(menus.tickets.control.staff(urlStore));
        return;
      }
      case "close": {
        interaction.reply(menus.tickets.control.close(urlStore));

        return;
      }
      case "back-close": {
        interaction.reply(menus.tickets.control.main(member, urlStore));
        return;
      }
      case "transcript": {
        const transcriptChannelId = guildData.channels?.transcripts?.id ?? "";
        const transcriptChannel = findChannel(guild).byId(transcriptChannelId);
        if (!transcriptChannel) {
          interaction.reply(
            res.danger("O canal de transcripts não está definido")
          );
          return;
        }
        await interaction.reply(
          res.warning("Transcrição messagem do canal! Aguarde...")
        );
        const attachment = await createTranscript(channel as never, {
          limit: -1,
          poweredBy: false,
          filename: "ticket-transcript-html",
          returnType: ExportReturnType.Attachment,
          saveImages: true,
        });

        const createdAt = new Date(urlStore.record.createdAt!);

        const transcriptAt = new Date();
        const embed = createEmbed({
          color: settings.colors.primary,
          description: brBuilder(
            `# 📄 Transcrição do ticket`,
            `**Ticket de :** ${ticketOwner ?? "desconhecido"} **@${
              urlStore.record.ownerUsername
            }**`,
            `**Criado em:** ${time(createdAt, "F")}`,
            `**Transcrito em:** ${time(transcriptAt, "F")}`,
            `**Criado por:** ${member}`
          ),
        });
        transcriptChannel
          .send({ embeds: [embed], files: [attachment] })
          .then((message) => {
            interaction.editReply(
              res.success(`Mensagens transcritas com sucesso! ${message.url}`)
            );
            sendTicketLog({
              color: "primary",
              guild,
              executor: member,
              text: `Transcrito o ticket ${channel.name}`,
            });
          })
          .catch((err) => {
            interaction.editReply(
              res.danger(`Erro ao enviar transcrição ${codeBlock(err)}`)
            );
          });
        return;
      }

      case "delete": {
        interaction.showModal({
          customId: "reason/modal",
          title: "Formulário",
          components: createModalFields({
            reason: {
              label: "Considerações finais",
              style: TextInputStyle.Paragraph,
              placeholder: "Digite aqui as considerações finais",
              required: true,
              maxLength: 2000,
            },
          }),
        });

        return;
      }
    }
  },
});
