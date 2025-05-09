
import React from 'react';
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Briefcase } from "lucide-react";

export default function Header() {
  const { isAuthenticated, userRole } = useAuth();
  
  return <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold text-resume-accent">CV </span>
            <span className="font-serif text-xl font-bold">Forge Ai</span>
            <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">PRO</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/templates" className="text-sm font-medium hover:text-primary">Templates</Link>
          <Link to="/ai-tools" className="text-sm font-medium hover:text-primary">AI Tools</Link>
          <Link to="/jobs" className="text-sm font-medium hover:text-primary flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            Jobs
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary">Pricing</Link>
          <Link to="/support" className="text-sm font-medium hover:text-primary">Support</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {userRole === "admin" && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin">Admin Dashboard</Link>
                </Button>
              )}
              <Button variant="outline" size="sm" asChild>
                <Link to="/profile">Profile</Link>
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/login">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>;
}
