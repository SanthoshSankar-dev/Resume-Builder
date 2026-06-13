import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Layout, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Shield,
  Clock
} from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Layout,
      title: 'Multiple Templates',
      description: 'Choose from professional, minimal, and creative resume templates.',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Get intelligent suggestions to improve your resume content.',
    },
    {
      icon: Download,
      title: 'PDF Export',
      description: 'Download your polished resume in print-ready PDF format.',
    },
    {
      icon: Zap,
      title: 'Real-time Preview',
      description: 'See changes instantly as you build your resume.',
    },
    {
      icon: Shield,
      title: 'ATS Optimized',
      description: 'Ensure your resume passes applicant tracking systems.',
    },
    {
      icon: Clock,
      title: 'Quick & Easy',
      description: 'Build a professional resume in minutes, not hours.',
    },
  ];

  const steps = [
    { number: '01', title: 'Enter Your Info', description: 'Fill in your details step by step' },
    { number: '02', title: 'Choose Template', description: 'Pick a design that fits your style' },
    { number: '03', title: 'Download PDF', description: 'Export and share your resume' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-lg">Resume Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/builder')}>
              Builder
            </Button>
            <Button size="sm" onClick={() => navigate('/builder')}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        
        <div className="container max-w-6xl mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              AI-Powered Resume Builder
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Build Your Perfect Resume{' '}
              <span className="text-gradient">in Minutes</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Create professional, ATS-friendly resumes with our intelligent builder. 
              Choose from stunning templates and let AI help you stand out.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button size="xl" variant="hero" onClick={() => navigate('/builder')} className="gap-2">
                Start Building Free
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="xl" variant="outline" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                See Features
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-accent" />
                No signup required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-accent" />
                100% Free
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-accent" />
                PDF Export
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Create your professional resume in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.number} 
                className="relative text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-6xl font-display font-bold text-primary/10 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 w-16">
                    <ArrowRight className="w-6 h-6 text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Powerful features to help you create a resume that gets noticed
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
            Ready to Build Your Resume?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join thousands of job seekers who have created winning resumes with our builder.
          </p>
          <Button 
            size="xl" 
            variant="secondary" 
            onClick={() => navigate('/builder')}
            className="gap-2 bg-background text-foreground hover:bg-background/90"
          >
            Create My Resume Now
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-display font-semibold">ResumeAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built for engineers and professionals. Perfect for placement portfolios.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
