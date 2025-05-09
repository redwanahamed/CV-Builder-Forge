
import { useState } from "react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, FileText, MessageSquare, PenTool } from "lucide-react";
import { ResumeWriterTool } from "@/components/ai-tools/ResumeWriterTool";
import { GrammarCheckerTool } from "@/components/ai-tools/GrammarCheckerTool";
import { InterviewAssistantTool } from "@/components/ai-tools/InterviewAssistantTool";
import { SkillsAnalyzerTool } from "@/components/ai-tools/SkillsAnalyzerTool";

const tools = [
  {
    id: 1,
    name: "Resume Writer",
    description: "Generate professional resume content using AI",
    icon: FileText,
    component: ResumeWriterTool
  },
  {
    id: 2,
    name: "Grammar Checker",
    description: "Perfect your writing with AI-powered suggestions",
    icon: PenTool,
    component: GrammarCheckerTool
  },
  {
    id: 3,
    name: "Interview Assistant",
    description: "Practice interviews with AI feedback",
    icon: MessageSquare,
    component: InterviewAssistantTool
  },
  {
    id: 4,
    name: "Skills Analyzer",
    description: "Get AI recommendations for skill improvements",
    icon: Sparkles,
    component: SkillsAnalyzerTool
  }
];

export default function AITools() {
  const [selectedTool, setSelectedTool] = useState<number | null>(null);
  
  const handleSelectTool = (toolId: number) => {
    setSelectedTool(selectedTool === toolId ? null : toolId);
  };
  
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-6">AI Tools</h1>
        
        <p className="text-lg text-muted-foreground mb-12">
          Leverage the power of artificial intelligence to enhance your job search 
          and career development with our suite of AI-powered tools.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isSelected = selectedTool === tool.id;
            const ToolComponent = tool.component;
            
            return (
              <Card key={tool.id} className={`overflow-hidden ${isSelected ? 'border-primary' : ''}`}>
                <CardHeader>
                  <Icon className="h-8 w-8 mb-2" />
                  <CardTitle>{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isSelected ? (
                    <Button onClick={() => handleSelectTool(tool.id)}>Try Now</Button>
                  ) : (
                    <div className="space-y-4">
                      <ToolComponent />
                      <Button 
                        variant="outline" 
                        onClick={() => handleSelectTool(tool.id)}
                      >
                        Close
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
