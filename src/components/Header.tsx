"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FacebookIcon } from "./FacebookIcon";
import { InstagramIcon } from "./InstagramIcon";

interface HeaderProps {
  logoPath: string;
}

export function Header({ logoPath }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const navLinks = [
    { href: "/sobre", label: "Sobre" },
    { href: "/projetos", label: "Projetos" },
    { href: "/produtos", label: "Produtos" },
    { href: "/publicacoes", label: "Publicações" },
    { href: "/contato", label: "Contato" },
  ];

  return (
    <header className="flex items-end justify-between px-6 pb-8 w-full max-w-5xl mx-auto lg:px-0">
      <div>
        <Link href="/">
          <Image
            src={logoPath}
            alt="Logo PM Arquitetura"
            width={177}
            height={54}
            className="mt-4 w-32 md:mt-0 md:w-auto"
          />
        </Link>
      </div>

      {/* Menu Desktop */}
      <nav className="hidden md:block">
        <ul className="flex items-baseline">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors text-xs uppercase border-t-3 hover:border-gray-900 hover:text-gray-900 block px-3 pt-13 mb-4 ${
                  isActive(link.href)
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-600 border-transparent"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="ml-4 flex items-center gap-6">
            <a
              href="https://www.facebook.com/pmarquitetura/"
              target="_blank"
              rel="noopener noreferrer"
              className="fill-gray-600 hover:fill-gray-900 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon width={14} height={14} />
            </a>
            <a
              href="https://www.instagram.com/pmarquitetura_/"
              target="_blank"
              rel="noopener noreferrer"
              className="fill-gray-600 hover:fill-gray-900 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon width={14} height={14} />
            </a>
          </li>
        </ul>
      </nav>

      {/* Menu Mobile */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <button
            aria-label="Abrir menu"
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent side="top" className="w-full">
          <SheetHeader>
            <SheetTitle className="text-left">
              <Link href="/">
                <Image
                  src={logoPath}
                  alt="Logo PM Arquitetura"
                  width={177}
                  height={54}
                  className="w-32 md:mt-0 md:w-auto"
                />
              </Link>
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-6">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`transition-colors text-center text-sm uppercase block py-2 ${
                      isActive(link.href)
                        ? "text-gray-900 font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="flex items-center gap-10 justify-center text-center pb-4">
                <a
                  href="https://www.facebook.com/pmarquitetura/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fill-gray-600 hover:fill-gray-900 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon width={20} height={20} />
                </a>
                <a
                  href="https://www.instagram.com/pmarquitetura_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fill-gray-600 hover:fill-gray-900 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon width={20} height={20} />
                </a>
              </li>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
