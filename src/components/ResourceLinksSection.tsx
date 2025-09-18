import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Camera, 
  Headphones, 
  ExternalLink, 
  Play,
  Clock
} from 'lucide-react';

export default function ResourceLinksSection() {
  const externalLinks = [
    {
      id: 1,
      title: "Álbum de Fotos",
      description: "Explora as memórias dos nossos eventos e atividades",
      icon: Camera,
      url: "https://drive.google.com/drive/folders/1UCcJhlosNg9WY2-VhXz3bD7F3Gz0R3eU",
      color: "from-pink-500 to-rose-600",
      highlights: ["Hackathon 2024", "Cerimónia de Graduação", "Atividades do Núcleo", "Eventos do Campus"],
      action: "Ver Fotos"
    },
    {
      id: 2,
      title: "Oráculo",
      description: "Se aprender Matemática é bom, ouvir Matemática é ainda melhor.",
      icon: Headphones,
      url: "link",
      color: "from-purple-500 to-indigo-600",
      stats: "24 episódios • Lançamentos semanais",
      highlights: ["Dicas de Carreira", "Entrevistas", "Insights da Indústria", "Notícias do Campus"],
      action: "Ouvir Agora"
    }
  ];



  const latestPodcastEpisodes = [
    {
      title: "Como sobreviver ao meu primeiro ano no técnico",
      duration: "42 min",
      date: "3 Set, 2025",
      plays: "1.2k"
    },
    {
      title: "Experiências de Intercâmbio: Edição Europa",
      duration: "38 min",
      date: "3 Dez, 2024",
      plays: "890"
    },
    {
      title: "Histórias de Startups do Campus",
      duration: "45 min",
      date: "26 Nov, 2024",
      plays: "1.5k"
    }
  ];

  return (
    <section id="photos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-slate-800">Conecta & Explora</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
          Acede às nossas memórias fotográficas, ouve testemunhos da comunidade de Matemática e encontra recursos úteis para os teus estudos.
          </p>
        </div>

        {/* Main External Links */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {externalLinks.map((link) => (
            <Card key={link.id} className="overflow-hidden border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-2 group">
              <CardContent className="p-0">
                <div className={`bg-gradient-to-br ${link.color} p-8 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <link.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl mb-1">{link.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-white/90 mb-6 leading-relaxed">
                      {link.description}
                    </p>

                    <Button 
                      className="w-full bg-white/20 hover:bg-white/30 text-white border-0 group-hover:bg-white group-hover:text-slate-800 transition-all"
                      onClick={() => window.open(link.url, '_blank')}
                    >
                      {link.action}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Additional Content for Podcast - Apenas último episódio */}
                {link.id === 2 && (
                  <div className="p-6 bg-slate-50">
                    <h4 className="mb-4 text-slate-800">Último Episódio</h4>
                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Play className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm leading-tight">{latestPodcastEpisodes[0].title}</p>
                          <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{latestPodcastEpisodes[0].duration}</span>
                            </span>
                            <span>{latestPodcastEpisodes[0].date}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="text-purple-600 hover:bg-purple-50">
                          <Play className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>



        {/* Contact Section */}
        <Card className="mt-8 border border-slate-200 bg-gradient-to-r from-blue-600 to-teal-600 text-white overflow-hidden">
          <CardContent className="p-8 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-2xl mb-3">Precisas de Ajuda ou Tens Sugestões?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Estamos aqui para ajudar! Entra em contacto connosco para suporte, feedback ou ideias para melhorar a tua experiência em Matemática.
              </p>
              <div className="flex justify-center">
                <Button 
                  variant="secondary" 
                  className="bg-white/20 text-white border-0 hover:bg-white hover:text-slate-800"
                  onClick={() => window.open('mailto:nmath.geral@gmail.com?subject=Contacto NMATH&body=Olá! Gostaria de entrar em contacto convosco.', '_blank')}
                >
                  Contacta-nos
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}