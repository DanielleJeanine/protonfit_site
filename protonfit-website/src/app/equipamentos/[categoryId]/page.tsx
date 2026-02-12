"use client";

import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EquipmentHeroSection from "@/components/equipments/EquipmentHeroSection";
import ProductGrid from "@/components/equipments/ProductGrid";
import { getCategoryById, getProductsByCategoryId } from "@/lib/data";
import { Category, Product } from "@/types";
import { useEffect, useState } from "react";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

export default function EquipmentCategoryPage({ params }: CategoryPageProps) {
  const categoryId = parseInt(params.categoryId, 10);
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // Estado para a página atual (começa em 0)
  const [totalPages, setTotalPages] = useState(0); // Estado para o total de páginas
  const productsPerPage = 12; // Defina o tamanho da página, deve ser o mesmo usado no backend

  useEffect(() => {
    const fetchData = async () => {
      if (isNaN(categoryId)) {
        notFound();
        return;
      }

      // Busca a categoria
      const categoryResponse = await getCategoryById(categoryId);
      if (categoryResponse.status === 404 || !categoryResponse.data) {
        notFound();
        return;
      }
      setCategory(categoryResponse.data);

      // Busca os produtos paginados
      const productsResponse = await getProductsByCategoryId(categoryId, currentPage, productsPerPage);
      if (productsResponse.status === 200 && productsResponse.data) {
        setProducts(productsResponse.data.content);
        setTotalPages(productsResponse.data.totalPages);
      } else {
        setProducts([]);
        setTotalPages(0);
      }
    };
    fetchData();
  }, [categoryId, currentPage]); // Re-executa o efeito quando categoryId ou currentPage muda

  if (!category) {
    return null; // Ou um componente de loading
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Opcional: scroll para o topo da lista de produtos ao mudar de página
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <div className="bg-pf-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <EquipmentHeroSection category={category} />
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 flex flex-col lg:flex-row gap-8">
          {/* Sidebar de Filtro (se houver) */}
          {/* <aside className="w-full lg:w-1/4">
            <EquipmentSidebar currentCategoryId={categoryId} />
          </aside> */}

          {/* Conteúdo Principal: Produtos */}
          <section className="w-full">
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
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}