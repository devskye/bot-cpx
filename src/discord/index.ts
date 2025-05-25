import { setupCreators } from "#base";

export const { createCommand, createEvent, createResponder } = setupCreators({
    commands:{
        guilds:[process.env.MAIN_GUILD_ID as string]
    }, 
});