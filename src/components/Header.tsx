import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Calendar, BookOpen, Users, Newspaper, Headphones, Instagram, HardDrive } from 'lucide-react';
import whiteLogo from 'figma:asset/white.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { icon: Newspaper, label: 'Notícias', href: '#news' },
    { icon: Calendar, label: 'Calendário', href: '#calendar' },
    { icon: Users, label: 'Equipa', href: '#team' },
    { icon: Headphones, label: 'Oráculo', href: 'https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk', external: true },
    { icon: HardDrive, label: 'Repositório', href: '#repositorio' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/nmath_ist', external: true },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center">
            <img 
              src={whiteLogo} 
              alt="NMATH Symbol" 
              className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center space-x-3 hover:text-blue-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}