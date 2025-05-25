
import { createResponder, ResponderType, URLStore } from "#base";
import { res, sendTicketLog } from "#functions";
import { settings } from "#settings";
import { brBuilder, createEmbed, findMember, sleep } from "@magicyan/discord";
import { TextChannel, userMention } from "discord.js";





createResponder({
    customId: "reason/modal",
    types: [ResponderType.ModalComponent],
    cache: "cached",
    async run(interaction) {
      const { fields,guild,member,client } = interaction;

      const reasonCloseTicket = fields.getTextInputValue("reason");
      const channel = interaction.channel as TextChannel;
      const embedInteraction = createEmbed({ from: interaction });
      const urlStore = new URLStore(embedInteraction.data.url);
      const category = urlStore.record.category  
      const ticketOwner = findMember(guild).byId(urlStore.record.ownerId!);
      

        await interaction.reply(
          res.danger("Esse canal será deletado em breve! Aguarde...", {
            components: [],
          })
        );
        if (!ticketOwner) {
          interaction.followUp(res.danger("O dono do ticket não existe"));
          return;
        }

        const embed = createEmbed({
          color: settings.colors.cpx,
          title:"Ticket finalizado",
          thumbnail: guild.iconURL(),
          description: brBuilder(
            `# 🔔 Você está sendo notificado`,
            ` Seu ticket foi fechado por ${member}`,
          
          ),
          
          footer: { text: guild.name, iconURL: guild.iconURL() },
        });

        await ticketOwner.send({ embeds: [embed] }).then(() => {
          interaction.followUp(res.success("Notificado com sucesso"));
          sendTicketLog({
            color: "warning",
            guild,
            executor: member,
            text: `Notificou o dono do ticket ${channel.name}`,
          });
        });

        await sleep(4000);

        await channel.delete().catch(() => {});

        sendTicketLog({
          color: "danger",
          guild,
          executor: member,
          text: `Ticket de ${userMention(channel.topic ?? "")} deletado.`,
        });
        
  
    },
  })