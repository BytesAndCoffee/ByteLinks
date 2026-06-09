import { getProfile } from "@/lib/profile";
import { profileToMarkdown } from "@/lib/profile-markdown";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const profile = await getProfile();

  return new Response(profileToMarkdown(profile), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": 'inline; filename="profile.md"',
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
