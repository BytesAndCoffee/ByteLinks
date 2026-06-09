import { readFile } from "node:fs/promises";
import exampleProfile from "@/data/profile.json";

export type Profile = typeof exampleProfile;

export async function getProfile(): Promise<Profile> {
  const profilePath =
    process.env.PROFILE_PATH ??
    "src/data/profile.json";

  return JSON.parse(await readFile(profilePath, "utf8")) as Profile;
}
