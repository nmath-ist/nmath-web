import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Code, 
  FileText, 
  Video, 
  BookOpen, 
  Calculator, 
  Globe, 
  Laptop, 
  Download,
  ExternalLink,
  Star
} from 'lucide-react';

export default function StudyRoomSection() {
  const resourceCategories = {
    programming: {
      icon: Code,
      name: "Programming",
      color: "from-blue-500 to-indigo-600",
      resources: [
        { title: "Python Fundamentals", type: "PDF Guide", downloads: 1247, rating: 4.8 },
        { title: "JavaScript ES6+ Tutorial", type: "Video Series", downloads: 892, rating: 4.9 },
        { title: "Git & GitHub Workflow", type: "Interactive Guide", downloads: 734, rating: 4.7 },
        { title: "Data Structures Cheat Sheet", type: "PDF", downloads: 1456, rating: 4.9 }
      ]
    },
    mathematics: {
      icon: Calculator,
      name: "Mathematics",
      color: "from-green-500 to-emerald-600",
      resources: [
        { title: "Calculus Problem Sets", type: "PDF Collection", downloads: 923, rating: 4.6 },
        { title: "Linear Algebra Notes", type: "Lecture Notes", downloads: 678, rating: 4.8 },
        { title: "Statistics Formulas", type: "Reference Sheet", downloads: 812, rating: 4.7 },
        { title: "Discrete Math Examples", type: "Practice Problems", downloads: 567, rating: 4.5 }
      ]
    },
    webdev: {
      icon: Globe,
      name: "Web Development",
      color: "from-purple-500 to-pink-600",
      resources: [
        { title: "React Best Practices", type: "Guide", downloads: 1134, rating: 4.9 },
        { title: "CSS Grid & Flexbox", type: "Interactive Tutorial", downloads: 890, rating: 4.8 },
        { title: "Node.js API Development", type: "Video Course", downloads: 756, rating: 4.7 },
        { title: "Responsive Design Patterns", type: "Template Pack", downloads: 645, rating: 4.6 }
      ]
    },
    general: {
      icon: BookOpen,
      name: "General Studies",
      color: "from-orange-500 to-red-600",
      resources: [
        { title: "Study Techniques Guide", type: "PDF Guide", downloads: 1567, rating: 4.9 },
        { title: "Time Management Templates", type: "Productivity Pack", downloads: 1234, rating: 4.8 },
        { title: "Exam Preparation Checklist", type: "Checklist", downloads: 1089, rating: 4.7 },
        { title: "Note-Taking Systems", type: "Guide Collection", downloads: 876, rating: 4.6 }
      ]
    }
  };

  return (
    <section id="study-room" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <Laptop className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600">Study Resources</span>
          </div>
          <h2 className="text-4xl mb-4 text-slate-800">Digital Study Room</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Access our curated collection of study materials, tutorials, and resources to accelerate your learning journey.
          </p>
        </div>

        <Tabs defaultValue="programming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-slate-100">
            {Object.entries(resourceCategories).map(([key, category]) => (
              <TabsTrigger 
                key={key} 
                value={key}
                className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <category.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(resourceCategories).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.resources.map((resource, index) => (
                  <Card key={index} className="overflow-hidden border border-slate-200 hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-3`}>
                          <category.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-slate-600">{resource.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className="border-slate-300 text-slate-600">
                          {resource.type}
                        </Badge>
                        <span className="text-sm text-slate-500">
                          {resource.downloads.toLocaleString()} downloads
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className={`flex-1 bg-gradient-to-r ${category.color} text-white border-0 hover:opacity-90`}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" className="px-3">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button variant="outline" size="lg" className="border-slate-300 text-slate-600 hover:bg-slate-50">
                  Browse All {category.name} Resources
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}