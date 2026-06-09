import Image from "next/image";
import { getProfile } from "@/lib/profile";

const accents = ["lime", "violet", "orange"];

export const dynamic = "force-dynamic";
export const revalidate = 0;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default async function Home() {
  const profile = await getProfile();
  const primaryLinks = profile.links.filter((link) => link.primary);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": profile.structuredData.schemaOrgType,
    name: profile.name,
    alternateName: profile.handle,
    description: profile.shortBio,
    image: profile.avatar,
    url: profile.links.find((link) => link.label === "Website")?.url,
    sameAs: profile.structuredData.sameAs,
    knowsAbout: profile.structuredData.knowsAbout,
    worksFor: {
      "@type": "Organization",
      name: profile.structuredData.worksFor.name,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="ambient ambientOne" />
      <div className="ambient ambientTwo" />

      <section className="shell">
        <header className="profile">
          <div className="topline">
            <span className="availability">
              <span className="pulse" />
              Self-hosted and online
            </span>
            <span className="coordinates">{profile.location}</span>
          </div>

          <div className="identity">
            <Image
              className="avatar"
              src={profile.avatar}
              alt={`${profile.name} profile photo`}
              width={104}
              height={104}
              priority
            />
            <div>
              <p className="kicker">{profile.publicSummary.slice(0, 3).join(" · ")}</p>
              <h1>
                {profile.name.split(" ")[0]}
                <span> {profile.name.split(" ").slice(1).join(" ")}</span>
              </h1>
              <p className="handle">@{profile.handle}</p>
              <p className="intro">{profile.tagline}</p>
            </div>
          </div>
        </header>

        <nav className="links" aria-label="Primary links">
          {primaryLinks.map((link, index) => (
            <a
              className={`linkCard ${accents[index % accents.length]}`}
              href={link.url}
              key={link.url}
              rel="noreferrer"
              target="_blank"
            >
              <span className="index">0{index + 1}</span>
              <span className="linkCopy">
                <span className="eyebrow">Find me online</span>
                <strong>{link.label}</strong>
                <span className="description">{link.url.replace("https://", "")}</span>
              </span>
              <span className="arrow">
                <ArrowIcon />
              </span>
            </a>
          ))}
        </nav>

        <section className="about panel" aria-labelledby="about-heading">
          <p className="sectionLabel">About / 01</p>
          <h2 id="about-heading">Capture the signal. Automate the boring parts.</h2>
          <p>{profile.shortBio}</p>
          <div className="tags" aria-label="Focus areas">
            {profile.skills.focusAreas.slice(0, 5).map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </section>

        <section className="projects" aria-labelledby="projects-heading">
          <div className="sectionHeading">
            <div>
              <p className="sectionLabel">Selected work / 02</p>
              <h2 id="projects-heading">Useful things I&apos;ve built</h2>
            </div>
            <span>{profile.featuredProjects.length} projects</span>
          </div>

          <div className="projectGrid">
            {profile.featuredProjects.map((project, index) => (
              <a
                className="projectCard"
                href={project.url}
                key={project.url}
                rel="noreferrer"
                target="_blank"
              >
                <span className="projectNumber">0{index + 1}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <span className="projectTags">{project.tags.join(" / ")}</span>
                <span className="projectArrow">
                  <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        </section>

        <footer>
          <span>Self-hosted in {profile.location.split(",")[0]}</span>
          <span className="footerMark">{profile.handle} / 2026</span>
        </footer>
      </section>
    </main>
  );
}
