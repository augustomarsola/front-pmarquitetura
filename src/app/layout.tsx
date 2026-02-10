import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
  title: "PM Arquitetura",
  description: `
  O estúdio PM Arquitetura foi fundado em 2007 pelo arquiteto Paulo Mencarini.

  Formado pelo Centro Universitário Belas Artes de São Paulo. Desenvolvemos projetos de arquitetura, design de interiores e peças autorais. Desde 2019, o arquiteto Lucas Navarro integra a equipe. Formado pela Universidade São Judas Tadeu (anual – Mooca) onde desenvolveu monitoria de projeto e posterior estagio acadêmico para o Do.co.mo.mo_sp.
`,
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
