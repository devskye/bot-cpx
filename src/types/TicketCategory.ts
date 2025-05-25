export type TicketCategory =
  | "donate"
  | "whitelist"
  | "suporte"
  | "streamer"
  | "ilegal"
  | "legal"
  | "bugs"
  | "kids"
  | "roupas"
  | "var"
  | "priority";

export type TicketRoles = {
    [K in TicketCategory]: string[];
};
  