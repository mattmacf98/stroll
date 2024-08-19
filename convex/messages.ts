import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
    args: {strollId: v.id("strolls")},
    handler: async (ctx, {strollId}) => {
        return await ctx.db.query("messages").filter((q) => q.eq(q.field("stroll"), strollId)).collect();
    }
})

export const send = mutation({
    args: {content: v.string(), user: v.id("users"), stroll: v.id("strolls")},
    handler: async (ctx, {content, user, stroll}) => {
        return await ctx.db.insert("messages", {content: content, owner: user, stroll: stroll, time: new Date().toISOString()})
    }
})