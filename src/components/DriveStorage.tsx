import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Search,
  Upload,
  Grid3X3,
  List,
  MoreVertical,
  Download,
  Share2,
  Star,
  Clock,
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  File,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface SubjectFolder {
  id: string;
  name: string;
  code: string;
  filesCount: number;
  lastUpdated: string;
  professor: string;
  semester: number;
  color: string;
}

const subjectsByYear = {
  "1": [
    {
      id: "1-1",
      name: "Análise Matemática I",
      code: "AM1",
      filesCount: 24,
      lastUpdated: "2 dias",
      professor: "Prof. Silva",
      semester: 1,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "1-2",
      name: "Programação I",
      code: "PROG1",
      filesCount: 31,
      lastUpdated: "1 dia",
      professor: "Prof. Costa",
      semester: 1,
      color: "from-green-500 to-green-600",
    },
    {
      id: "1-3",
      name: "Física I",
      code: "FIS1",
      filesCount: 18,
      lastUpdated: "3 dias",
      professor: "Prof. Santos",
      semester: 1,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "1-4",
      name: "Álgebra Linear",
      code: "AL",
      filesCount: 22,
      lastUpdated: "1 semana",
      professor: "Prof. Oliveira",
      semester: 2,
      color: "from-teal-500 to-teal-600",
    },
    {
      id: "1-5",
      name: "Programação II",
      code: "PROG2",
      filesCount: 28,
      lastUpdated: "2 dias",
      professor: "Prof. Costa",
      semester: 2,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "1-6",
      name: "Física II",
      code: "FIS2",
      filesCount: 16,
      lastUpdated: "4 dias",
      professor: "Prof. Santos",
      semester: 2,
      color: "from-indigo-500 to-indigo-600",
    },
  ],
  "2": [
    {
      id: "2-1",
      name: "Estruturas de Dados",
      code: "ED",
      filesCount: 35,
      lastUpdated: "1 dia",
      professor: "Prof. Ferreira",
      semester: 1,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "2-2",
      name: "Sistemas Digitais",
      code: "SD",
      filesCount: 27,
      lastUpdated: "3 dias",
      professor: "Prof. Martins",
      semester: 1,
      color: "from-red-500 to-red-600",
    },
    {
      id: "2-3",
      name: "Análise Matemática II",
      code: "AM2",
      filesCount: 19,
      lastUpdated: "2 dias",
      professor: "Prof. Silva",
      semester: 1,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      id: "2-4",
      name: "Algoritmos",
      code: "ALG",
      filesCount: 33,
      lastUpdated: "1 dia",
      professor: "Prof. Ferreira",
      semester: 2,
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "2-5",
      name: "Bases de Dados",
      code: "BD",
      filesCount: 25,
      lastUpdated: "5 dias",
      professor: "Prof. Rodrigues",
      semester: 2,
      color: "from-rose-500 to-rose-600",
    },
    {
      id: "2-6",
      name: "Redes de Computadores",
      code: "RC",
      filesCount: 21,
      lastUpdated: "1 semana",
      professor: "Prof. Pereira",
      semester: 2,
      color: "from-violet-500 to-violet-600",
    },
  ],
  "3": [
    {
      id: "3-1",
      name: "Engenharia de Software",
      code: "ES",
      filesCount: 42,
      lastUpdated: "1 dia",
      professor: "Prof. Almeida",
      semester: 1,
      color: "from-slate-500 to-slate-600",
    },
    {
      id: "3-2",
      name: "Inteligência Artificial",
      code: "IA",
      filesCount: 38,
      lastUpdated: "2 dias",
      professor: "Prof. Carvalho",
      semester: 1,
      color: "from-pink-500 to-pink-600",
    },
    {
      id: "3-3",
      name: "Segurança Informática",
      code: "SI",
      filesCount: 29,
      lastUpdated: "3 dias",
      professor: "Prof. Sousa",
      semester: 1,
      color: "from-lime-500 to-lime-600",
    },
    {
      id: "3-4",
      name: "Projeto Final",
      code: "PF",
      filesCount: 15,
      lastUpdated: "1 dia",
      professor: "Prof. Orientador",
      semester: 2,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: "3-5",
      name: "Computação Gráfica",
      code: "CG",
      filesCount: 24,
      lastUpdated: "4 dias",
      professor: "Prof. Lopes",
      semester: 2,
      color: "from-sky-500 to-sky-600",
    },
    {
      id: "3-6",
      name: "Sistemas Distribuídos",
      code: "SiD",
      filesCount: 31,
      lastUpdated: "2 dias",
      professor: "Prof. Gonçalves",
      semester: 2,
      color: "from-fuchsia-500 to-fuchsia-600",
    },
  ],
  mestrado: [
    {
      id: "m-1",
      name: "Machine Learning Avançado",
      code: "MLA",
      filesCount: 45,
      lastUpdated: "1 dia",
      professor: "Prof. Dr. Machado",
      semester: 1,
      color: "from-blue-600 to-purple-600",
    },
    {
      id: "m-2",
      name: "Dissertação",
      code: "DISS",
      filesCount: 12,
      lastUpdated: "2 horas",
      professor: "Prof. Dr. Orientador",
      semester: 1,
      color: "from-teal-600 to-blue-600",
    },
    {
      id: "m-3",
      name: "Arquiteturas Avançadas",
      code: "AA",
      filesCount: 33,
      lastUpdated: "3 dias",
      professor: "Prof. Dr. Ribeiro",
      semester: 1,
      color: "from-emerald-600 to-teal-600",
    },
    {
      id: "m-4",
      name: "Tópicos Avançados em IA",
      code: "TAIA",
      filesCount: 28,
      lastUpdated: "1 semana",
      professor: "Prof. Dr. Carvalho",
      semester: 2,
      color: "from-indigo-600 to-purple-600",
    },
  ],
};

export default function DriveStorage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    "grid",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("1");

  const currentSubjects =
    subjectsByYear[activeTab as keyof typeof subjectsByYear] ||
    [];

  const filteredSubjects = currentSubjects.filter(
    (subject) =>
      subject.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      subject.code
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  const getYearTitle = (year: string) => {
    switch (year) {
      case "1":
        return "1º Ano";
      case "2":
        return "2º Ano";
      case "3":
        return "3º Ano";
      case "mestrado":
        return "Mestrado";
      default:
        return year;
    }
  };

  const totalFiles = currentSubjects.reduce(
    (sum, subject) => sum + subject.filesCount,
    0,
  );
  const semesterStats = {
    1: currentSubjects.filter((s) => s.semester === 1).length,
    2: currentSubjects.filter((s) => s.semester === 2).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-3 rounded-xl shadow-lg">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    Recursos Académicos
                  </h1>
                  <p className="text-gray-600">
                    Centro de materiais de estudo organizados
                    por ano letivo
                  </p>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Pesquisar disciplinas..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="pl-12 w-80 h-12 bg-blue-50/50 border-blue-200 focus:border-blue-400 rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-blue-50 rounded-xl p-1">
                <Button
                  variant={
                    viewMode === "grid" ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "hover:bg-blue-100"
                  }
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={
                    viewMode === "list" ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "hover:bg-blue-100"
                  }
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 h-12 px-6 rounded-xl shadow-lg">
                <Upload className="h-4 w-4 mr-2" />
                Carregar Material
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-8 w-8" />
                <div>
                  <div className="text-2xl font-bold">
                    {getYearTitle(activeTab)}
                  </div>
                  <div className="text-blue-100 text-sm">
                    Ano atual
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white border-0">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-8 w-8" />
                <div>
                  <div className="text-2xl font-bold">
                    {currentSubjects.length}
                  </div>
                  <div className="text-teal-100 text-sm">
                    Disciplinas
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
              <div className="flex items-center space-x-3">
                <File className="h-8 w-8" />
                <div>
                  <div className="text-2xl font-bold">
                    {totalFiles}
                  </div>
                  <div className="text-purple-100 text-sm">
                    Ficheiros
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8" />
                <div>
                  <div className="text-2xl font-bold">
                    {semesterStats[1]} + {semesterStats[2]}
                  </div>
                  <div className="text-emerald-100 text-sm">
                    1º + 2º Semestre
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs for Years */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-lg grid-cols-4 bg-blue-50 border border-blue-200 h-12">
              <TabsTrigger
                value="1"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white h-10"
              >
                1º Ano
              </TabsTrigger>
              <TabsTrigger
                value="2"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white h-10"
              >
                2º Ano
              </TabsTrigger>
              <TabsTrigger
                value="3"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white h-10"
              >
                3º Ano
              </TabsTrigger>
              <TabsTrigger
                value="mestrado"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white h-10"
              >
                Mestrado
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl text-gray-800">
                Disciplinas - {getYearTitle(activeTab)}
              </h2>
              <p className="text-gray-600 mt-2">
                {filteredSubjects.length} disciplinas
                disponíveis • {totalFiles} ficheiros no total
              </p>
            </div>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSubjects.map((subject) => (
              <Card
                key={subject.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-white/80 backdrop-blur-sm hover:scale-105"
              >
                <div
                  className={`h-3 bg-gradient-to-r ${subject.color}`}
                ></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`bg-gradient-to-br ${subject.color} p-3 rounded-xl shadow-lg`}
                      >
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <Badge
                          variant="outline"
                          className="text-xs border-gray-300 text-gray-700 bg-gray-50"
                        >
                          {subject.code}
                        </Badge>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Descarregar Tudo
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="h-4 w-4 mr-2" />
                          Adicionar aos Favoritos
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" />
                          Partilhar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {subject.name}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span>{subject.professor}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <File className="h-4 w-4 text-teal-500" />
                          <span>
                            {subject.filesCount} ficheiros
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-purple-500" />
                          <span>{subject.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-emerald-500" />
                        <span>
                          {subject.semester}º Semestre
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-700 border-b border-gray-200 bg-gray-50">
              <div className="col-span-4">Disciplina</div>
              <div className="col-span-2">Código</div>
              <div className="col-span-2">Professor</div>
              <div className="col-span-1">Ficheiros</div>
              <div className="col-span-2">
                Última Atualização
              </div>
              <div className="col-span-1">Ações</div>
            </div>

            {filteredSubjects.map((subject, index) => (
              <div
                key={subject.id}
                className={`grid grid-cols-12 gap-4 p-4 hover:bg-blue-50/50 cursor-pointer group items-center ${index !== filteredSubjects.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <div className="col-span-4 flex items-center space-x-4">
                  <div
                    className={`w-1 h-12 bg-gradient-to-b ${subject.color} rounded-full`}
                  ></div>
                  <div
                    className={`bg-gradient-to-br ${subject.color} p-2 rounded-xl shadow-sm`}
                  >
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                      {subject.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {subject.semester}º Semestre
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <Badge
                    variant="outline"
                    className="text-xs border-gray-300 text-gray-700 bg-gray-50"
                  >
                    {subject.code}
                  </Badge>
                </div>

                <div className="col-span-2 text-sm text-gray-600">
                  {subject.professor}
                </div>

                <div className="col-span-1 text-sm text-gray-600 font-medium">
                  {subject.filesCount}
                </div>

                <div className="col-span-2 text-sm text-gray-600">
                  {subject.lastUpdated}
                </div>

                <div className="col-span-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Descarregar Tudo
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Star className="h-4 w-4 mr-2" />
                        Adicionar aos Favoritos
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="h-4 w-4 mr-2" />
                        Partilhar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}