
import { ticketControlPanel } from "./control/main.js";
import { ticketsMainPanel } from "./main.js";
import { ticketStaffPanel } from "./control/staff.js";
import { ticketAddPanel } from "./control/add.js";
import { ticketRemovePanel } from "./control/remove.js";
import { ticketClosePanel } from "./control/close.js";
import { ticketMovePanel } from "./control/move.js";
import { ticketDeletePanel } from "./control/delete.js";

export const ticketsMenu = {
    main: ticketsMainPanel,
    control:{
        main:ticketControlPanel,
        staff:ticketStaffPanel,
        add:ticketAddPanel,
        remove:ticketRemovePanel,
        close:ticketClosePanel,
        move:ticketMovePanel,
        delete:ticketDeletePanel
    }
} 