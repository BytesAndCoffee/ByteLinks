import { writeFile } from "node:fs/promises";
import profile from "../src/data/profile.json";
import { profileToMarkdown } from "../src/lib/profile-markdown";

await writeFile("PROFILE.md", profileToMarkdown(profile));
console.log("Generated PROFILE.md from src/data/profile.json.");
