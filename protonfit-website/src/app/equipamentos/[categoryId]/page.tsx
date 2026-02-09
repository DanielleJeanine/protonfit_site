import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EquipmentHeroSection from "@/components/equipments/EquipmentHeroSection";
import ProductGrid from "@/components/equipments/ProductGrid";
import { getCategoryById, getProductsByCategoryId } from "@/lib/data";
import { Category, Product } from "@/types";

interface EquipmentCategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export default async function EquipmentCategoryPage({
  params,
}: EquipmentCategoryPageProps) {
  const { categoryId } = await params;
  const id = Number(categoryId);

  if (isNaN(id)) {
    notFound();
  }

  const [categoryResponse, productsResponse] = await Promise.all([
    getCategoryById(id),
    getProductsByCategoryId(id),
  ]);

  if (categoryResponse.status === 404 || !categoryResponse.data) {
    notFound();
  }

  const category = categoryResponse.data;
  const products = productsResponse.data;

  return (
    <div className="bg-pf-black min-h-screen">
      <Header />
      <main>
        <EquipmentHeroSection category={category} />
        <section className="container mx-auto px-4 md:px-8 py-12 md:py-16 flex flex-col md:flex-row gap-8">
            <ProductGrid products={products} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
