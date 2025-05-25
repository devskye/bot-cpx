import { bootstrap } from "#base";
import { db } from "#database";


await bootstrap({ meta: import.meta,
   async whenReady(client){
     const mainGuildData = await db.guilds.get(process.env.MAIN_GUILD_ID as string);
     Object.assign( client, { mainGuildData });
    }
    
 });