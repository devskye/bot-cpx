import {  settingsChannelMenu, settingsChannelsMenu } from "./channels.js";
import { settingMainMenu } from "./main.js";
import { settingsParentMenu, settingsParentsMenu } from "./parents.js";
import { settingsRolesCategoryMenu, settingsRolesMenu, settingsRolesRemoveMenu } from "./roles.js";


export const  settingsMenus={
   main:settingMainMenu,
   channels:{
      main: settingsChannelsMenu,
      submenu:settingsChannelMenu
   },
   parents:{
      main:settingsParentsMenu,
      submenu:settingsParentMenu
   },
   roles:{
      main:settingsRolesMenu,
      category:settingsRolesCategoryMenu,
      remove:settingsRolesRemoveMenu
   },


   
}