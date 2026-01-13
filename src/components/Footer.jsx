import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
               <span className="text-2xl font-serif font-black tracking-tighter text-white">
                  TRAVEL<span className="text-secondary">BARCELOS</span>
               </span>
            </div>
            <p className="text-blue-100/80 leading-relaxed mb-6">
              Sua agência de viagens de confiança. Transformando sonhos em destinos inesquecíveis com segurança e qualidade.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/travelbarcelosportugal/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-lg hover:bg-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold mb-6">Contatos</h4>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <MapPin className="h-6 w-6 text-secondary shrink-0" />
                <span className="text-blue-100/80">R. Arquitecto Borges Vinagre 282 A | Edíficio - Sarcoball SL9,<br/> Barcelos, Portugal</span>
              </div>
              <div className="flex gap-4 items-center">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <span className="text-blue-100/80">(+351) 912 099 663</span>
              </div>
              <div className="flex gap-4 items-center">
                 <Mail className="h-5 w-5 text-secondary shrink-0" />
                <span className="text-blue-100/80">reservastravelbarcelos@outlook.pt</span>
              </div>
            </div>
          </div>

          {/* Quick Links (Simplified) */}
          <div>
            <h4 className="text-xl font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-blue-100/80 hover:text-white hover:translate-x-1 transition-all inline-block">Início</a></li>
              <li><a href="/destinos" className="text-blue-100/80 hover:text-white hover:translate-x-1 transition-all inline-block">Destinos</a></li>
              <li><a href="/ofertas" className="text-blue-100/80 hover:text-white hover:translate-x-1 transition-all inline-block">Ofertas</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-blue-100/40 text-sm">
          <p>&copy; {new Date().getFullYear()} Travel Barcelos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
