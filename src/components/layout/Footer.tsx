import React from 'react';
import { Link } from 'react-router-dom';
import { Copyright, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [{
    icon: Facebook,
    url: '#'
  }, {
    icon: Instagram,
    url: '#'
  }, {
    icon: Twitter,
    url: '#'
  }, {
    icon: Linkedin,
    url: '#'
  }];
  const footerLinks = [{
    title: 'Product',
    links: [{
      name: 'Templates',
      url: '/templates'
    }, {
      name: 'AI Tools',
      url: '/ai-tools'
    }, {
      name: 'Pricing',
      url: '/pricing'
    }]
  }, {
    title: 'Company',
    links: [{
      name: 'About',
      url: '/about'
    }, {
      name: 'Careers',
      url: '/careers'
    }, {
      name: 'Contact',
      url: '/contact'
    }]
  }, {
    title: 'Resources',
    links: [{
      name: 'Blog',
      url: '/blog'
    }, {
      name: 'Help Center',
      url: '/support'
    }, {
      name: 'FAQs',
      url: '/faqs'
    }]
  }];
  return <footer className="bg-secondary/10 dark:bg-secondary/20 py-12 mt-16">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* Company Logo and Description */}
        <div className="mb-6 md:mb-0">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-serif text-xl font-bold text-resume-accent">CV</span>
            <span className="font-serif text-xl font-bold">Forge Ai</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Create professional resumes with AI-powered tools and expert templates.
          </p>
        </div>

        {/* Footer Links */}
        {footerLinks.map(section => <div key={section.title}>
            <h4 className="font-bold mb-4">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map(link => <li key={link.name}>
                  <Link to={link.url} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>)}

        {/* Social Links */}
        <div className="mt-6 md:mt-0">
          <h4 className="font-bold mb-4">Connect</h4>
          <div className="flex space-x-4">
            {socialLinks.map(({
            icon: Icon,
            url
          }) => <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon className="w-6 h-6" />
              </a>)}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-4 mt-8 pt-6 border-t border-border text-center">
        <div className="flex justify-center items-center text-sm text-muted-foreground">
          <Copyright className="mr-2 w-4 h-4" />
          {currentYear} Resume Reimagined. All rights reserved.
        </div>
      </div>
    </footer>;
};
export default Footer;