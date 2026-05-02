import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background pt-24 pb-20 md:pt-36 md:pb-32">
      {/* Minimalist Editorial Accents */}
      <div className="absolute top-1/4 right-[15%] w-px h-48 bg-border/40 hidden lg:block" />
      <div className="absolute top-[15%] left-[10%] w-48 h-px bg-border/40 hidden lg:block" />

      <div className="container-wide relative z-10 w-full px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left Typography Block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 mb-10">
              <span className="w-6 h-px bg-accent"></span>
              <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted-foreground">
                The Archetype Collection
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-[6rem] text-foreground mb-8 leading-[1.1] tracking-normal font-light">
              A piece that <span className="italic font-normal">reflects</span> your workspace ritual.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-xl leading-[1.8] tracking-wide font-light">
              Seven distinct archetypes. Premium ceramics crafted in India for those who value the quiet details of their day.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <Button asChild variant="cta" size="xl" className="w-full sm:w-auto">
                <Link to="/quiz">
                  Find Your Archetype
                </Link>
              </Button>
              <Button asChild variant="minimal" className="group w-full sm:w-auto h-14 text-sm tracking-widest uppercase">
                <Link to="/collections/the-architect">
                  Explore Catalog
                  <ArrowRight className="h-4 w-4 ml-3 group-hover:translate-x-2 transition-transform duration-500 ease-out text-accent" />
                </Link>
              </Button>
            </div>

            <div className="mt-14 flex items-center gap-4 text-muted-foreground">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-stone-200 border-2 border-background shadow-sm"
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-xs tracking-wider capitalize font-medium">Rated 4.9/5 · 500+ Early Backers</span>
              </div>
            </div>
          </motion.div>

          {/* Right Editorial Image/Card */}
          <motion.div 
            initial={{ opacity: 0, clipPath: "inset(10% 10% 10% 10%)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 relative mt-16 lg:mt-0"
          >
            <div className="relative w-full aspect-[3/4] max-w-sm mx-auto lg:mr-0 group">
              <div className="absolute inset-0 bg-accent/20 transform translate-x-4 translate-y-4 rounded-sm transition-transform duration-700 group-hover:translate-x-6 group-hover:translate-y-6 border border-accent/10" />

              <div className="absolute inset-0 bg-stone-100 rounded-sm overflow-hidden z-10 shadow-sm transition-all duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2">
                <img 
                  src="/images/products/bld-sediment.jpg" 
                  alt="The Builder Archetype Mug"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2070&auto=format&fit=crop"; 
                  }}
                />
              </div>
              
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 rotate-180 hidden md:block z-20" style={{ writingMode: 'vertical-rl' }}>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground rotate-90 origin-center whitespace-nowrap">
                  The Builder — Sediment
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
