import { settings } from "#settings";
import { createEmbed, findChannel } from "@magicyan/discord";
import { Guild, GuildMember } from "discord.js";


interface TicketsLogsOptions{
    color: keyof typeof settings.colors,
    text:string,
    executor:GuildMember,
    guild:Guild
    title?:string
}

export function  sendTicketLog(optinos:TicketsLogsOptions){

    const {color,text,executor,guild,title} = optinos;
    const guildData = guild.client.mainGuildData;
    const channelId = guildData.channels?.logs?.id ??"";
    const  logsChannnel = findChannel(guild).byId(channelId);

    if(!logsChannnel) return;

        const embed = createEmbed({
                title,color: settings.colors[color],
                description:text,
                footer :{
                   iconURL : executor.displayAvatarURL(),
                   text:`Por ${executor.displayName}`
                }  
        })
    

     logsChannnel.send({embeds:[embed]})


}