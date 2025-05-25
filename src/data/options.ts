import { icon } from "functions/utils/emojis.js";

export const options = [
  { emoji: icon.coracao, label: "Donate", value: "donate", description: "Tickets relacionados a doações." },
  { emoji: icon.lista_de_afazeres, label: "Whitelist", value: "whitelist", description: "Tickets relacionados a whitelist." },
  { emoji: icon.cliente, label: "Suporte", value: "suporte", description: "Tickets para suporte geral." },
  { emoji: icon.black_star_silhouette, label: "Streamer", value: "streamer", description: "Tickets para criadores de conteúdo." },
  { emoji: icon.cranio, label: "Ilegal", value: "ilegal", description: "Tickets relacionado ao ilegal." },
  { emoji: icon.martelo_legal, label: "Legal", value: "legal", description: "Tickets relacionado ao legal." },
  { emoji: icon.sem_bugs, label: "Bugs", value: "bugs", description: "Reportar bugs e problemas na cidade." },
  { emoji: icon.bebe2, label: "Kids", value: "kids", description: "Conversar sobre RP kids." },
  { emoji: icon.camisa, label: "Roupas", value: "roupas", description: "Tickets relacionados a roupas e acessórios." },
  { emoji: icon.monitor, label: "Var", value: "var", description: "Outros assuntos diversos." }
] as const;

export const configOptionsParents = [
  { label: "Donate", description: "Categoria de Donate", emoji: "❤️", value: "donate" },
  { label: "Whitelist", description: "Categoria de Whitelist", emoji: "✅", value: "whitelist" },
  { label: "Suporte", description: "Categoria de Suporte", emoji: "🛠️", value: "suporte" },
  { label: "Streamer", description: "Categoria de Streamer", emoji: "⭐", value: "streamer" },
  { label: "Ilegal", description: "Categoria de Ilegal", emoji: "💀", value: "ilegal" },
  { label: "Legal", description: "Categoria de Legal", emoji: "⚖️", value: "legal" },
  { label: "Bugs", description: "Categoria de Bugs", emoji: "🐞", value: "bugs" },
  { label: "Kids", description: "Categoria de Kids", emoji: "👶", value: "kids" },
  { label: "Roupas", description: "Categoria de Roupas", emoji: "👕", value: "roupas" },
  { label: "Var", description: "Categoria de Var", emoji: "🖥️", value: "var" },
  { label: "Prioridade", description: "Categoria de Prioridade", emoji: "❗", value: "priority" }
] as const;


export const configOptionsRoles = [
  { label: "Donate", description: "Categoria de Donate", emoji: "❤️", value: "donate" },
  { label: "Whitelist", description: "Categoria de Whitelist", emoji: "✅", value: "whitelist" },
  { label: "Suporte", description: "Categoria de Suporte", emoji: "🛠️", value: "suporte" },
  { label: "Streamer", description: "Categoria de Streamer", emoji: "⭐", value: "streamer" },
  { label: "Ilegal", description: "Categoria de Ilegal", emoji: "💀", value: "ilegal" },
  { label: "Legal", description: "Categoria de Legal", emoji: "⚖️", value: "legal" },
  { label: "Bugs", description: "Categoria de Bugs", emoji: "🐞", value: "bugs" },
  { label: "Kids", description: "Categoria de Kids", emoji: "👶", value: "kids" },
  { label: "Roupas", description: "Categoria de Roupas", emoji: "👕", value: "roupas" },
  { label: "Var", description: "Categoria de Var", emoji: "🖥️", value: "var" },
  { label: "Prioridade", description: "Categoria de Prioridade", emoji: "❗", value: "priority" }
] as const;
