import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
      users: defineTable({
            username: v.string(),
            email: v.string(),
            password: v.string(),
            imgUrl:v.optional(v.string())
      }),
      session: defineTable({
            session: v.string(),
            userId: v.id("users")
      })
})