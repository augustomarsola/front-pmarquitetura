export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ArchitecturalDesignAgency",
  name: "PM Arquitetura",
  description:
    "Estúdio de arquitetura em São Paulo especializado em projetos residenciais, comerciais e design de interiores desde 2007.",
  url: "https://pmarquitetura.com.br",
  logo: "https://pmarquitetura.com.br/pm-arquitetura_logo-site_final/",
  foundingDate: "2007",
  founder: {
    "@type": "Person",
    name: "Paulo Mencarini",
    jobTitle: "Arquiteto",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Centro Universitário Belas Artes de São Paulo",
    },
  },
  employee: [
    {
      "@type": "Person",
      name: "Paulo Mencarini",
      jobTitle: "Arquiteto Fundador",
    },
    {
      "@type": "Person",
      name: "Lucas Navarro",
      jobTitle: "Arquiteto",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Universidade São Judas Tadeu",
      },
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  areaServed: {
    "@type": "City",
    name: "São Paulo",
  },
  serviceType: [
    "Projetos de Arquitetura",
    "Design de Interiores",
    "Peças Autorais",
    "Projetos Residenciais",
    "Projetos Comerciais",
  ],
  knowsAbout: [
    "Arquitetura Contemporânea",
    "Arquitetura Industrial",
    "Arquitetura Minimalista",
    "Design de Interiores",
    "Projetos Personalizados",
  ],
  sameAs: [
    "https://www.instagram.com/pmarquitetura_/",
    "https://www.facebook.com/pmarquitetura/",
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://pmarquitetura.com.br/#organization",
  name: "PM Arquitetura",
  image: "https://pmarquitetura.com.br/pm-arquitetura_logo-site_final/",
  description:
    "Estúdio de arquitetura em São Paulo com atendimento personalizado, especializado em projetos residenciais e comerciais.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    // Adicionar coordenadas quando disponível
    // latitude: -23.5505,
    // longitude: -46.6333,
  },
  url: "https://pmarquitetura.com.br",
  priceRange: "$$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://pmarquitetura.com.br/#website",
  url: "https://pmarquitetura.com.br",
  name: "PM Arquitetura",
  description:
    "Portfólio de projetos de arquitetura e design de interiores do estúdio PM Arquitetura",
  publisher: {
    "@id": "https://pmarquitetura.com.br/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://pmarquitetura.com.br/projetos?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "pt-BR",
};

export function generateProjectSchema(project: {
  title: string;
  slug: string;
  images: Array<{ src: string; alt: string }>;
  taxonomies: {
    categoria: Array<{ name: string }>;
    local: Array<{ name: string }>;
    ano: Array<{ name: string }>;
  };
  htmlContent: string;
}) {
  const firstParagraph = project.htmlContent
    .replace(/<[^>]*>/g, "")
    .split(".")
    .slice(0, 2)
    .join(".")
    .trim();

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: firstParagraph,
    url: `https://pmarquitetura.com.br/projetos/${project.slug}`,
    image: project.images[0]?.src,
    creator: {
      "@id": "https://pmarquitetura.com.br/#organization",
    },
    datePublished: project.taxonomies.ano[0]?.name,
    about: project.taxonomies.categoria.map((cat) => cat.name),
    locationCreated: {
      "@type": "Place",
      name: project.taxonomies.local[0]?.name || "São Paulo",
    },
    inLanguage: "pt-BR",
  };
}
