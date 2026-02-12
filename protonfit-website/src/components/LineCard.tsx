import Image from 'next/image';
import Link from 'next/link';

interface LineCardProps {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export default function LineCard({ id, name, description, imageUrl }: LineCardProps) {
  return (
    <div className="bg-pf-black rounded-lg overflow-hidden shadow-lg border border-pf-gray hover:shadow-xl transition-shadow duration-300 text-pf-white">
      <Image src={imageUrl} alt={name} width={300} height={200} objectFit="cover" className="w-full h-48 object-cover object-top" />
      <div className="p-4">
        <h3 className="text-lg font-display font-semibold mb-2">{name}</h3>
        <Link href={`/equipamentos/${id}`}>
          <button className="w-full bg-pf-yellow text-pf-black font-display font-bold py-2 rounded hover:bg-pf-yellow-hover transition-colors">
            VER PRODUTOS
          </button>
        </Link>
      </div>
    </div>
  );
}