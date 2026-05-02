import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, MapPin, Clock } from "lucide-react";
import { SEO, pageSEO } from "@/hooks/useSEO";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
  };

  return (
    <Layout>
      <SEO {...pageSEO.contact} />
      <div className="container-narrow py-16 md:py-24">
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            We're Here to Help
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Questions about your order, shipping, or finding the right mug? Our team replies within one business day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" placeholder="Full name" required />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <Label htmlFor="message">How can we help?</Label>
              <Textarea id="message" rows={5} placeholder="Tell us what's on your mind..." required />
            </div>
            <Button type="submit" variant="cta" size="lg">Send Message</Button>
          </form>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 text-accent mt-1" />
              <div>
                <h3 className="font-medium text-foreground">Email Us</h3>
                <p className="text-muted-foreground">hello@mugsmith.in</p>
                <p className="text-xs text-muted-foreground mt-1">For order issues, returns, or general questions</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="h-5 w-5 text-accent mt-1" />
              <div>
                <h3 className="font-medium text-foreground">Response Time</h3>
                <p className="text-muted-foreground">Within 24 hours on business days</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-accent mt-1" />
              <div>
                <h3 className="font-medium text-foreground">Based In</h3>
                <p className="text-muted-foreground">Mumbai, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
