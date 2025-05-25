
import { settings } from "#settings";
import {  createEmbed, createRow } from "@magicyan/discord";
import {  BANNER_TESTE, THUMBNAIL_URL } from "data/assets.js";
import { ButtonBuilder, ButtonStyle} from "discord.js";
import { serverStatus } from "functions/mtaServer/statusServer.js";


export const panelStatus = () => {
  const { maxPlayers, playersOnline,hora } = serverStatus;
  
  const embed = createEmbed({
    color: settings.colors.cpx,
    author: {
      name: "CPX • Status do servidor",
      iconURL: "https://i.imgur.com/51t926N.png",
    },
    thumbnail: THUMBNAIL_URL,
    image: BANNER_TESTE,
    fields: [
      {
        name: "> __**Status:**__",
        value: "```🟢 ONLINE```",
        inline: true,
      },
      {
        name: "> __**Jogadores:**__",
        value: `\`\`\`[ ${playersOnline} / ${maxPlayers} ]\`\`\``,
        inline: true,
      },
      {
        name: "> __**IP FiveM:**__",
        value: "```connect ladolesterp.com```",
        inline: false,
      },
    ],
    footer:{
        text:`Atualizando a cada 2 minutos | Ultima atualização: ${hora}`
    }
  });
  const row = createRow(
    new ButtonBuilder({
      style:ButtonStyle.Link,
      url:""
      
    })
  )
  return { embeds: [embed], components:[row] };
};
