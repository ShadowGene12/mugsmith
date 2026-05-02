import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Users, Coffee, Gift, Star, Mail, Instagram, ArrowRight } from "lucide-react";
import { SEO, pageSEO } from "@/hooks/useSEO";

export default function CommunityPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Welcome to the Mugsmith Circle!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Drops",
      description: "Be the first to know about limited edition mugs and early access to new collections.",
    },
    {
      icon: Star,
      title: "Member Discounts",
      description: "Enjoy special pricing and exclusive offers only available to Circle members.",
    },
    {
      icon: Coffee,
      title: "Coffee Culture",
      description: "Join our community of coffee lovers who appreciate the ritual of a perfect cup.",
    },
    {
      icon: Users,
      title: "Community Events",
      description: "Virtual coffee sessions, workspace tours, and meetups with fellow enthusiasts.",
    },
  ];

  return (
    <Layout>
      <SEO {...pageSEO.community} />
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full mb-6">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Join 500+ Members</span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl font-semibold text-foreground mb-6">
              The Mugsmith Circle
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              More than a mug. A community of intentional people who believe in 
              meaningful rituals, beautiful design, and the power of a perfect cup.
            </p>

            {/* Email Signup Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button 
                type="submit" 
                variant="cta" 
                size="lg"
                disabled={isSubmitting}
                className="group"
              >
                {isSubmitting ? "Joining..." : "Join the Circle"}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <p className="text-sm text-muted-foreground mt-4">
              Free to join. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Circle Member Benefits
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join a community that values quality, intention, and the small moments that make life meaningful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-card p-6 rounded-xl shadow-soft animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-20">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Follow the Journey
            </h2>
            <p className="text-muted-foreground mb-8">
              Behind-the-scenes, new designs, and daily inspiration for your workspace ritual.
            </p>

            <div className="flex justify-center gap-4">
              <Button variant="outline" size="lg" className="group" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 mr-2" />
                  @mugsmith
                </a>
              </Button>
              <Button variant="outline" size="lg" className="group" asChild>
                <a href="mailto:hello@mugsmith.in">
                  <Mail className="h-5 w-5 mr-2" />
                  hello@mugsmith.in
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-foreground text-background">
        <div className="container-wide text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Ready to Join?
          </h2>
          <p className="text-background/70 mb-8 max-w-lg mx-auto">
            Enter your email above and become part of a community that celebrates 
            the ritual of a perfect cup.
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-background text-background hover:bg-background hover:text-foreground"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Join the Mugsmith Circle
          </Button>
        </div>
      </section>
    </Layout>
  );
}