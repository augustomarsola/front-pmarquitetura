"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  logoPath: string;
}

export function Header({ logoPath }: HeaderProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/sobre", label: "Sobre" },
    { href: "/projetos", label: "Projetos" },
    { href: "/produtos", label: "Produtos" },
    { href: "/publicacoes", label: "Publicações" },
    { href: "/contato", label: "Contato" },
  ];

  return (
    <header className="flex items-center justify-between px-6 py-4 w-full max-w-5xl mx-auto">
      <div>
        <Link href="/">
          <Image
            src={logoPath}
            alt="Logo PM Arquitetura"
            width={177}
            height={54}
          />
        </Link>
      </div>

      <nav>
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors hover:text-gray-900 ${
                  isActive(link.href)
                    ? "text-gray-900 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="ml-4 flex items-center gap-3">
            <a
              href="https://www.facebook.com/pmarquitetura/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Facebook"
            >
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
              />
            </a>
            <a
              href="https://www.instagram.com/pmarquitetura_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Instagram"
            >
              <Image
                src="/instagram.svg"
                alt="Instagram"
                width={20}
                height={20}
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
