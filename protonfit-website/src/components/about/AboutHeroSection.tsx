export default function AboutHeroSection() {
  return (
    <section className="relative bg-pf-black text-pf-black min-h-[350px] md:min-h-[450px] flex items-center overflow-hidden py-12 md:py-0">
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/About_Hero_Section.jpg)' }}
      >
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex">
        <div className=" ml-auto w-full md:w-3/5 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 leading-tight">
            FORTALEÇA <br className="block sm:hidden" /> SEU CORPO <br />
            POTENCIALIZE <br className="block sm:hidden" /> SEUS <br className="block sm:hidden" /> RESULTADOS
          </h1>

          <div className="p-5 sm:p-6 inline-block max-w-md">
            <p className="text-lg sm:text-xl md:text-2xl font-sans">
              Mais do que <br className="block sm:hidden" /> equipamentos. <br className="block sm:hidden" /> Movimento, saúde <br className="block sm:hidden" /> e performance <br className="block sm:hidden" />para transformar rotinas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
