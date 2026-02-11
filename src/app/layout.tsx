import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";
import { getPageBySlug } from "@/lib/wpClient";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const acuminPro = localFont({
  src: [
    {
      path: "../../public/font/Acumin-RPro.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/Acumin-ItPro.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/font/Acumin-BdPro.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/Acumin-BdItPro.woff",
      weight: "700",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://pmarquitetura.com.br",
  ),
  title: {
    default:
      "PM Arquitetura | Projetos de Arquitetura e Design de Interiores em São Paulo",
    template: "%s | PM Arquitetura",
  },
  description:
    "Estúdio de arquitetura em São Paulo especializado em projetos residenciais, comerciais e design de interiores. Atendimento personalizado com linguagem contemporânea e minimalista desde 2007.",
  keywords: [
    "arquitetura",
    "design de interiores",
    "arquiteto são paulo",
    "projeto arquitetônico",
    "PM Arquitetura",
    "Paulo Mencarini",
    "Lucas Navarro",
    "arquitetura contemporânea",
    "arquitetura minimalista",
    "reforma residencial",
    "projeto comercial",
  ],
  authors: [{ name: "PM Arquitetura" }],
  creator: "PM Arquitetura",
  publisher: "PM Arquitetura",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "PM Arquitetura",
    title: "PM Arquitetura | Projetos de Arquitetura e Design de Interiores",
    description:
      "Estúdio de arquitetura em São Paulo especializado em projetos residenciais, comerciais e design de interiores. Atendimento personalizado desde 2007.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PM Arquitetura - Estúdio de Arquitetura e Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Arquitetura | Projetos de Arquitetura e Design de Interiores",
    description:
      "Estúdio de arquitetura em São Paulo especializado em projetos residenciais, comerciais e design de interiores.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "código-de-verificação-aqui",
    // yandex: "código-de-verificação-aqui",
  },
};

export const revalidate = 600; // 10 minutes

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerInfo = await getPageBySlug("contato");
  const logoPath = `${process.env.WP_BASE_URL}/pm-arquitetura_logo-site_final/`;
  return (
    <html lang="pt-BR">
      <head>
        <meta name="apple-mobile-web-app-title" content="PM Arquitetura" />
        <link
          rel="canonical"
          href={
            process.env.NEXT_PUBLIC_SITE_URL || "https://pmarquitetura.com.br"
          }
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body
        className={`${acuminPro.className} antialiased bg-white flex flex-col min-h-screen`}
      >
        <Header logoPath={logoPath} />
        <main className="grow">{children}</main>
        <Footer content={footerInfo.content.rendered} className="self-end" />
      </body>
    </html>
  );
}
