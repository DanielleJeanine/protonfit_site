"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, X, ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCategories } from "@/lib/data";
import { Category } from "@/types";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Sobre Nós", href: "/sobre-nos" },
  { name: "Fale Conosco", href: "/contato" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartItemCount } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Função de busca
  const handleSearch = () => {
    const query = searchTerm.trim();
    if (query) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
      console.log("Pesquisando por:", query);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      if (response.status === 200 && response.data) {
        setCategories(response.data);
      }
    };
    fetchCategories();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-pf-black py-4 shadow-md border-b border-pf-gray">
      <nav className="container mx-auto flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/images/Logomarca_ProfonFit_Transparente_02.png"
              alt="ProtonFit Logo"
              width={140}
              height={35}
              className="w-auto h-8 md:h-10"
            />
          </div>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-8 font-display text-base">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-pf-white hover:text-pf-yellow transition-colors font-semibold ${
                pathname === link.href ? "text-pf-yellow border-b-2 border-pf-yellow" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Dropdown de Equipamentos */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`flex items-center text-pf-white hover:text-pf-yellow transition-colors font-semibold ${
                pathname.startsWith("/equipamentos") ? "border-b-2 border-pf-yellow" : ""
              }`}
            >
              Equipamentos <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-pf-black border-pf-gray text-pf-white">
              {categories.map((category) => (
                <DropdownMenuItem key={category.id}>
                  <Link
                    href={`/equipamentos/${category.id}`}
                    className="block w-full hover:text-pf-yellow"
                  >
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Barra de Pesquisa Desktop */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-60 text-white placeholder-gray-400"
                  autoFocus
                />
                {/* Botão de lupa para buscar */}
                <Button onClick={handleSearch} variant="secondary">
                  <Search />
                </Button>
                {/* Botão para fechar a pesquisa */}
                <Button onClick={() => setIsSearchOpen(false)} variant="secondary" >
                  <X />
                </Button>
              </div>
            ) : (
              <button onClick={() => setIsSearchOpen(true)}>
                <Search className="text-pf-white hover:text-pf-yellow" />
              </button>
            )}
          </div>
        </div>

        {/* Carrinho e Menu Mobile */}
        <div className="flex items-center gap-4">
          {/* Carrinho Desktop */}
          <div className="hidden md:flex items-center relative">
            <Link href="/checkout">
              <ShoppingCart className="cursor-pointer text-pf-white hover:text-pf-yellow" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2 relative">
            {/* Botão Pesquisa Mobile */}
            <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="text-pf-white hover:text-pf-yellow" />
            </button>

            {isSearchOpen && (
              <div className="absolute top-full left-0 w-full px-4 mt-2 bg-pf-black flex items-center gap-2 z-50">
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  autoFocus
                  className="text-white placeholder-gray-400"
                />
                <Button onClick={handleSearch}>
                  <Search />
                </Button>
                <Button onClick={() => setIsSearchOpen(false)}>
                  <X />
                </Button>
              </div>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <button className="text-pf-white p-1">
                  <Menu className="h-7 w-7" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-pf-black border-pf-gray text-pf-white w-[280px] pl-3"
              >
                <SheetTitle className="text-pf-yellow font-display text-xl mb-8">
                  Menu ProtonFit
                </SheetTitle>
                <div className="flex flex-col space-y-6 mt-10">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-xl font-display font-bold hover:text-pf-yellow transition-colors ${
                        pathname === link.href ? "text-pf-yellow" : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  {/* Categorias Mobile */}
                  <div className="border-t border-pf-gray-medium pt-4 mt-4">
                    <h4 className="text-pf-yellow font-display font-bold mb-2">
                      Linhas de Equipamentos
                    </h4>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/equipamentos/${category.id}`}
                        className={`block py-2 text-lg font-display hover:text-pf-yellow transition-colors ${
                          pathname === `/equipamentos/${category.id}` ? "text-pf-yellow" : ""
                        }`}
                      >
                        {category.name}
                      </Link>
                    ))}
                    <div className="mt-4 relative">
                      <Link href="/checkout">
                        <ShoppingCart className="cursor-pointer hover:text-pf-yellow" />
                        {cartItemCount > 0 && (
                          <span className="absolute -top-3 right bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemCount}
                          </span>
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}