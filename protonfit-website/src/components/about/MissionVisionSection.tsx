import { Target, Eye } from 'lucide-react';

export default function MissionVisionSection() {
  return (
    <section className="bg-pf-gray py-16 md:py-24 text-pf-white">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-center items-start md:space-x-12 space-y-12 md:space-y-0">

          <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-pf-yellow rounded-full p-4">
                <Target className="h-8 w-8 text-pf-black" />
              </div>
              <h3 className="text-2xl font-display font-bold text-pf-yellow">
                Missão
              </h3>
            </div>

            <p className="text-base text-pf-white-transparent leading-relaxed font-sans">
              Promover saúde, bem-estar e desempenho por meio de equipamentos inovadores,
              seguros, eficientes e confiáveis, proporcionando uma experiência fitness para
              pessoas e ambientes.
            </p>
          </div>

          
          <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left md:border-l md:border-pf-gray-medium md:pl-12">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-pf-yellow rounded-full p-4">
                <Eye className="h-8 w-8 text-pf-black" />
              </div>
              <h3 className="text-2xl font-display font-bold text-pf-yellow">
                Visão
              </h3>
            </div>

            <p className="text-base text-pf-white-transparent leading-relaxed font-sans">
              Ser referência no mercado fitness, reconhecida pela qualidade e confiabilidade
              dos produtos, pela inovação constante e pela construção de relacionamentos
              sólidos e duradouros com nossos clientes.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
