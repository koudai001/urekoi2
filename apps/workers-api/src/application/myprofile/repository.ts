import { eq } from "drizzle-orm";
import { db } from "../../db";
import { profile } from "../../db/schema";
import type { CreateProfileInput } from "../../api/myprofile/schema";

type ProfileRow = typeof profile.$inferSelect;

export interface MyProfileRepository {
  findProfile(userId: string): Promise<ProfileRow | null>;
  createProfile(userId: string, input: CreateProfileInput): Promise<ProfileRow>;
}

export const myProfileRepository: MyProfileRepository = {
  findProfile,
  createProfile,
};

// 見つからなければ null を返す
async function findProfile(userId: string): Promise<ProfileRow | null> {
  const [found] = await db
    .select()
    .from(profile)
    .where(eq(profile.userId, userId))
    .limit(1);

  return found ?? null;
}

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
