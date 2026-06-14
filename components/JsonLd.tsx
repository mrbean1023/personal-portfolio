import {
  siteMeta,
  contact,
  socialLinks,
  timeline,
  skillCategories,
} from "@/data/portfolio";

/**
 * Schema.org Person structured data (JSON-LD).
 *
 * Helps search engines render a rich result for the author's name and
 * link the verified social profiles. Built entirely from data/portfolio.ts
 * so it stays in sync with the rest of the site automatically.
 */
export default function JsonLd() {
  const alumniOf = timeline
    .filter((entry) => entry.kind === "education")
    .map((entry) => ({
      "@type": "CollegeOrUniversity" as const,
      name: entry.organization,
    }));

  // Professional title for search rich results. Kept explicit (rather than
  // derived from a degree name) so it reads as a role, not a qualification.
  const jobTitle = "Software Engineer";

  const knowsAbout = Array.from(
    new Set(
      skillCategories.flatMap((category) =>
        category.skills.map((skill) => skill.name),
      ),
    ),
  );

  const sameAs = socialLinks
    .filter((link) => link.platform !== "mail")
    .map((link) => link.href);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteMeta.author,
    url: siteMeta.url,
    email: `mailto:${contact.email}`,
    jobTitle,
    description: siteMeta.description,
    alumniOf,
    knowsAbout,
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inject; no user-controlled input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
