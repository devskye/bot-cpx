import { createResponder, ResponderType } from "#base";
import { menus } from "#menus";
import { findChannel } from "@magicyan/discord";
import { ChannelType } from "discord.js";
import { TicketCategory } from "types/TicketCategory.js";

createResponder({
  customId: "settings/:menu/:arg",
  types: [ResponderType.StringSelect, ResponderType.ChannelSelect, ResponderType.RoleSelect, ResponderType.UserSelect, ],
  cache: "cached",
  async run(interaction, { menu, arg }) {
    const { client, guild } = interaction;
    const guildData = client.mainGuildData;
    const [selected] = interaction.values;
  


    switch (menu) {
      case "channels": {
        interaction.update(
          menus.settings.channels.submenu(guildData, selected)
        );
        return;
      }

      case "channel": {
        const { id, url } = findChannel(guild).byId(selected)!;
        guildData.$set(`channels.${arg}`, { id, url });
        interaction.update(menus.settings.channels.main(guildData));
        guildData.save();
        return;
      }

      case "parents": {
        interaction.update(
          menus.settings.parents.submenu(guildData, selected)
        );
        return;
      }
      case "parent": {
        const { id, name } = findChannel(guild, ChannelType.GuildCategory).byId(selected)!;
        guildData.$set(`parents.${arg}`, { id, name });
        interaction.update(menus.settings.parents.main(guildData));
        guildData.save();
        return;
      }
   
      case "roles": {
        switch(arg) {
          case "category": {
            interaction.update(menus.settings.roles.category(guildData, guild, selected as TicketCategory));
            return;
          }
          
      }
      }
    }
}
  
});
