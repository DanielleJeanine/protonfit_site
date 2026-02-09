"use client";

import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { getProductById } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { use, useState, useEffect } from 'react';
import type { Product } from "@/types";


interface ProductDetailPageProps {
  params: {
    productId: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const id = Number(params.productId);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (isNaN(id)) {
        notFound();
        return;
      }
      const productResponse = await getProductById(id);
      if (productResponse.status === 404 || !productResponse.data) {
        notFound();
        return;
      }
      setProduct(productResponse.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return null; 
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(
        {
          id: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          quantity: 0,
        },
        quantity
      );
      alert(`${quantity}x ${product.name} adicionado(s) ao orçamento!`);
    }
  };

  return (
    <div className="bg-pf-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="bg-pf-black rounded-lg shadow-lg p-6 md:p-10 lg:p-12 flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Imagem do Produto */}
          <div className="w-full md:w-1/2 flex justify-center items-center bg-white rounded-lg p-4">
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              width={500} 
              height={500} 
              objectFit="contain" 
              className="max-w-full h-auto"
            />
          </div>

          {/* Detalhes do Produto */}
          <div className="w-full md:w-1/2 text-pf-white">
            <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-4 leading-tight">
              {product.name}
            </h1>
            <hr className="border-pf-gray mb-6" />

            <p className="text-lg font-sans mb-2">
              <span className="font-bold">Código:</span> {product.code}
            </p>
            <p className="text-lg font-sans mb-6">
              <span className="font-bold">Descrição:</span> {product.description}
            </p>

            {/* Seletor de Quantidade */}
            <div className="flex items-center gap-4 mb-6">
              <label htmlFor="quantity" className="text-lg font-bold">Quantidade:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                className="w-20 p-2 rounded bg-pf-gray text-pf-white border border-pf-gray-hover text-center"
              />
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-pf-yellow text-pf-black font-display font-bold py-3 rounded hover:bg-pf-yellow-hover transition-colors text-lg"
            >
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}