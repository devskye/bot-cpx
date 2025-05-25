import { settings } from "#settings";
import { Client } from "mtasa";

const mtaservice = new Client(
    settings["BOT-CONNECTION"].host,    // Ex: '127.0.0.1'
    settings['BOT-CONNECTION'].port,     // Ex: 22005
    settings['BOT-CONNECTION'].user,     // Ex: 'bot_user'
    settings['BOT-CONNECTION'].password  // Ex: 'senha_segura'
  );

  export interface ServerStatus {
    getPlayerMax: number;
    getPlayerOn: number;
  }

export async function getInfoMta() {
    try {
      const result: ServerStatus = await mtaservice.call('cpx_bot', 'serverInfo', []);
      return result
    } catch (error) {
      console.error('Erro ao chamar função RPC:', error);
    }
  }

export let serverStatus = {
    playersOnline: 0,
    maxPlayers:0,
    hora:''
  }

export  const setPlayersOnline=(data: ServerStatus,hora:string)=>{
    serverStatus.playersOnline = data.getPlayerOn;
    serverStatus.maxPlayers = data.getPlayerMax;
    serverStatus.hora = hora

}
