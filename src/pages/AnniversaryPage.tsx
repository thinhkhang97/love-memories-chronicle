
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";
import { Calendar as CalendarIcon, Heart, Check } from "lucide-react";

const AnniversaryPage = () => {
  const { toast } = useToast();
  const [anniversaryDate, setAnniversaryDate] = useState<Date | undefined>(undefined);
  const [anniversaryName, setAnniversaryName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  
  // Load saved anniversary date and name
  useEffect(() => {
    const savedDate = localStorage.getItem("anniversaryDate");
    const savedName = localStorage.getItem("anniversaryName");
    
    if (savedDate) {
      setAnniversaryDate(new Date(savedDate));
      setIsSaved(true);
    } else {
      // Default to today + 30 days if not set
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 30);
      setAnniversaryDate(defaultDate);
    }
    
    if (savedName) {
      setAnniversaryName(savedName);
    } else {
      setAnniversaryName("Our Anniversary");
    }
  }, []);
  
  const handleSaveAnniversary = () => {
    if (anniversaryDate) {
      localStorage.setItem("anniversaryDate", anniversaryDate.toISOString());
      localStorage.setItem("anniversaryName", anniversaryName || "Our Anniversary");
      
      setIsSaved(true);
      
      toast({
        title: "Anniversary Saved",
        description: "Your special date has been saved successfully.",
      });
    }
  };
  
  const getNextAnniversary = () => {
    if (!anniversaryDate) return undefined;
    
    const today = new Date();
    const nextAnniversary = new Date(anniversaryDate);
    
    // Set the year to current year
    nextAnniversary.setFullYear(today.getFullYear());
    
    // If the anniversary has already passed this year, set it to next year
    if (nextAnniversary < today) {
      nextAnniversary.setFullYear(today.getFullYear() + 1);
    }
    
    return nextAnniversary;
  };
  
  const getYearsTogether = () => {
    if (!anniversaryDate) return 0;
    
    const today = new Date();
    let years = today.getFullYear() - anniversaryDate.getFullYear();
    
    // Adjust for month and day
    if (
      today.getMonth() < anniversaryDate.getMonth() ||
      (today.getMonth() === anniversaryDate.getMonth() &&
        today.getDate() < anniversaryDate.getDate())
    ) {
      years--;
    }
    
    return Math.max(0, years);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20">
        <section className="section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4">Your Anniversary</h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Set and celebrate your special day. We'll keep track of the countdown and help you remember when to celebrate.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Set Your Anniversary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="anniversary-name">Anniversary Name</Label>
                    <Input
                      id="anniversary-name"
                      value={anniversaryName}
                      onChange={(e) => setAnniversaryName(e.target.value)}
                      placeholder="Our Anniversary"
                      className="bg-white/70"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="anniversary-date">Anniversary Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="anniversary-date"
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-white/70"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {anniversaryDate ? (
                            format(anniversaryDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={anniversaryDate}
                          onSelect={setAnniversaryDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <Button
                    onClick={handleSaveAnniversary}
                    className="bg-love-500 hover:bg-love-600 w-full btn-hover"
                  >
                    {isSaved ? (
                      <>
                        <Check size={16} className="mr-2" />
                        Update Anniversary
                      </>
                    ) : (
                      <>
                        <Heart size={16} className="mr-2" />
                        Save Anniversary
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Your Love Journey</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {anniversaryDate && (
                    <>
                      <div className="text-center py-4">
                        <p className="text-foreground/70 mb-2">Your anniversary is on</p>
                        <p className="text-2xl font-serif text-love-700">
                          {format(anniversaryDate, "MMMM d, yyyy")}
                        </p>
                      </div>
                      
                      <div className="text-center py-4 border-t border-b border-foreground/10">
                        <p className="text-foreground/70 mb-2">Years together</p>
                        <p className="text-4xl font-serif text-love-700 flex items-center justify-center gap-2">
                          {getYearsTogether()}
                          <Heart size={24} className="text-love-500 animate-pulse-soft" />
                        </p>
                      </div>
                      
                      <div className="mt-6">
                        <p className="text-center text-foreground/70 mb-4">Next anniversary</p>
                        <CountdownTimer 
                          targetDate={getNextAnniversary() || new Date()} 
                          label={anniversaryName || "Our Anniversary"}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Card className="glass-card max-w-5xl mx-auto">
              <CardContent className="p-10">
                <Heart size={40} className="text-love-500 mx-auto mb-6 animate-pulse-soft" />
                <h2 className="text-2xl md:text-3xl font-serif font-medium mb-4">
                  Celebrate Your Love Story
                </h2>
                <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
                  Your anniversary is not just a date, it's a celebration of your journey together. 
                  Add special memories to commemorate your relationship milestones.
                </p>
                <Button 
                  asChild
                  className="bg-love-500 hover:bg-love-600 btn-hover"
                >
                  <a href="/add-moment">Create an Anniversary Memory</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AnniversaryPage;
