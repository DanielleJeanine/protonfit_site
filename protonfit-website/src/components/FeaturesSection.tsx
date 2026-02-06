import { HiOutlineLightBulb } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { LuWrench } from "react-icons/lu";

export default function FeaturesSection() {
  const features = [
    {
      icon: <HiOutlineLightBulb className="text-3xl" />,
      title: 'Inovação Contínua',
      description: 'Tecnologia de ponta em cada equipamento, desenvolvida para máxima performance.',
    },
    {
      icon: <AiOutlineLike className="text-3xl" />,
      title: 'Qualidade Garantida',
      description: 'Materiais premium e acabamento impecável em todos os nossos produtos.',
    },
    {
      icon: <LuWrench className="text-3xl" />,
      title: 'Suporte Profissional',
      description: 'Equipe dedicada para orientar você na escolha perfeita.',
    },
  ];

  return (
    <section className="bg-pf-gray py-16 md:py-24 text-pf-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-display font-bold text-pf-yellow mb-12">Por que escolher ProtonFit?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center p-6">
              <div className="bg-pf-yellow rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-lg shadow-pf-yellow/20">
                <span className="text-3xl text-pf-black">{f.icon}</span>
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{f.title}</h3>
              <p className="text-pf-white-transparent font-sans leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}