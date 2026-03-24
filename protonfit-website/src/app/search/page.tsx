// src/app/search/page.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/equipments/ProductGrid";
import { searchProducts } from "@/lib/data";
import { Product, PaginatedResponse } from "@/types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 12;

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
    <div className="bg-pf-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-12 md:py-16 text-pf-white">
        <h1 className="text-3xl md:text-4xl font-display font-extrabold text-pf-yellow mb-8 text-center">
          Resultados da Busca por "{query}"
        </h1>

        {loading && <p className="text-center">Carregando resultados...</p>}
        {error && <p className="text-center text-red-500">Erro: {error}</p>}
        {!loading && !error && products.length === 0 && query && (
          <p className="text-center">Nenhum produto encontrado para "{query}".</p>
        )}
        {!loading && !error && products.length === 0 && !query && (
          <p className="text-center">Digite algo para buscar produtos.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <ProductGrid products={products} />

            {/* Controles de Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12 text-pf-white">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="px-4 py-2 rounded-md bg-pf-gray hover:bg-pf-gray-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <span className="text-lg">
                  Página {currentPage + 1} de {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className="px-4 py-2 rounded-md bg-pf-gray hover:bg-pf-gray-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}