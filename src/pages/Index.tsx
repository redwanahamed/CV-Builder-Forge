
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import { Briefcase, FileText, ChevronRight } from "lucide-react";

export default function Index() {
  const {
    isAuthenticated,
    userRole,
    logout
  } = useAuth();
  return <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mb-12">
          <h1 className="font-bold mb-6 text-4xl md:text-5xl font-serif">Get your dream job faster</h1>
          <p className="text-xl mb-8 text-muted-foreground">Create professional resumes with AI tools, apply to jobs, and advance your career</p>
        
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            {isAuthenticated ? <>
                {userRole === "admin" && <Button asChild>
                    <Link to="/admin">Admin Dashboard</Link>
                  </Button>}
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </> : <>
                <Button asChild size="lg">
                  <Link to="/login">Get Started</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="border rounded-lg p-8 bg-card shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Resume Builder</h2>
            </div>
            <ul className="list-disc list-inside space-y-2 mb-8">
              <li>Professional templates</li>
              <li>Easy customization</li>
              <li>Download as PDF</li>
              <li>ATS-friendly formats</li>
            </ul>
            <Button asChild variant="outline">
              <Link to="/templates">Browse Templates <ChevronRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          
          <div className="border rounded-lg p-8 bg-card shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Job Marketplace</h2>
            </div>
            <ul className="list-disc list-inside space-y-2 mb-8">
              <li>Find opportunities matching your skills</li>
              <li>Apply with one click using your CV</li>
              <li>Track application status</li>
              <li>Connect with top employers</li>
            </ul>
            <Button asChild variant="outline">
              <Link to="/jobs">Browse Jobs <ChevronRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
        
        <div className="border rounded-lg p-8 bg-primary/5 mb-16">
          <h2 className="text-2xl font-semibold mb-4">Why Choose CV Forge Ai</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Modern designs</h3>
              <p className="text-sm text-muted-foreground">Professional templates designed by HR experts</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Simple interface</h3>
              <p className="text-sm text-muted-foreground">Create your resume in minutes, not hours</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Job matching</h3>
              <p className="text-sm text-muted-foreground">Find positions that match your skills and experience</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">AI assistance</h3>
              <p className="text-sm text-muted-foreground">Improve your resume with AI-powered suggestions</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
