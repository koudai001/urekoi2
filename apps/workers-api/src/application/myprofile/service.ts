import { myProfileRepository } from "./repository";
import type { CreateProfileInput } from "../../api/myprofile/schema";

export const myProfileService = {
  createProfile,
};

async function createProfile(userId: string, input: CreateProfileInput) {
  return myProfileRepository.createProfile(userId, input);
}
