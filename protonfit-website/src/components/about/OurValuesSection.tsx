import { Lightbulb, ThumbsUp, ShieldCheck } from 'lucide-react';

export default function OurValuesSection() {
  const values = [
    {
      icon: <Lightbulb className="h-8 w-8 text-pf-black" />,
      title: 'Inovação',
      description: 'Oferecemos ferramentas avançadas que aliam tecnologia, resistência e alto desempenho.',
    },
    {
      icon: <ThumbsUp className="h-8 w-8 text-pf-black" />,
      title: 'Qualidade',
      description: 'Excelência em cada detalhe, desde o design até a entrega final de nossos equipamentos.',
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-pf-black" />,
      title: 'Transparência',
      description: 'Relacionamento de proximidade e confiança com nossos clientes, parceiros e colaboradores.',
    },
  ];

  return (
    <section className="bg-pf-black py-16 md:py-24 text-pf-white">
      <div className="container mx-auto px-6 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-pf-yellow mb-12">Nossos Valores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col items-center p-6 bg-pf-gray rounded-lg shadow-lg">
              <div className="bg-pf-yellow rounded-full p-4 mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{value.title}</h3>
              <p className="text-base text-pf-white-transparent font-sans leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}