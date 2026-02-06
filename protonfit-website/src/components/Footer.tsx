import Image from 'next/image';
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-pf-black py-12 border-t border-pf-gray text-pf-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-8">
          <Image src="/images/Logomarca_ProfonFit_Transparente_02.png" alt="ProtonFit" width={160} height={40} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            <div className="flex flex-col items-center text-center space-y-2">
              <FaWhatsapp className="text-pf-yellow h-6 w-6" />
              <p className="font-bold">(95) 9 9124-2800</p>
              <span className="text-pf-gray-medium text-xs">COMERCIAL</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <FaWhatsapp className="text-pf-yellow h-6 w-6" />
              <p className="font-bold">(95) 9 9151-4999</p>
              <span className="text-pf-gray-medium text-xs">SAC</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <FaInstagram className="text-pf-yellow h-6 w-6" />
              <p className="font-bold">@protonfit_oficial</p>
              <span className="text-pf-gray-medium text-xs">INSTAGRAM</span>
            </div>
            
          </div>

          <div className="pt-8 border-t border-pf-gray w-full text-center">
            <p className="text-pf-gray-medium text-xs md:text-sm">
              © 2026 ProtonFit. Todos os direitos reservados. | Desenvolvido por Danielle Jeanine
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}