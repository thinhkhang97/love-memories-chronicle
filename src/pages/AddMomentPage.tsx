
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MomentForm, { MomentFormData } from "@/components/MomentForm";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { motion } from "framer-motion";

const AddMomentPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSaveMoment = (newMoment: MomentFormData) => {
    try {
      // Get existing moments from localStorage
      const existingMomentsJSON = localStorage.getItem("moments");
      const moments = existingMomentsJSON ? JSON.parse(existingMomentsJSON) : [];
      
      // Add the new moment with a unique ID
      const momentWithId = {
        ...newMoment,
        id: newMoment.id || uuidv4()
      };
      
      // Save back to localStorage
      localStorage.setItem("moments", JSON.stringify([...moments, momentWithId]));
      
      toast({
        title: "Memory Saved",
        description: "Your special moment has been saved successfully.",
      });
      
      navigate("/moments");
    } catch (error) {
      console.error("Error saving moment:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your memory. Please try again.",
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
            <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4">Create a New Memory</h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Capture and preserve your special moments forever. Add photos, details, and feelings to create a beautiful memory.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MomentForm onSave={handleSaveMoment} />
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddMomentPage;
