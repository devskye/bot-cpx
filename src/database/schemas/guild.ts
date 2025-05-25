import { Schema } from "mongoose";
import { t } from "../utils.js";

export const guildSchema = new Schema(
    {
        id: t.string,
        channels: {
            logs: t.channelInfo,
            transcripts: t.channelInfo,
           
        },
        parents:{
            donate: t.parentlInfo,
            whitelist: t.parentlInfo,
            suporte: t.parentlInfo,
            streamer: t.parentlInfo,
            ilegal: t.parentlInfo,
            legal: t.parentlInfo,
            bugs: t.parentlInfo,
            kids: t.parentlInfo,
            roupas: t.parentlInfo,
            var: t.parentlInfo,
            priority: t.parentlInfo,
        },
        tickets:{
            roles: {
                suporte: [String],
                bugs: [String],
                donate: [String],
                whitelist: [String],
                streamer: [String],
                ilegal: [String],
                legal: [String],
                kids: [String],
                roupas: [String],
                var:[String],
                priority: [String],
            }
        },
    },
    {
        statics: {
            async get(id: string) {
                return await this.findOne({ id }) ?? this.create({ id });
            }
        }
    }
);