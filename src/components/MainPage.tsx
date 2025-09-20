import Header from './Header';
import HeroSection from './HeroSection';
import NewsSection from './NewsSection';
import CalendarSection from './CalendarSection';
import TeamSection from './TeamSection';
import EventsSection from './EventsSection';
import MagazineSection from './MagazineSection';
import ResourceLinksSection from './ResourceLinksSection';
import { 
  Facebook, 
 
  Instagram, 
  Linkedin, 
  Music,
  Mail,
  MapPin,
  Phone, 
  FileText
} from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl mb-4">NMATH</h3>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/nmath_ist" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Music className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          
          <div>
            <h4 className="mb-4">Acesso Rápido</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#news" className="hover:text-white transition-colors">Anúncios</a></li>
              <li><a href="https://drive.google.com/drive/folders/1nmath-repo-example" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Repositório</a></li>
              <li><a href="#calendar" className="hover:text-white transition-colors">Calendário de Eventos</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">Equipa</a></li>
              <li><a href="#magazine" className="hover:text-white transition-colors">Ponto Fixo</a></li>
              <li>
                <a 
                  href="https://drive.google.com/file/d/1bz51RRJGDGnmMCrDUdgws43MKJ7kxvdz/view?usp=share_link" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center space-x-2"
                >
                  <FileText className="h-4 w-4" /> 
                  <span>Regulamento NMATH</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4">Contacta-nos</h4>
            <div className="space-y-3 text-slate-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a 
                  href="mailto:nmath.geral@gmail.com" 
                  className="hover:text-white transition-colors"
                >
                  nmath.geral@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Instagram className="h-4 w-4" />
                <a 
                  href="https://instagram.com/nmath_ist" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @nmath_ist
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Campus Alameda do IST <br />Av. Rovisco Pais 1, 1049-001, Lisboa</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>© Copyright 2025. Todos os direitos reservados. NMATH - Núcleo de Estudantes de Matemática do IST</p>
        </div>
      </div>
    </footer>
  );
}

export default function MainPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <NewsSection />
      <EventsSection />
      <CalendarSection />
      <MagazineSection />
      <ResourceLinksSection />
      <TeamSection />
     
      <Footer />
    </div>
  );
}