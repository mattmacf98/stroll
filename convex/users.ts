import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
    args: {id: v.id("users")},
    handler: async (ctx, {id}) => {
        return await ctx.db.query("users").filter((q) => q.eq(q.field("_id"), id)).collect();
    }
})

export const create = mutation({
    args: { name: v.string(), profilePicId: v.int64() },
    handler: async (ctx, { name, profilePicId }) => {
      const newUserId = await ctx.db.insert("users", { name: name, profilePicId: profilePicId, strolls: [], lastUpdatedTimestamp: new Date().toISOString()});
      return newUserId;
    }
});

export const setStrolling = mutation({
    args: { id: v.id("users"), strolling: v.boolean() },
    handler: async (ctx, {id, strolling}) => {
        await ctx.db.patch(id, {strolling: strolling});
    }
})

export const addStroll = mutation({
    args: {userId: v.id("users"), strollId: v.id("strolls")},
    handler: async (ctx, {userId, strollId}) => {
        const users = await ctx.db.query("users").filter((q) => q.eq(q.field("_id"), userId)).collect();
        if (users.length === 0){
            // ERROR
            return;
        }
        const user = users[0];

        const strolls = user.strolls;
        if (!strolls.includes(strollId)) {
            ctx.db.patch(userId, {strolls: [...strolls, strollId]});
        }

        return "DONE"
    }
})

export const leaveStroll = mutation({
    args: {userId: v.id("users"), strollId: v.id("strolls")},
    handler: async (ctx, {userId, strollId}) => {
        const users = await ctx.db.query("users").filter((q) => q.eq(q.field("_id"), userId)).collect();
        if (users.length === 0){
            // ERROR
            return;
        }
        const user = users[0];

        let strolls = user.strolls;
        if (strolls.includes(strollId)) {
            strolls = strolls.filter(s => s != strollId);
            ctx.db.patch(userId, {strolls: strolls});
        }

        return "DONE"
    }
})