
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const positions = [
  {
    id: 1,
    title: "AI Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time"
  },
  {
    id: 2,
    title: "UX Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time"
  },
  {
    id: 3,
    title: "Content Writer",
    department: "Marketing",
    location: "Remote",
    type: "Contract"
  }
];

export default function Careers() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-6">Join Our Team</h1>
        
        <section className="mb-12">
          <p className="text-lg text-muted-foreground">
            We're building the future of resume creation and career development. 
            Join us in our mission to help millions of people advance their careers.
          </p>
        </section>

        <div className="grid gap-6">
          {positions.map((position) => (
            <Card key={position.id}>
              <CardHeader>
                <CardTitle>{position.title}</CardTitle>
                <CardDescription>{position.department}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{position.location}</span>
                  <span>•</span>
                  <span>{position.type}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Position</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
