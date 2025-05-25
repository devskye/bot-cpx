import { createResponder, ResponderType } from "#base";
import { menus } from "#menus";
import { TicketCategory } from "types/TicketCategory.js";

createResponder({
    customId: "settings/roles/:action/:category",
    types: [ResponderType.RoleSelect, ResponderType.StringSelect],
    cache: "cached",
    async run(interaction, { action, category }: { action: string; category: TicketCategory }) {
      const { client, guild } = interaction;
      const values = interaction.values;
      const guildData = client.mainGuildData;
  
      // Garante a estrutura com coalescência nula
      /* guildData.tickets ??= { roles: { suporte: [], bugs: [], complaint: [] } };
      guildData.tickets.roles ??= { suporte: [], bugs: [], complaint: [] };
      guildData.tickets.roles[category] ??= [] */; 
      category = category as  TicketCategory;
      const current = guildData.tickets?.roles?.[category] ?? []
     
      if (action === "add") {
        const updated = Array.from(new Set([...current, ...values]));
        guildData.$set(`tickets.roles.${category}`, updated);
      }
  
      if (action === "remove") {
        const filtered = current.filter(role => !values.includes(role));
        guildData.$set(`tickets.roles.${category}`, filtered);
      }
  
      await guildData.save();
      interaction.update(menus.settings.roles.category(guildData, guild, category));
    }
  });
  
