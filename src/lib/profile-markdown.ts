import type { Profile } from "@/lib/profile";

const list = (items: string[]) => items.map((item) => `- ${item}`).join("\n");

export function profileToMarkdown(profile: Profile) {
  return `# ${profile.displayName}

![${profile.name}](${profile.avatar})

> ${profile.tagline}

**Location:** ${profile.location}  
**Timezone:** ${profile.timezone}

## About

${profile.bio}

## At A Glance

${list(profile.publicSummary)}

## Skills

### Languages

${list(profile.skills.languages)}

### Tools

${list(profile.skills.tools)}

### Focus Areas

${list(profile.skills.focusAreas)}

## Featured Projects

${profile.featuredProjects
  .map(
    (project) => `### [${project.name}](${project.url})

${project.description}

_${project.tags.join(" · ")}_`,
  )
  .join("\n\n")}

## Links

${profile.links.map((link) => `- [${link.label}](${link.url})`).join("\n")}

## Interests

${list(profile.interests)}
`;
}
