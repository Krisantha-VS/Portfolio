import { personalInfo, skills, projects } from "@/data/portfolio";

export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    description: personalInfo.description,
    email: personalInfo.email,
    telephone: personalInfo.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wattala",
      addressCountry: "Sri Lanka",
    },
    sameAs: [
      personalInfo.social.github,
      personalInfo.social.linkedin,
    ],
    knowsAbout: [
      ...skills.languages,
      ...skills.frameworks,
      ...skills.databases,
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Buckinghamshire New University",
    },
    worksFor: {
      "@type": "Organization",
      name: "VarioSystems(Pvt) Ltd",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${personalInfo.name} - Full Stack Development Services`,
    description: "Enterprise-scale application development, SAP integration, and full-stack engineering services",
    provider: {
      "@type": "Person",
      name: personalInfo.name,
    },
    serviceType: [
      "Full Stack Development",
      "Enterprise Application Development",
      "SAP Integration",
      "Web Application Development",
      "System Architecture",
    ],
    areaServed: {
      "@type": "Country",
      name: "Worldwide",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Stack Web Development",
            description: "Custom web applications using modern frameworks",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Enterprise SAP Integration",
            description: "Seamless integration with SAP systems",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "System Migration & Optimization",
            description: "Legacy system modernization and performance optimization",
          },
        },
      ],
    },
  };

  const creativeWorkSchema = projects.map((project) => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: {
      "@type": "Person",
      name: personalInfo.name,
    },
    keywords: project.technologies.join(", "),
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {creativeWorkSchema.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
