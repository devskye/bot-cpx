import { createResponder, ResponderType } from "#base";
import { menus } from "#menus";

createResponder({
  customId: "settings/:menu",
  types: [ResponderType.Button, ResponderType.ChannelSelect],
  cache: "cached",
  async run(interaction, { menu }) {
    const {client,guild}= interaction;
    const guildData = client.mainGuildData;
   

    switch (menu) {
      case "main": {
        interaction.update(menus.settings.main());
        return;
      }
      case "channels": {
         interaction.update(menus.settings.channels.main(guildData));
        return;
      }
      case "roles": {
        interaction.update(menus.settings.roles.main(guildData,guild));
        return;
      }
      case "parents": {
        interaction.update(menus.settings.parents.main(guildData));
        return;
      }
    }
  },
});
