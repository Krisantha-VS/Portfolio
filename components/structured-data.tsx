import { personalInfo, services, projects } from "@/data/portfolio";

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
    url: typeof window !== "undefined" ? window.location.origin : "",
    sameAs: [personalInfo.social.github, personalInfo.social.linkedin],
    knowsAbout: [
      "C#",
      ".NET",
      "Blazor",
      "ASP.NET Core",
      "SAP Integration",
      "Full Stack Development",
      "Enterprise Application Development",
    ],
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${personalInfo.name} - ${personalInfo.title}`,
    description: personalInfo.description,
    provider: {
      "@type": "Person",
      name: personalInfo.name,
    },
    areaServed: "Worldwide",
    availableLanguage: ["English", "Tamil", "Sinhalese"],
    priceRange: "$80 - $120",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Development Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${personalInfo.name} Portfolio`,
    author: {
      "@type": "Person",
      name: personalInfo.name,
    },
    workExample: projects.map((project) => ({
      "@type": "SoftwareApplication",
      name: project.title,
      description: project.description,
      applicationCategory: project.category,
      offers: {
        "@type": "Offer",
        price: "Custom",
        priceCurrency: "USD",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
    </>
  );
}
