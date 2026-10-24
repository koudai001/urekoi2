import { myProfileRepository } from "./repository";
import type { CreateProfileInput } from "../../api/myprofile/schema";

export const myProfileService = {
  getProfile,
  createProfile,
};

async function getProfile(userId: string) {
  return myProfileRepository.findProfile(userId);
}

async function createProfile(userId: string, input: CreateProfileInput) {
  return myProfileRepository.createProfile(userId, input);
}
