import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    ...authTables,
    users: defineTable({
        email: v.optional(v.string()),
        name: v.optional(v.string()),
        profilePicId: v.optional(v.int64()),
        strolling: v.optional(v.boolean()),
        strolls: v.optional(v.array(v.id("strolls"))),
        lastUpdatedTimestamp: v.optional(v.string())
    }),
    strolls: defineTable({
        owner: v.id("users"),
        title: v.string(),
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