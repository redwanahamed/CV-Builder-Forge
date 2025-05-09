
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Book, MessageSquare, Play } from "lucide-react";

export default function Support() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-6">Help Center</h1>
        
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search for help articles..."
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Book className="h-8 w-8 mb-2" />
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Detailed guides and documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="px-0">Browse Documentation →</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="h-8 w-8 mb-2" />
              <CardTitle>Community</CardTitle>
              <CardDescription>Join our community forums</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="px-0">Visit Forums →</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Play className="h-8 w-8 mb-2" />
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>Learn with step-by-step videos</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="px-0">Watch Tutorials →</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
