"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";


const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Equipamentos', href: '/equipamentos' },
  { name: 'Sobre Nós', href: '/sobre-nos' },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-pf-black py-4 shadow-md border-b border-pf-gray">
      <nav className="container mx-auto flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center">
            <Image src="/images/Logomarca_ProfonFit_Transparente_02.png" alt="ProtonFit Logo" width={140} height={35} className="w-auto h-8 md:h-10" />
          </div>
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-8 font-display text-base">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href} 
                className={`text-pf-white hover:text-pf-yellow transition-colors font-semibold ${pathname === link.href ? 'text-pf-yellow border-b-2 border-pf-yellow' : ''}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Ações (Carrinho e Menu Mobile) */}
        <div className="flex items-center space-x-4">
          <button className="text-pf-white hover:text-pf-yellow transition-colors relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-pf-yellow text-pf-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
          </button>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-pf-white p-1">
                  <Menu className="h-7 w-7" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-pf-black border-pf-gray text-pf-white w-[280px] pl-3 ">
                <SheetTitle className="text-pf-yellow font-display text-xl mb-8">Menu ProtonFit</SheetTitle>
                <div className="flex flex-col space-y-6 mt-10">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href} 
                      className={`text-xl font-display font-bold hover:text-pf-yellow transition-colors ${pathname === link.href ? 'text-pf-yellow' : ''}`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}

