import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import pf25 from 'figma:asset/pf25.png';
import pf22 from 'figma:asset/pf22.png';
import pf21 from 'figma:asset/pf21.png';
import pf20 from 'figma:asset/pf20.png';
import pf19 from 'figma:asset/pf19.png';
import { 
  BookOpen, 
  ExternalLink,
  TrendingUp
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function MagazineSection() {
  const currentEdition = {
  id: 1,
  title: "#5",
  issue: "Edição 2025",
  coverImage: pf25,
  description: "Depois de dois anos, o Ponto Fixo regressa com uma edição cheia de novas camadas — artigos intemporais, entrevistas inspiradoras e reflexões sobre o futuro académico.",
  featured: true,
  publishDate: "2025",
  highlights: [
    "Matemática na Música",
    "Medalhas Fields",
    "Entrevistas a Alumni: Doutoramento ou não?",
    "Artigos de Professores e Estudantes"
  ],
  link: "https://drive.google.com/file/d/1BFNrqOkf0h0LX_CqUx5XrICrJli21Hvc/view"
};

const pastEditions = [
  {
    id: 2,
    title: "#4",
    issue: "Edição 2022",
    coverImage: pf22,
    publishDate: "2022",
    link: "https://nmath.tecnico.ulisboa.pt/wp-content/uploads/2022/08/pf_2022.pdf"
  },
  {
    id: 3,
    title: "#3",
    issue: "Edição 2021",
    coverImage: pf21,
    publishDate: "2021",
    link: "https://nmath.tecnico.ulisboa.pt/wp-content/uploads/2021/06/pf_2021.pdf"
  },
  {
    id: 4,
    title: "#2",
    issue: "Edição 2020",
    coverImage: pf20,
    publishDate: "2020",
    link: "https://nmath.tecnico.ulisboa.pt/pf2020.pdf"
  },
  {
    id: 5,
    title: "#1",
    issue: "Edição 2019",
    coverImage:  pf19,
    publishDate: "2019",
    link: "https://nmath.tecnico.ulisboa.pt/pf2019.pdf"
  }
];

  const handleEditionClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="magazine" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600">Revista Académica</span>
          </div>
          <h2 className="text-4xl mb-4 text-slate-800">Ponto Fixo</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A revista Ponto Fixo divulga matemática através de artigos, entrevistas e colaborações entre alunos, professores e investigadores do IST.
          </p>
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100">
            <TabsTrigger value="current" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Edição Atual
            </TabsTrigger>
            <TabsTrigger value="archive" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Arquivo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            {/* Featured Current Edition */}
            <Card className="overflow-hidden border border-slate-200 shadow-xl bg-white mb-8 cursor-pointer hover:shadow-2xl transition-all">
              <div className="grid lg:grid-cols-2 gap-0" onClick={() => handleEditionClick(currentEdition.link)}>
                <div className="aspect-[3/4] bg-slate-100 relative overflow-hidden">
                  <ImageWithFallback 
                    src={currentEdition.coverImage}
                    alt={currentEdition.title}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white border-0">
                      NOVA
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm opacity-90">{currentEdition.issue}</p>
                  </div>
                </div>

                <div className="p-8">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-3xl mb-2">{currentEdition.title}</CardTitle>
                    <p className="text-slate-600">{currentEdition.issue}</p>
                  </CardHeader>

                  <CardContent className="p-0">
                    <p className="text-slate-700 mb-6 leading-relaxed">
                      {currentEdition.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="mb-3 text-slate-800">Destaques desta Edição</h4>
                      <ul className="space-y-2">
                        {currentEdition.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-slate-600">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditionClick(currentEdition.link);
                        }}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Ler Online
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="archive">
            {/* Past Editions Horizontal Scroll */}
            <div className="relative">
              <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                {pastEditions.map((edition) => (
                  <Card 
                    key={edition.id} 
                    className="flex-shrink-0 w-72 overflow-hidden border border-slate-200 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                    onClick={() => handleEditionClick(edition.link)}
                  >
                    <div className="aspect-[3/4] bg-slate-100 relative overflow-hidden">
                      <ImageWithFallback 
                        src={edition.coverImage}
                        alt={edition.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <CardContent className="p-4">
                      <h3 className="mb-1 leading-tight">{edition.title}</h3>
                      <p className="text-sm text-slate-600 mb-4">{edition.issue}</p>

                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditionClick(edition.link);
                          }}
                        >
                          <ExternalLink className="mr-1 h-3 w-3" />
                          Ler
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Gradient fade effects */}
              <div className="absolute left-0 top-0 bottom-6 w-8 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-6 w-8 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-slate-500 mb-4">← Desliza para ver mais edições →</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}