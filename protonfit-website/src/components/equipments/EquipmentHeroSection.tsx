import { Category } from '@/types';

interface EquipmentHeroSectionProps {
  category: Category;
}

export default function EquipmentHeroSection({ category }: EquipmentHeroSectionProps) {
  return (
    <section className="bg-pf-black text-pf-white overflow-x-hidden">
      <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[550px]">
        
        <div 
          className="relative w-full md:w-[45%] h-[300px] md:h-auto bg-cover bg-top flex items-center justify-center" 
          style={{ backgroundImage: `url(${category.imageUrl})` }}
        >
        </div>
        <div className="w-full md:w-[55%] bg-pf-yellow text-pf-black flex flex-col justify-center p-6 sm:p-10 md:p-12 lg:p-16">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-6 leading-tight max-w-[20ch] text-balance">
              {category.name.toUpperCase()}
            </h1>
            
            <div className="space-y-4">
              <p className="text-lg sm:text-xl font-sans font-medium leading-tight border-l-4 border-pf-black pl-4">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
