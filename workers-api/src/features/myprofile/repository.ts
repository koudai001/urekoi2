import { db } from "../../db";
import { profile } from "../../db/schema";
import type { CreateProfileInput } from "./schema";

type ProfileRow = typeof profile.$inferSelect;

export interface MyProfileRepository {
  createProfile(userId: string, input: CreateProfileInput): Promise<ProfileRow>;
}

export const myProfileRepository: MyProfileRepository = {
  createProfile,
};

async function createProfile(
  userId: string,
  input: CreateProfileInput,
): Promise<ProfileRow> {
  const [created] = await db
    .insert(profile)
    .values({
      userId,
      nickname: input.nickname,
      gender: input.gender,
      birthdate: input.birthdate,
      prefectureCode: input.prefectureCode,
    })
    // そのまま返す
    .returning();

  return created;
}
