import { Guild } from "discord.js";

export function getIncluideRoles(idList: string[] | undefined, guild: Guild) {
    console.log(typeof idList)
    return guild.roles.cache.filter(role => idList?.includes(role.id)); 
} 