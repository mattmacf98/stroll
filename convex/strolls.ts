import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
    args: {strollId: v.id("strolls")},
    handler: async (ctx, {strollId}) => {
        return await ctx.db.query("strolls").filter((q) => q.eq(q.field("_id"), strollId)).collect();
    }
})

export const remove = mutation({
    args: {id: v.id("strolls")},
    handler: async (ctx, {id}) => {
        await ctx.db.delete(id);
    }
})

export const getSignedInUserStrolls = query({
    args: {},
    handler: async (ctx, {}) => {
        const userId = await getAuthUserId(ctx);
        if (userId === null) {
            return []
        }
        const user =  await ctx.db.get(userId);
        const strolls = [];
        
        for (const strollId of user?.strolls || []) {
            const stroll = await ctx.db.get(strollId);
            if (stroll) {
                strolls.push(stroll);
            }
        }

        return strolls;
    }
})


export const create = mutation({
    args: { 
        owner: v.id("users"), title: v.string(), maxSize: v.int64(), burough: v.string(), lat: v.float64(), lng: v.float64(),
        startTime: v.string(), minutes: v.int64()
     },
    handler: async (ctx, { owner, title, maxSize, burough, lng, lat, startTime, minutes }) => {
        const users = await ctx.db.query("users").filter((q) => q.eq(q.field("_id"), owner)).collect();
        if (users.length === 0) {
            // ERROR
            return
        }
        const user = users[0];

        const newStrollId = await ctx.db.insert("strolls", { 
            owner: owner, maxSize: maxSize, strollers: [owner], 
            title: title,
            location: {
                burough: burough,
                lat: lat,
                lng: lng
            },
            startTime: startTime,
            minutes: minutes
        });

        
        ctx.db.patch(user._id, {strolls: [...(user.strolls || []), newStrollId]})
        return newStrollId;
    }
});

export const join = mutation({
    args: {
        userId: v.id("users"),
        strollId: v.id("strolls")
    },
    handler: async (ctx, {userId, strollId}) => {
        const strolls = await ctx.db.query("strolls").filter((q) => q.eq(q.field("_id"), strollId)).collect();
        const users = await ctx.db.query("users").filter((q) => q.eq(q.field("_id"), userId)).collect();
        if (strolls.length === 0 || users.length === 0) {
            // ERROR
            return
        }
        const stroll = strolls[0];
        const user = users[0];

        if (stroll.strollers.length >= stroll.maxSize) {
            // ERROR
            return
        }

        if (!stroll.strollers.includes(userId)) {
            ctx.db.patch(strollId, {strollers: [...stroll.strollers, userId]});
            const curStrolls = user.strolls || [];
            ctx.db.patch(userId, {strolls: [...curStrolls, strollId]})
        }

        return "DONE";
    }
})

export const unjoin = mutation({
    args: {
        userId: v.id("users"),
        strollId: v.id("strolls")
    },
    handler: async (ctx, {userId, strollId}) => {
        const strolls = await ctx.db.query("strolls").filter((q) => q.eq(q.field("_id"), strollId)).collect();
        const users = await ctx.db.query("users").filter((q) => q.eq(q.field("_id"), userId)).collect();
        if (strolls.length === 0 || users.length === 0) {
            // ERROR
            return
        }
        const stroll = strolls[0];
        const user = users[0];

        if (stroll.strollers.includes(userId)) {
            const strollers = stroll.strollers.filter(u => u !== userId)
            ctx.db.patch(strollId, {strollers: strollers});
            let strolls = user.strolls || [];
            strolls = strolls.filter(s => s !== strollId);
            ctx.db.patch(userId, {strolls: strolls})
        }

        return "DONE";
    }
})

export const filter = query({
    args: {
        burough: v.optional(v.string()),
        minutes: v.optional(v.int64())
    },
    handler: async (ctx, {burough, minutes}) => {
        let strollsQuery = ctx.db.query("strolls");

        if (burough !== undefined) {
            strollsQuery = strollsQuery.filter((q) => q.eq(q.field("location.burough"), burough))
        }

        if (minutes !== undefined) {
            strollsQuery = strollsQuery.filter((q) => q.eq(q.field("minutes"), minutes))
        }

        return await strollsQuery.collect();
    }
})