import { createEvent } from "#base";
import { createInterval } from "@magicyan/discord";
import { channelInfo } from "data/channelInfo.js";
import { getInfoMta, ServerStatus, setPlayersOnline } from "functions/mtaServer/statusServer.js";
import { panelStatus } from "menus/statusMta/main.js";



createEvent({
    name: "Ready handler",
    event: "ready",
    async run(client) {  


        createInterval({
            time: 120000,
            async run() {
            const  res = await getInfoMta() 
        
            const data = new Date()
            const hora = `${data.getHours().toString().padStart(2, "0")}:${data.getMinutes().toString().padStart(2, "0")}:${data.getSeconds().toString().padStart(2, "0")}`
          
            setPlayersOnline(res as ServerStatus,hora)

            const embed = panelStatus();
            const channel = await client.channels.fetch(channelInfo.channelId);

            if (channel?.isTextBased()) {
                try {
                  const message = await channel.messages.fetch(channelInfo.messageId);
                  await message.edit(embed);
                } catch (err) {
                  console.error("Erro ao editar a mensagem do painel:", err);
                }
              }

            }
        })


    },
   
    
});