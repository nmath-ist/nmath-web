import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Trophy, 
  BookOpen, 
  Mic, 
  Calendar, 
  MapPin, 
  Users, 
  Award, 
  FileText, 
  ArrowLeft, 
  Home,
  Mail,
  Instagram,
  Music
} from 'lucide-react';

interface EventEdition {
  year: number;
  date: string;
  location: string;
  format?: string;
  prizes?: string;
  winners?: string;
  materials?: string;
  participation?: string;
  highlight?: string;
  speaker?: string;
  theme?: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  color: string;
  icon: React.ReactNode;
  editions: EventEdition[];
}

const events: Event[] = [
  {
    id: 'integration-bee',
    title: 'Integration Bee',
    description: 'A Integration Bee é uma competição de cálculo integral que desafia estudantes universitários a resolver integrais complexos sob pressão de tempo. Inspirada nas competições americanas, este evento promove o desenvolvimento de competências matemáticas através de uma atmosfera competitiva e estimulante. Os participantes enfrentam desafios progressivamente mais difíceis, desde integrais básicos até problemas avançados que testam não só o conhecimento técnico, mas também a rapidez de raciocínio e a capacidade de trabalhar sob pressão.',
    shortDescription: 'Competição de cálculo integral da Universidade de Lisboa',
    color: 'blue',
    icon: <Trophy className="h-8 w-8" />,
    editions: [
      {
        year: 2025,
        date: '31 maio 2025',
        location: 'IST – Sala IA (escrita), Anfiteatro QA (finais)',
        format: 'fase escrita → meias-finais → final',
        prizes: '1º lugar 1000 €, 2º 500 €, 3º 250 €, 4º crédito 50 € na SPM',
        winners: '1º Rafael Hipólito; 2º André Crispim & Francisco Cunha; 3º Jing Xu; 4º David Andrade; 5º Miguel Faria',
        materials: 'Link para soluções disponível'
      }
    ]
  },
  {
    id: 'jornadas-matematica',
    title: 'Jornadas de Matemática',
    description: 'As Jornadas de Matemática são um encontro académico e empresarial que visa promover a divulgação científica, o networking entre estudantes e profissionais, e a exploração de oportunidades de carreira na área da matemática. Este evento anual reúne académicos, investigadores, estudantes e representantes da indústria numa série de palestras, workshops e atividades culturais que destacam a relevância e aplicabilidade da matemática em diversos setores. É uma oportunidade única para expandir horizontes, criar conexões profissionais e descobrir os caminhos que a formação matemática pode abrir.',
    shortDescription: 'Encontro académico e empresarial sobre matemática',
    color: 'purple',
    icon: <BookOpen className="h-8 w-8" />,
    editions: [
      {
        year: 2023,
        date: '18–20 outubro 2023',
        location: 'Instituto Superior Técnico',
        format: 'palestras, workshops, empresas parceiras, atividades culturais',
        participation: 'estudantes do IST e comunidade NMath',
        highlight: 'divulgação científica e networking'
      }
    ]
  },
  {
    id: 'time2talk',
    title: 'Time2Talk',
    description: 'O Time2Talk é um ciclo de palestras informais e acessíveis que visa democratizar o conhecimento matemático. Através de apresentações descontraídas, convidados especialistas partilham descobertas, experiências e perspetivas sobre diversos temas matemáticos, tornando-os acessíveis a toda a comunidade. Este formato permite uma aproximação mais pessoal entre oradores e audiência, criando um ambiente propício ao diálogo, às perguntas e à partilha de ideias. É o espaço perfeito para descobrir novas áreas da matemática e compreender como o conhecimento teórico se traduz em aplicações práticas.',
    shortDescription: 'Ciclo de palestras informais e acessíveis',
    color: 'green',
    icon: <Mic className="h-8 w-8" />,
    editions: []
  }
];

function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">N</span>
            </div>
            <div>
              <h1 className="text-xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                NMATH
              </h1>
              <p className="text-xs text-gray-500">Núcleo de Estudantes de Matemática</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                window.location.hash = '';
              }}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Início
            </Button>
            
            <div className="flex items-center space-x-2">
              <a 
                href="mailto:nmath.geral@gmail.com"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Mail className="h-4 w-4 text-gray-600" />
              </a>
              <a 
                href="https://instagram.com/nmath_ist"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Instagram className="h-4 w-4 text-gray-600" />
              </a>
              <a 
                href="https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Music className="h-4 w-4 text-gray-600" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

interface EventPageProps {
  eventId: string;
}

export default function EventPage({ eventId }: EventPageProps) {
  const event = events.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl mb-4">Evento não encontrado</h1>
          <Button
            onClick={() => {
              window.location.hash = '';
            }}
            className="flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Início
          </Button>
        </div>
      </div>
    );
  }

  const colorClasses = {
    blue: 'from-blue-600 to-blue-800',
    purple: 'from-purple-600 to-purple-800',
    green: 'from-green-600 to-green-800'
  };

  const colorAccent = {
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    green: 'text-green-600'
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className={`py-20 bg-gradient-to-br ${colorClasses[event.color as keyof typeof colorClasses]} text-white`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                window.location.hash = '';
              }}
              className="text-white/80 hover:text-white hover:bg-white/10 mb-8 flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar aos Eventos
            </Button>
            
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-2xl">
                {event.icon}
              </div>
            </div>
            
            <h1 className="text-4xl mb-4">{event.title}</h1>
            <p className="text-xl opacity-90 mb-8">{event.shortDescription}</p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left max-w-3xl mx-auto">
              <p className="text-lg leading-relaxed">{event.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Editions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {event.editions.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl mb-4 flex items-center justify-center gap-3">
                    <FileText className={`h-8 w-8 ${colorAccent[event.color as keyof typeof colorAccent]}`} />
                    <span className={`bg-gradient-to-r ${colorClasses[event.color as keyof typeof colorClasses]} bg-clip-text text-transparent`}>
                      Arquivo de Edições
                    </span>
                  </h2>
                  <p className="text-gray-600">
                    Historial detalhado de todas as edições do evento
                  </p>
                </div>
                
                <div className="space-y-8">
                  {event.editions.map((edition) => (
                    <Card key={edition.year} className="border-2 border-gray-100 shadow-lg">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-2xl flex items-center gap-3">
                          <Calendar className={`h-6 w-6 ${colorAccent[event.color as keyof typeof colorAccent]}`} />
                          Edição {edition.year}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <Calendar className="h-5 w-5 mt-1 text-gray-500" />
                              <div>
                                <p className="text-sm text-gray-600 mb-1">Data</p>
                                <p className="text-lg">{edition.date}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <MapPin className="h-5 w-5 mt-1 text-gray-500" />
                              <div>
                                <p className="text-sm text-gray-600 mb-1">Local</p>
                                <p className="text-lg">{edition.location}</p>
                              </div>
                            </div>
                            
                            {edition.format && (
                              <div className="flex items-start gap-3">
                                <Users className="h-5 w-5 mt-1 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">Formato</p>
                                  <p className="text-lg">{edition.format}</p>
                                </div>
                              </div>
                            )}
                            
                            {edition.participation && (
                              <div className="flex items-start gap-3">
                                <Users className="h-5 w-5 mt-1 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">Participação</p>
                                  <p className="text-lg">{edition.participation}</p>
                                </div>
                              </div>
                            )}
                            
                            {edition.speaker && (
                              <div className="flex items-start gap-3">
                                <Mic className="h-5 w-5 mt-1 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">Convidado</p>
                                  <p className="text-lg">{edition.speaker}</p>
                                </div>
                              </div>
                            )}
                            
                            {edition.theme && (
                              <div className="flex items-start gap-3">
                                <BookOpen className="h-5 w-5 mt-1 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">Tema</p>
                                  <p className="text-lg">{edition.theme}</p>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-4">
                            {edition.prizes && (
                              <div className="flex items-start gap-3">
                                <Award className="h-5 w-5 mt-1 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">Prémios</p>
                                  <p className="text-lg">{edition.prizes}</p>
                                </div>
                              </div>
                            )}
                            
                            {edition.winners && (
                              <div className="flex items-start gap-3">
                                <Trophy className="h-5 w-5 mt-1 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">Vencedores</p>
                                  <p className="text-lg">{edition.winners}</p>
                                </div>
                              </div>
                            )}
                            
                            {edition.materials && (
                              <div className="flex items-start gap-3">
                                <FileText className="h-5 w-5 mt-1 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">Materiais</p>
                                  <p className="text-lg">{edition.materials}</p>
                                </div>
                              </div>
                            )}
                            
                            {edition.highlight && (
                              <div className="flex items-start gap-3">
                                <Award className="h-5 w-5 mt-1 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">Destaque</p>
                                  <p className="text-lg">{edition.highlight}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <FileText className="h-20 w-20 mx-auto mb-6 text-gray-300" />
                <h2 className="text-2xl mb-4 text-gray-600">Arquivo em Construção</h2>
                <p className="text-gray-500 text-lg">
                  O arquivo de edições será atualizado em breve com detalhes de eventos passados e futuros.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Back to Events */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Button
            onClick={() => {
              window.location.hash = '';
            }}
            className="flex items-center gap-2 mx-auto"
            size="lg"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar aos Eventos
          </Button>
        </div>
      </section>
    </div>
  );
}