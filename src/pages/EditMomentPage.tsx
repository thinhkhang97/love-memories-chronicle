
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MomentForm, { MomentFormData } from "@/components/MomentForm";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Moment } from "@/components/MomentCard";

// Demo data for fallback
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

const EditMomentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [moment, setMoment] = useState<Moment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading moment from localStorage
    setTimeout(() => {
      const storedMomentsJSON = localStorage.getItem("moments");
      const moments = storedMomentsJSON ? JSON.parse(storedMomentsJSON) : DEMO_MOMENTS;
      
      const foundMoment = moments.find((m: Moment) => m.id === id);
      
      if (foundMoment) {
        // Convert date string back to Date object
        foundMoment.date = new Date(foundMoment.date);
        setMoment(foundMoment);
      }
      
      setIsLoading(false);
    }, 1000);
  }, [id]);
  
  const handleSaveMoment = (updatedMoment: MomentFormData) => {
    try {
      // Get existing moments from localStorage
      const storedMomentsJSON = localStorage.getItem("moments");
      const moments = storedMomentsJSON ? JSON.parse(storedMomentsJSON) : DEMO_MOMENTS;
      
      // Find and update the moment
      const updatedMoments = moments.map((m: Moment) => 
        m.id === id ? updatedMoment : m
      );
      
      // Save back to localStorage
      localStorage.setItem("moments", JSON.stringify(updatedMoments));
      
      toast({
        title: "Memory Updated",
        description: "Your memory has been updated successfully.",
      });
      
      navigate(`/moments/${id}`);
    } catch (error) {
      console.error("Error updating moment:", error);
      toast({
        title: "Error",
        description: "There was a problem updating your memory. Please try again.",
        variant: "destructive",
      });
    }
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
            <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4">Edit Your Memory</h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Update the details of your special moment to keep your memories accurate and meaningful.
            </p>
          </motion.div>
          
          {isLoading ? (
            <Card className="glass-card h-96 animate-pulse max-w-3xl mx-auto">
              <div className="h-full flex items-center justify-center">
                <span className="text-foreground/30">Loading...</span>
              </div>
            </Card>
          ) : moment ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MomentForm initialData={moment} onSave={handleSaveMoment} />
            </motion.div>
          ) : (
            <Card className="glass-card p-10 text-center">
              <p className="text-foreground/70 mb-6">Memory not found.</p>
              <Button 
                onClick={() => navigate("/moments")}
                className="bg-love-500 hover:bg-love-600 btn-hover"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Memories
              </Button>
            </Card>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EditMomentPage;
