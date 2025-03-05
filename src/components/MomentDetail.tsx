
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, ArrowLeft, Edit, Share2, Image } from "lucide-react";
import MomentCard, { Moment } from "./MomentCard";

interface MomentDetailProps {
  moment: Moment;
  onEdit?: () => void;
}

const MomentDetail = ({ moment, onEdit }: MomentDetailProps) => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <Button 
          variant="ghost" 
          className="text-love-600 hover:text-love-700 hover:bg-love-50"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Memories
        </Button>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="border-love-200 text-love-600 hover:bg-love-50"
            asChild
          >
            <Link to={`/story-view/${moment.id}`}>
              <Image size={16} className="mr-2" />
              Story View
            </Link>
          </Button>
          
          {onEdit && (
            <Button 
              className="bg-love-500 hover:bg-love-600 btn-hover"
              onClick={onEdit}
            >
              <Edit size={16} className="mr-2" />
              Edit
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gradient animate-pulse flex items-center justify-center">
              <span className="text-love-600/50">Loading...</span>
            </div>
          )}
          <img
            src={moment.imageUrl}
            alt={moment.title}
            className={`w-full h-full object-cover aspect-square md:aspect-auto transition-all duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className="bg-love-500 text-white">
                <Calendar size={14} className="mr-1" />
                {formatDate(moment.date)}
              </Badge>
              
              {moment.isPrivate && (
                <Badge variant="outline" className="bg-foreground/5 text-foreground">
                  Private
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif font-medium mb-3">
              {moment.title}
            </h1>
            
            <div className="prose max-w-none text-foreground/80">
              <p>{moment.description}</p>
            </div>
          </div>
          
          {moment.tags.length > 0 && (
            <div className="pt-4">
              <h3 className="text-sm text-foreground/60 mb-2">Tagged:</h3>
              <div className="flex flex-wrap gap-2">
                {moment.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-foreground/5 hover:bg-foreground/10">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            className="text-love-600 hover:text-love-700 hover:bg-love-50"
          >
            <Heart size={18} className="mr-2" />
            Mark as Favorite
          </Button>
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-serif mb-6">More Memories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* This would be populated with related moments */}
          <Card className="glass-card animate-pulse-soft">
            <div className="p-8 text-center text-foreground/60">
              <p>Create more memories to see them here!</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MomentDetail;
