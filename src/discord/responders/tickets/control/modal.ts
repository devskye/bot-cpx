import { createResponder, ResponderType, URLStore } from "#base";
import { res, sendTicketLog } from "#functions";
import { settings } from "#settings";
import { brBuilder, createEmbed, findChannel, findMember, sleep } from "@magicyan/discord";
import { createTranscript, ExportReturnType } from "discord-html-transcripts";
import { TextChannel, userMention, time, codeBlock } from "discord.js";

import { PanelTicketCompleted } from "ui/PanelTicketCompleted.js";

createResponder({
  customId: "reason/modal",
  types: [ResponderType.ModalComponent],
  cache: "cached",
  async run(interaction) {
    const { fields, guild, member, client } = interaction;

    const reasonCloseTicket = fields.getTextInputValue("reason");
    const guildData = client.mainGuildData;
    const channel = interaction.channel as TextChannel;
    const embedInteraction = createEmbed({ from: interaction });
    const urlStore = new URLStore(embedInteraction.data.url);
    const ticketOwner = findMember(guild).byId(urlStore.record.ownerId!);
    const id = urlStore.record.id;

    await interaction.reply(
      res.danger(`Esse canal será deletado em breve! Aguarde...`, {
        components: [],
      })
    );

    if (!ticketOwner) {
      interaction.followUp(res.danger("O dono do ticket não existe"));
      return;
    }

    const transcriptChannelId = guildData.channels?.transcripts?.id ?? "";
    const transcriptChannel = findChannel(guild).byId(transcriptChannelId);
    if (!transcriptChannel) {
      interaction.followUp(res.danger("O canal de transcripts não está definido"));
      return;
    }

    await interaction.followUp(
      res.warning("Transcrição das mensagens do canal! Aguarde...")
    );

    // Criação do transcript
    const attachment = await createTranscript(channel as never, {
      limit: -1,
      poweredBy: false,
      filename: "ticket-transcript.html",
      returnType: ExportReturnType.Attachment,
      saveImages: true,
    });

    const createdAt = new Date(urlStore.record.createdAt!);
    const transcriptAt = new Date();
    const embed = createEmbed({
      color: settings.colors.primary,
      description: brBuilder(
        `# 📄 Transcrição do ticket`,
        `**Ticket de :** ${ticketOwner ?? "desconhecido"} **@${urlStore.record.ownerUsername}**`,
        `**Criado em:** ${time(createdAt, "F")}`,
        `**Transcrito em:** ${time(transcriptAt, "F")}`,
        `**Criado por:** ${member}`
      ),
    });

    // Envia o transcript e captura o link
    let transcriptUrl: string | undefined;
    try {
      const transcriptMessage = await transcriptChannel.send({
        embeds: [embed],
        files: [attachment]
      });

      transcriptUrl = transcriptMessage.attachments.first()?.url;

      sendTicketLog({
        color: "primary",
        guild,
        executor: member,
        text: `Transcrito o ticket ${channel.name}`,
      });

    } catch (err) {
      console.error(err);
    }

   
    const message = PanelTicketCompleted(
      guild,
      reasonCloseTicket,
      ticketOwner,
      member,
      id as string,
      transcriptUrl 
    );

    await ticketOwner.send(message).then(() => {
      interaction.followUp(res.success(`Notificado com sucesso`));
      sendTicketLog({
        color: "warning",
        guild,
        executor: member,
        text: `Notificou o dono do ticket ${channel.name}`,
      });
    });

    sendTicketLog({
      color: "danger",
      guild,
      executor: member,
      text: `Ticket de ${userMention(channel.topic ?? "")} deletado.`,
    });

    await sleep(4000);
    await channel.delete().catch(() => {});
  }
});
