
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MomentCard, { Moment } from "@/components/MomentCard";
import { PlusCircle, Search, Calendar, SlidersHorizontal } from "lucide-react";

// Demo data
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
  {
    id: "4",
    title: "Beach Day",
    date: new Date("2022-07-15"),
    description: "Perfect day at the beach. The sun was shining and the water was so refreshing.",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    tags: ["beach", "summer", "relaxation"],
    isPrivate: false,
  },
];

const MomentsPage = () => {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [filteredMoments, setFilteredMoments] = useState<Moment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Simulate loading moments from storage
  useEffect(() => {
    const storedMoments = localStorage.getItem("moments");
    
    setTimeout(() => {
      if (storedMoments) {
        setMoments(JSON.parse(storedMoments));
        setFilteredMoments(JSON.parse(storedMoments));
      } else {
        setMoments(DEMO_MOMENTS);
        setFilteredMoments(DEMO_MOMENTS);
      }
      
      setIsLoaded(true);
    }, 1000);
  }, []);
  
  // Filter and sort moments when search query or sort option changes
  useEffect(() => {
    let result = [...moments];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (moment) =>
          moment.title.toLowerCase().includes(query) ||
          moment.description.toLowerCase().includes(query) ||
          moment.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.date.getTime() - a.date.getTime();
        case "oldest":
          return a.date.getTime() - b.date.getTime();
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    
    setFilteredMoments(result);
  }, [moments, searchQuery, sortBy]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient">
      <Navbar />
      
      <main className="flex-1 pt-28">
        <section className="section">
          <div className="mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-serif font-medium mb-6">Your Special Moments</h1>
              <p className="text-foreground/70 mb-8 max-w-2xl">
                Browse through your collection of precious memories, filter them by date or tags, 
                and relive your favorite moments together.
              </p>
            </motion.div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
                <Input
                  placeholder="Search moments..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10 bg-white/70"
                />
              </div>
              
              <div className="flex gap-4">
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px] bg-white/70">
                    <SlidersHorizontal size={16} className="mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  asChild
                  className="bg-love-500 hover:bg-love-600 text-white btn-hover"
                >
                  <Link to="/add-moment">
                    <PlusCircle size={18} className="mr-2" />
                    Add Memory
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {isLoaded ? (
            <>
              {filteredMoments.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredMoments.map((moment, index) => (
                    <motion.div
                      key={moment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <MomentCard moment={moment} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card className="glass-card p-10 text-center">
                  {searchQuery ? (
                    <>
                      <p className="text-foreground/70 mb-4">No moments found for "{searchQuery}"</p>
                      <Button 
                        variant="outline" 
                        onClick={() => setSearchQuery("")}
                        className="border-love-200 text-love-700 hover:bg-love-50"
                      >
                        Clear Search
                      </Button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </Card>
              )}
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="glass-card h-96 animate-pulse">
                  <div className="h-full flex items-center justify-center">
                    <span className="text-foreground/30">Loading...</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MomentsPage;
