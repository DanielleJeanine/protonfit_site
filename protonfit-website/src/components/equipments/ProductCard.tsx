"use client"

import Image from 'next/image';
import { Product } from '@/types';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';


interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        code: product.code,
        imageUrl: product.imageUrl,
        quantity: 0,
      },
      1
    );

    alert(`${product.name} adicionado ao orçamento!`);
  };
  return (
    <div className="bg-pf-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 text-pf-black flex flex-col h-full">
      
      {/* Imagem */}
      <div className="relative w-full aspect-square bg-pf-gray-light flex items-center justify-center">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-contain p-4"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div>
          <h3 className="text-lg font-display font-semibold mb-2 line-clamp-2">
            {product.name}
          </h3>

          <p className="text-sm mb-4 font-sans text-pf-gray-medium">
            Código: {product.code}
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <button
          onClick={handleAddToCart} className="w-full bg-pf-yellow text-pf-black font-display font-bold py-2 rounded hover:bg-pf-yellow-hover transition-colors">
            Solicitar Orçamento
          </button>

          <Link href={`/produtos/${product.id}`}>
            <button className="w-full bg-pf-gray text-pf-white font-display font-bold py-2 rounded hover:bg-pf-gray-hover transition-colors">
              Ver Detalhes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
