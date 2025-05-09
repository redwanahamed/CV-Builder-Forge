
import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock blog posts - replace with real data from your API
const posts = [
  {
    id: 1,
    title: "10 Tips for a Standout Resume",
    excerpt: "Learn how to make your resume stand out from the crowd with these expert tips.",
    date: "2024-04-20",
    category: "Resume Tips"
  },
  {
    id: 2,
    title: "The Future of AI in Resume Writing",
    excerpt: "Discover how artificial intelligence is revolutionizing the way we create resumes.",
    date: "2024-04-18",
    category: "Technology"
  },
  {
    id: 3,
    title: "Common Resume Mistakes to Avoid",
    excerpt: "Don't let these common resume mistakes hold you back from landing your dream job.",
    date: "2024-04-15",
    category: "Career Advice"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-6">Career Insights Blog</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">{post.category}</div>
                <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                <CardDescription>{new Date(post.date).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
