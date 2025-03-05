
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";
import MomentCard, { Moment } from "@/components/MomentCard";
import { Heart, Calendar, PlusCircle, ArrowRight } from "lucide-react";

// Demo data for the initial state
const DEMO_MOMENTS: Moment[] = [
  {
    id: "1",
    title: "Our First Date",
    date: new Date("2020-06-12"),
    description: "We went to that cute cafe downtown and talked for hours. It was perfect!",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    tags: ["first date", "cafe", "beginning"],
    isPrivate: false,
  },
  {
    id: "2",
    title: "Weekend Getaway",
    date: new Date("2021-08-23"),
    description: "Our spontaneous trip to the mountains. The views were breathtaking and the cabin was so cozy.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    tags: ["vacation", "mountains", "adventure"],
    isPrivate: false,
  },
  {
    id: "3",
    title: "Anniversary Dinner",
    date: new Date("2023-06-12"),
    description: "Celebrating our journey with an amazing dinner at our favorite restaurant.",
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    tags: ["anniversary", "dinner", "celebration"],
    isPrivate: true,
  },
];

// Set a demo anniversary date (today plus 30 days)
const DEMO_ANNIVERSARY_DATE = new Date();
DEMO_ANNIVERSARY_DATE.setDate(DEMO_ANNIVERSARY_DATE.getDate() + 30);

const Index = () => {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [anniversaryDate, setAnniversaryDate] = useState<Date>(DEMO_ANNIVERSARY_DATE);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Simulate loading moments from storage
  useEffect(() => {
    const storedMoments = localStorage.getItem("moments");
    const storedAnniversary = localStorage.getItem("anniversaryDate");
    
    setTimeout(() => {
      if (storedMoments) {
        setMoments(JSON.parse(storedMoments));
      } else {
        setMoments(DEMO_MOMENTS);
      }
      
      if (storedAnniversary) {
        setAnniversaryDate(new Date(storedAnniversary));
      }
      
      setIsLoaded(true);
    }, 1000);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="section pt-24 pb-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-love-200 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-200 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block mb-4">
                <Heart size={40} className="text-love-500 animate-pulse-soft" />
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-6">
                Celebrate Your Love Story
              </h1>
              
              <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                Capture your most precious moments and count down to your special day.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-love-500 hover:bg-love-600 text-white btn-hover"
                >
                  <Link to="/add-moment">
                    <PlusCircle size={18} className="mr-2" />
                    Add a Memory
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  size="lg" 
                  variant="outline" 
                  className="border-love-200 text-love-700 hover:bg-love-50"
                >
                  <Link to="/anniversary">
                    <Calendar size={18} className="mr-2" />
                    Set Anniversary
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16"
            >
              <CountdownTimer targetDate={anniversaryDate} />
            </motion.div>
          </div>
        </section>
        
        {/* Recent Moments Section */}
        <section className="section py-20 bg-white/50">
          <div className="mb-10 flex justify-between items-center">
            <h2 className="text-3xl font-serif font-medium">Recent Moments</h2>
            <Button 
              asChild
              variant="ghost" 
              className="text-love-600 hover:text-love-700 hover:bg-love-50"
            >
              <Link to="/moments">
                <span>View All</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
          
          {isLoaded ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {moments.slice(0, 3).map((moment) => (
                <motion.div
                  key={moment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <MomentCard moment={moment} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="glass-card h-96 animate-pulse">
                  <div className="h-full flex items-center justify-center">
                    <span className="text-foreground/30">Loading...</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {isLoaded && moments.length === 0 && (
            <Card className="glass-card p-10 text-center">
              <p className="text-foreground/70 mb-6">You haven't added any memories yet.</p>
              <Button 
                asChild
                className="bg-love-500 hover:bg-love-600 btn-hover"
              >
                <Link to="/add-moment">
                  <PlusCircle size={18} className="mr-2" />
                  Create Your First Memory
                </Link>
              </Button>
            </Card>
          )}
        </section>
        
        {/* Features Section */}
        <section className="section py-20">
          <h2 className="text-3xl font-serif font-medium text-center mb-12">
            Celebrate Your Journey Together
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<Heart size={32} className="text-love-500" />}
              title="Capture Moments"
              description="Save your most precious memories with photos, stories, and dates to cherish forever."
            />
            
            <FeatureCard 
              icon={<Calendar size={32} className="text-love-500" />}
              title="Anniversary Countdown"
              description="Count the days to your special day with a beautiful countdown timer."
            />
            
            <FeatureCard 
              icon={<PlusCircle size={32} className="text-love-500" />}
              title="Growing Collection"
              description="Build a growing gallery of your love story that you can look back on for years to come."
            />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section py-20 bg-gradient">
          <Card className="glass-card overflow-hidden">
            <div className="p-10 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
                Start Building Your Love Chronicle Today
              </h2>
              
              <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                Create a beautiful collection of memories that you can cherish forever and share with your loved ones.
              </p>
              
              <Button 
                asChild
                size="lg" 
                className="bg-love-500 hover:bg-love-600 text-white btn-hover"
              >
                <Link to="/add-moment">
                  <Heart size={18} className="mr-2" />
                  Add Your First Memory
                </Link>
              </Button>
            </div>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <Card className="glass-card h-full flex flex-col items-center text-center p-8">
    <div className="mb-6 bg-love-50 p-4 rounded-full">
      {icon}
    </div>
    <h3 className="text-xl font-serif font-medium mb-4">{title}</h3>
    <p className="text-foreground/70">{description}</p>
  </Card>
);

export default Index;
