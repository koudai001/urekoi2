import { z } from "@hono/zod-openapi";
import { createSelectSchema } from "drizzle-zod";
import { profile } from "../../db/schema/profile";

export const createProfileSchema = z.object({
  nickname: z.string().trim().min(1).max(20),
  gender: z.enum(["male", "female"]),
  birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  prefectureCode: z.number().int().min(1).max(47),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;

export const profileResponseSchema = createSelectSchema(profile);
