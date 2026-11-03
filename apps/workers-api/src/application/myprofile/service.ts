import type { Db } from "../../db";
import { myProfileRepository } from "./repository";
import type { CreateProfileInput } from "../../api/myprofile/schema";

export const myProfileService = {
  getProfile,
  createProfile,
};

async function getProfile(db: Db, userId: string) {
  return myProfileRepository.findProfile(db, userId);
}

async function createProfile(
  db: Db,
  userId: string,
  input: CreateProfileInput,
) {
  return myProfileRepository.createProfile(db, userId, input);
}
