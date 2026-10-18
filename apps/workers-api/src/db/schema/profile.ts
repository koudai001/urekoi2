import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { prefecture } from "./prefecture";

// プロフィール(urekoi(Go版)のmodels.Profileと同じ構成。1ユーザーにつき1件)
export const profile = sqliteTable(
  "profile",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id")
      .notNull()
      .unique()
      .references(() => user.id, { onDelete: "cascade" }),
    nickname: text("nickname").notNull(),
    gender: text("gender", { enum: ["male", "female"] }).notNull(),
    birthdate: text("birthdate").notNull(), // "YYYY-MM-DD"
    prefectureCode: integer("prefecture_code")
      .notNull()
      .references(() => prefecture.code),
    bio: text("bio"),
    occupation: text("occupation"),
    hometown: text("hometown"),
    bloodType: text("blood_type"),
    mbti: text("mbti"),
    bodyType: text("body_type"),
    education: text("education"),
    holiday: text("holiday"),
    alcohol: text("alcohol"),
    smoking: text("smoking"),
    heightCm: integer("height_cm"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("profile_prefectureCode_idx").on(table.prefectureCode)],
);
