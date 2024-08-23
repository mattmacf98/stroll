import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
    args: {id: v.id("users")},
    handler: async (ctx, {id}) => {
        return await ctx.db.query("users").filter((q) => q.eq(q.field("_id"), id)).collect();
    }
})

export const signedInUser = query({
    args: {},
    handler: async (ctx, {}) => {
        const userId = await getAuthUserId(ctx);
        if (userId === null) {
            return null
        }
        return await ctx.db.get(userId)
    }
})


export const resetStrollStatus = mutation({
    args: {},
    handler: async (ctx, {}) => {
        const users = await ctx.db.query("users").collect();
        for (const user of users) {
            await ctx.db.patch(user._id, {strolling: false})
        }
    }
})


export const create = mutation({
    args: { name: v.string(), profilePicId: v.int64() },
    handler: async (ctx, { name, profilePicId }) => {
        const userId = await getAuthUserId(ctx);
        await ctx.db.patch(userId!, { name: name, profilePicId: profilePicId, strolls: [], strolling: true, lastUpdatedTimestamp: new Date().toISOString()});
        return userId;
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
        if (strolls && !strolls.includes(strollId)) {
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
        if (strolls && strolls.includes(strollId)) {
            strolls = strolls.filter(s => s != strollId);
            ctx.db.patch(userId, {strolls: strolls});
        }

        return "DONE"
    }
})