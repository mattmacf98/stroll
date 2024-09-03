import { v } from "convex/values";
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

export const updateAllStreaks = mutation({
    args: {},
    handler: async (ctx, {}) => {
        const users = await ctx.db.query("users").collect();

        for (const user of users) {
            const lastLoginTimestamp = user.lastLoginTimestamp;
            if (lastLoginTimestamp === undefined) return;

            const lastLogin = new Date(lastLoginTimestamp).getTime();
            const currentTime = Date.now();
            const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
            const loggedInToday =  currentTime - lastLogin <= twentyFourHoursInMs;

            if (loggedInToday) {
                const currentStreak = Number(user.streak) || 0;
                await ctx.db.patch(user._id, {streak: BigInt(currentStreak + 1)});
            } else {
                await ctx.db.patch(user._id, {streak: BigInt(0)});
            }
        }
    }
})

export const setStrolling = mutation({
    args: { id: v.id("users"), strolling: v.boolean() },
    handler: async (ctx, {id, strolling}) => {
        await ctx.db.patch(id, {strolling: strolling, lastLoginTimestamp: new Date().toISOString()});
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

enum FRIEND_STATUS {
    CONFIRMED = "CONFIRMED",
    PENDING = "PENDING",
    REQUESTED = "REQUESTED"
}

export const requestFriend = mutation({
    args: {otherUserId: v.id("users")},
    handler: async (ctx, {otherUserId}) => {
        const userId = await getAuthUserId(ctx);
        if (userId === null) {
            return null
        }

        const user = await ctx.db.get(userId);
        const otherUser = await ctx.db.get(otherUserId);

        if (!user  || !otherUser) {
            return;
        }

        await ctx.db.patch(user._id, {friends: [ ...(user.friends || []), {user: otherUser._id, status: FRIEND_STATUS.REQUESTED}]});
        await ctx.db.patch(otherUser._id, {friends: [ ...(otherUser.friends || []), {user: user._id, status: FRIEND_STATUS.PENDING}]})
    }
});


export const removeFriend = mutation({
    args: {otherUserId: v.id("users")},
    handler: async (ctx, {otherUserId}) => {
        const userId = await getAuthUserId(ctx);
        if (userId === null) {
            return null
        }

        const user = await ctx.db.get(userId);
        const otherUser = await ctx.db.get(otherUserId);

        if (!user  || !otherUser) {
            return;
        }

        await ctx.db.patch(user._id, {friends: user.friends?.filter(f => f.user !== otherUser._id)});
        await ctx.db.patch(otherUser._id, {friends: otherUser.friends?.filter(f => f.user !== user._id)});
    }
});

export const acceptFriend = mutation({
    args: {otherUserId: v.id("users")},
    handler: async (ctx, {otherUserId}) => {
        const userId = await getAuthUserId(ctx);
        if (userId === null) {
            return null
        }

        const user = await ctx.db.get(userId);
        const otherUser = await ctx.db.get(otherUserId);

        if (!user  || !otherUser) {
            return;
        }

        const frineds = user.friends;
        const friend = frineds?.find(f => f.status === FRIEND_STATUS.PENDING && f.user === otherUser._id);
        if (!friend) {
            return;
        }
        const otherFriends = otherUser.friends;
        const otherFriend = otherFriends?.find(f => f.status === FRIEND_STATUS.REQUESTED && f.user === user._id);
        if (!otherFriend) {
            return;
        }

        friend.status = FRIEND_STATUS.CONFIRMED;
        otherFriend.status = FRIEND_STATUS.CONFIRMED;

        await ctx.db.patch(user._id, {friends: frineds});
        await ctx.db.patch(otherUser._id, {friends: otherFriends});  
    }
})

export const searchByUsername = query({
    args: {userNameQuery: v.string()},
    handler: async (ctx, {userNameQuery}) => {
        const users =  await ctx.db.query("users").collect();
        return users.filter(u => u.name?.includes(userNameQuery));
    }
})