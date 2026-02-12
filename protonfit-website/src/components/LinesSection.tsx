"use client";

import { useEffect, useState } from 'react';
import LineCard from './LineCard';
import { getCategories} from '@/lib/data';
import { Category } from '@/types';

export default function LinesSection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      if (response.status === 200) {
        setCategories(response.data || []);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="bg-pf-black py-16 md:py-24 text-pf-white">
      <div className="container mx-auto px-6 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-pf-yellow mb-12">Nossas Linhas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {categories.map((category) => (
            <LineCard 
              key={category.id} 
              id={category.id} 
              name={category.name} 
              description={category.description} 
              imageUrl={category.imageUrl} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}