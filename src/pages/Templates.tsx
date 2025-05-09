
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const templates = [
  {
    id: 1,
    name: "Professional",
    description: "Classic and refined for corporate positions",
    imageUrl: "/placeholder.svg",
    popular: true
  },
  {
    id: 2,
    name: "Creative",
    description: "Modern design for creative industries",
    imageUrl: "/placeholder.svg",
    popular: false
  },
  {
    id: 3,
    name: "Technical",
    description: "Optimized for IT and engineering roles",
    imageUrl: "/placeholder.svg",
    popular: false
  }
];

export default function Templates() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-6">Resume Templates</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className={template.popular ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] rounded-md overflow-hidden bg-muted">
                  <img
                    src={template.imageUrl}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Use Template</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
