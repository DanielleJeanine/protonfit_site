import Image from 'next/image';

interface LineCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

export default function LineCard({ imageSrc, title, description }: LineCardProps) {
  return (
    <div className="bg-pf-gray rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Image src={imageSrc} alt={title} width={300} height={200} objectFit="cover" className="w-full h-48 object-cover object-top" />
      <div className="p-4">
        <h3 className="text-lg font-display font-semibold text-pf-white mb-2">{title}</h3>
        <p className="text-pf-white-transparent text-sm mb-4 font-sans">{description}</p>
        <button className="w-full border border-pf-yellow text-pf-yellow py-2 rounded hover:bg-pf-yellow hover:text-pf-black transition-colors font-display font-bold">
          VER PRODUTOS
        </button>
      </div>
    </div>
  );
}