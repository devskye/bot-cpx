import { createCommand } from "#base";
import { res } from "#functions";
import { menus } from "#menus";
import { ApplicationCommandOptionType, ChannelType, codeBlock } from "discord.js";

createCommand({
    name: "status",
    description: "Setup status",
    options:[
        {
            name:"status",
            description:"Fazer o setup do sistema de  status",
            type: ApplicationCommandOptionType.Subcommand,
            options:[
              {
                name:"canal",
                description:"Selecione o canal onde o painel será enviado",
                 type:ApplicationCommandOptionType.Channel,
                 channelTypes:[ChannelType.GuildText],
                 required
              }
             ]
            }
        ],
    
    async run(interaction) {

        const {options} = interaction;
   
        switch(options.getSubcommand(true)){
           case"status":{
              await interaction.deferReply({ephemeral:true});
              const channel = options.getChannel("canal",true,[ChannelType.GuildText]);
              channel.send(menus.status.main())
              
              .then(message=>{
                interaction.editReply(res.success(`✔️ O painel de tickets foi enviado com sucesso! ${message.url}`))
              })
              .catch(err =>{
                interaction.editReply(res.danger(`❌ Ocorreu um erro ao enviar o painel de tickets! ${codeBlock(err)}`))
              } )

              return;
           }
        }

    }
});