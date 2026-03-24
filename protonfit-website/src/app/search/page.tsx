// src/app/search/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/equipments/ProductGrid";
import { searchProducts } from "@/lib/data";
import { Product } from "@/types";

// Componente Interno que consome os params
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 12;

  // Resetar página quando a busca mudar
  useEffect(() => {
    setCurrentPage(0);
  }, [query]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await searchProducts(query, currentPage, productsPerPage);
        if (response.status === 200 && response.data) {
          setProducts(response.data.content);
          setTotalPages(response.data.totalPages);
        } else {
          setProducts([]);
          setTotalPages(0);
          setError(response.message || "Erro ao buscar produtos.");
        }
      } catch (err) {
        console.error("Erro na busca:", err);
        setError("Ocorreu um erro ao realizar a busca.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-display font-extrabold text-pf-yellow mb-8 text-center">
        {query ? `Resultados para "${query}"` : "Busca de Produtos"}
      </h1>

      {loading && (
        <div className="flex justify-center py-10">
          <p className="animate-pulse">Carregando resultados...</p>
        </div>
      )}
      
      {error && <p className="text-center text-red-500 bg-red-500/10 p-4 rounded">Erro: {error}</p>}
      
      {!loading && !error && products.length === 0 && (
        <p className="text-center opacity-70">
          {query ? `Nenhum produto encontrado para "${query}".` : "Digite algo para buscar."}
        </p>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <ProductGrid products={products} />
          
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12 text-pf-white">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-4 py-2 rounded-md bg-pf-gray hover:bg-pf-gray-hover disabled:opacity-30 transition-all"
              >
                Anterior
              </button>
              <span className="text-sm md:text-base font-medium">
                Página {currentPage + 1} de {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="px-4 py-2 rounded-md bg-pf-gray hover:bg-pf-gray-hover disabled:opacity-30 transition-all"
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

// Página Principal com o Boundary
export default function SearchPage() {
  return (
    <div className="bg-pf-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-12 md:py-16 text-pf-white">
        <Suspense fallback={<p className="text-center">Preparando busca...</p>}>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
