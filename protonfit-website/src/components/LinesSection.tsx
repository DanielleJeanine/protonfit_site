import LineCard from "./LineCard";

export default function LinesSection() {
  const lines = [
    {
      imageSrc: '/images/linhas/LinhaCardio.jpg',
      title: 'LINHA CARDIO',
      description: 'Desempenho e resistência.',
    },
    {
      imageSrc: '/images/linhas/LinhaOmega.jpg',
      title: 'LINHA ÔMEGA',
      description: 'Precisão e eficiência.',
    },
    {
      imageSrc: '/images/linhas/LinhaAlfa.jpg',
      title: 'LINHA ALFA',
      description: 'Versatilidade e fluidez.',
    },
    {
      imageSrc: '/images/linhas/LinhaSW.jpg',
      title: 'LINHA SW',
      description: 'Estabilidade e durabilidade.',
    },
    {
      imageSrc: '/images/linhas/LinhaPlateLoadedStar.jpg',
      title: 'PLATE LOADED STAR',
      description: 'Liberdade de movimento e robustez.',
    },
    {
      imageSrc: '/images/linhas/LinhaPlateLoadedGold.jpg',
      title: 'PLATE LOADED GOLD',
      description: 'Alto desempenho e estrutura reforçada.',
    },
    {
      imageSrc: '/images/linhas/LinhaArticuladoresPremium.jpg',
      title: 'ARTICULADORES PREMIUM',
      description: 'Precisão e conforto.',
    },
    {
      imageSrc: '/images/linhas/LinhaLivreArticuladosStar.jpg',
      title: 'LIVRE ARTICULADOS STAR',
      description: 'Controle e precisão.',
    },
  ];
  
  return (
    <section className="bg-pf-black py-16 md:py-24 text-pf-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-pf-yellow mb-12 text-center">Nossas Linhas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8">
           {lines.map((line, index) => (
            <LineCard key={index} {...line} />
          ))}
        </div>
      </div>
    </section>
  );
}