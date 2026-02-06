export default function HeroSection() {
  return (
    <section className="relative bg-pf-black text-pf-white min-h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/Hero_Image.jpg)' }}>
      </div>
      <div className="relative z-10 text-center px-6 md:px-20 max-w-5xl">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-4 leading-tight">
          TECNOLOGIA E INOVAÇÃO <br className="hidden sm:block" />
          <span className="text-pf-yellow">NO MUNDO FITNESS</span>
        </h1>
        <p className="text-base md:text-xl text-pf-white-transparent mb-8 max-w-2xl mx-auto font-sans">
          Equipamentos de alta performance para quem busca excelência e durabilidade extrema.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-pf-yellow text-pf-black font-display font-bold py-3 px-10 rounded hover:bg-pf-yellow-hover transition-all transform hover:scale-105">
            CONHEÇA NOSSOS PRODUTOS
          </button>
        </div>
      </div>
    </section>
  );
}