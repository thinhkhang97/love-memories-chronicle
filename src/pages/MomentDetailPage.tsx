
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MomentDetail from "@/components/MomentDetail";
import { Moment } from "@/components/MomentCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
];

const MomentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
  
  const handleEdit = () => {
    navigate(`/edit-moment/${id}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20">
        <section className="section">
          {isLoading ? (
            <Card className="glass-card h-96 animate-pulse max-w-5xl mx-auto">
              <div className="h-full flex items-center justify-center">
                <span className="text-foreground/30">Loading...</span>
              </div>
            </Card>
          ) : moment ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MomentDetail moment={moment} onEdit={handleEdit} />
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

export default MomentDetailPage;
