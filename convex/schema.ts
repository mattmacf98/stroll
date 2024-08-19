import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        profilePicId: v.int64(),
        strolling: v.optional(v.boolean()),
        strolls: v.array(v.id("strolls")),
        lastUpdatedTimestamp: v.string()
    }),
    strolls: defineTable({
        owner: v.id("users"),
        strollers: v.array(v.id("users")),
        location: v.object({
            burough: v.string(),
            lat: v.float64(),
            lng: v.float64()
        }),
        startTime: v.string(),
        minutes: v.int64(),
        maxSize: v.int64()
    }),
    messages: defineTable({
        stroll: v.id("strolls"),
        owner: v.id("users"),
        time: v.string(),
        content: v.string()
    })
})