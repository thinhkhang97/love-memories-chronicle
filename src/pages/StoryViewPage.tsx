
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { useToast } from "@/components/ui/use-toast";
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

const StoryViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [moment, setMoment] = useState<Moment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load moment from localStorage
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
    }, 500);
  }, [id]);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  const captureAsImage = async () => {
    if (!storyRef.current) return;
    
    try {
      const canvas = await html2canvas(storyRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2,
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${moment?.title.replace(/\s+/g, "-").toLowerCase() || "moment"}.png`;
      link.href = image;
      link.click();
      
      toast({
        title: "Moment Captured!",
        description: "Your special moment has been saved as an image.",
      });
    } catch (error) {
      console.error("Error capturing image:", error);
      toast({
        variant: "destructive",
        title: "Capture Failed",
        description: "There was an error capturing your moment.",
      });
    }
  };
  
  const shareStory = async () => {
    if (!moment) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: moment.title,
          text: `Check out this special moment: ${moment.title}`,
        });
      } else {
        toast({
          description: "Sharing is not supported on this device. Try capturing the image instead.",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient">
        <div className="text-love-600 animate-pulse">Loading...</div>
      </div>
    );
  }
  
  if (!moment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient">
        <h1 className="text-2xl font-medium mb-4">Moment not found</h1>
        <Button onClick={() => navigate("/moments")} variant="outline">
          <ArrowLeft size={16} className="mr-2" />
          Back to Moments
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="absolute top-4 left-4 z-10">
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
          onClick={() => navigate(`/moments/${id}`)}
        >
          <ArrowLeft size={20} />
        </Button>
      </div>
      
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
          onClick={captureAsImage}
        >
          <Download size={20} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
          onClick={shareStory}
        >
          <Share2 size={20} />
        </Button>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={moment.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <div 
              ref={storyRef}
              className="relative w-full h-screen flex flex-col items-center justify-end overflow-hidden"
            >
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-black flex items-center justify-center">
                  <div className="text-love-500 animate-pulse">Loading image...</div>
                </div>
              )}
              <img
                src={moment.imageUrl}
                alt={moment.title}
                className="absolute inset-0 w-full h-full object-cover"
                onLoad={() => setIsImageLoaded(true)}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              
              <div className="relative z-10 p-8 text-center max-w-3xl mx-auto mb-16">
                <div className="mb-2 text-love-200">{formatDate(moment.date)}</div>
                <h1 className="text-4xl md:text-5xl font-serif mb-4">{moment.title}</h1>
                <p className="text-lg text-white/80">{moment.description}</p>
                
                {moment.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {moment.tags.map((tag, index) => (
                      <span key={index} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StoryViewPage;
