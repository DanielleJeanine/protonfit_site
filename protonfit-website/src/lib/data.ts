import { Category, Product, ApiResponse } from "@/types";

export const categories: Category[] = [
  {
    id: 1,
    name: "Linha Cardio",
    description: "Aparelhos feitos para quem busca desempenho, resistência e experiência profissional em cada treino. Com esteiras robustas, bicicletas ergométricas e elípticos para alto rendimento.",
    imageUrl: "/images/linhas/LinhaCardio.jpg",
  },
  {
    id: 2,
    name: "Linha Omega",
    description: "Equipamentos de alta performance para treinos intensos e resultados superiores. Durabilidade e design inovador.",
    imageUrl: "/images/linhas/LinhaOmega.jpg",
  },
  {
    id: 3,
    name: "Linha Alfa",
    description: "Foco em força e resistência muscular. Design ergonômico para maximizar o conforto e a eficácia dos exercícios.",
    imageUrl: "/images/linhas/LinhaAlfa.jpg",
  },
  {
    id: 4,
    name: "Linha SW",
    description: "Soluções compactas e eficientes para espaços reduzidos, sem comprometer a qualidade e o desempenho.",
    imageUrl: "/images/linhas/LinhaSW.jpg",
  },
  {
    id: 5,
    name: "Plate Loaded Star",
    description: "Equipamentos de carga livre para um desenvolvimento muscular completo e desafiador. Ideal para atletas e bodybuilders.",
    imageUrl: "/images/linhas/LinhaPlateLoadedStar.jpg",
  },
  {
    id: 6,
    name: "Plate Loaded Gold",
    description: "A linha premium de equipamentos plate loaded, oferecendo o máximo em biomecânica e durabilidade para treinos de elite.",
    imageUrl: "/images/linhas/LinhaPlateLoadedGold.jpg",
  },
  {
    id: 7,
    name: "Articuladores Premium",
    description: "Máquinas articuladas que proporcionam movimentos isolados e seguros, focando na ativação muscular precisa.",
    imageUrl: "/images/linhas/LinhaArticuladoresPremium.jpg",
  },
  {
    id: 8,
    name: "Livre Articulados Star",
    description: "Combinação de liberdade de movimento com a segurança das máquinas articuladas, para um treino versátil e eficaz.",
    imageUrl: "/images/linhas/LinhaLivreArticuladosStar.jpg",
  },
];

export const products: Product[] = [
  // Linha Cardio (categoryId: 1)
  { id: 101, categoryId: 1, name: "Esteira Profissional X100", code: "EST-X100", imageUrl: "/images/BH01.jpg", description: "Esteira de alta performance para uso intenso." },
  { id: 102, categoryId: 1, name: "Bicicleta Ergométrica V200", code: "BIC-V200", imageUrl: "/images/BH01.jpg", description: "Conforto e eficiência para treinos de cardio." },
  { id: 103, categoryId: 1, name: "Elíptico E300", code: "ELI-E300", imageUrl: "/images/BH01.jpg", description: "Movimento suave e completo para todo o corpo." },
  { id: 104, categoryId: 1, name: "Remo Aquático R400", code: "REM-R400", imageUrl: "/images/BH01.jpg", description: "Simulação de remo real com resistência à água." },
  // Linha Omega (categoryId: 2)
  { id: 201, categoryId: 2, name: "Multi-Estação Omega Pro", code: "ME-OPRO", imageUrl: "/images/BH01.jpg", description: "Treino completo de força em um único equipamento." },
  { id: 202, categoryId: 2, name: "Leg Press Omega", code: "LP-OMEGA", imageUrl: "/images/BH01.jpg", description: "Desenvolvimento potente de pernas e glúteos." },
  // Linha Alfa (categoryId: 3)
  { id: 301, categoryId: 3, name: "Supino Reto Alfa", code: "SUP-ALFA", imageUrl: "/images/BH01.jpg", description: "Supino robusto para treino de peito." },
  { id: 302, categoryId: 3, name: "Cadeira Extensora Alfa", code: "CADE-EXT", imageUrl: "/images/BH01.jpg", description: "Foco na extensão de joelhos com segurança." },
  // Linha SW (categoryId: 4)
  { id: 401, categoryId: 4, name: "Rack de Agachamento Compacto SW", code: "RACK-SW", imageUrl: "/images/BH01.jpg", description: "Solução para treino de força em espaços pequenos." },
  // Plate Loaded Star (categoryId: 5)
  { id: 501, categoryId: 5, name: "Peitoral e Deltóide Posterior", code: "PL-PDP", imageUrl: "/images/BH01.jpg", description: "Máquina versátil para peito e ombros." },
  { id: 502, categoryId: 5, name: "Remada Cavalinho", code: "PL-RC", imageUrl: "/images/BH01.jpg", description: "Desenvolvimento de costas com movimento natural." },
  // Plate Loaded Gold (categoryId: 6)
  { id: 601, categoryId: 6, name: "Leg Press Inclinado Gold", code: "PLG-LPI", imageUrl: "/images/BH01.jpg", description: "Leg press de alta capacidade e biomecânica superior." },
  // Articuladores Premium (categoryId: 7)
  { id: 701, categoryId: 7, name: "Crossover Articulado Premium", code: "ART-CP", imageUrl: "/images/BH01.jpg", description: "Treino funcional e isolado para diversos grupos musculares." },
  // Livre Articulados Star (categoryId: 8)
  { id: 801, categoryId: 8, name: "Remada Articulada Star", code: "LAS-RAS", imageUrl: "/images/BH01.jpg", description: "Remada com movimento guiado e livre." },
];

export const getProductById = (id: number): Promise<ApiResponse<Product | undefined>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === id);
      resolve({ data: product, status: product ? 200 : 404 });
    }, 500);
  });
};

export const getCategories = (): Promise<ApiResponse<Category[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: categories, status: 200 });
    }, 500);
  });
};

export const getCategoryById = (id: number): Promise<ApiResponse<Category | undefined>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const category = categories.find((cat) => cat.id === id);
      resolve({ data: category, status: category ? 200 : 404 });
    }, 500);
  });
};

export const getProductsByCategoryId = (categoryId: number): Promise<ApiResponse<Product[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = products.filter((product) => product.categoryId === categoryId);
      resolve({ data: filteredProducts, status: 200 });
    }, 500);
  });
};

export type { Category };
