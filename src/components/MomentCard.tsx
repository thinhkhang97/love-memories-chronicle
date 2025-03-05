
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, Eye } from "lucide-react";

export interface Moment {
  id: string;
  title: string;
  date: Date;
  description: string;
  imageUrl: string;
  tags: string[];
  isPrivate: boolean;
}

interface MomentCardProps {
  moment: Moment;
  isDetailView?: boolean;
}

const MomentCard = ({ moment, isDetailView = false }: MomentCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const cardClass = isDetailView 
    ? "w-full" 
    : "w-full h-full card-hover";

  return (
    <Card className={`glass-card overflow-hidden ${cardClass}`}>
      <div className="relative overflow-hidden aspect-video">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient animate-pulse flex items-center justify-center">
            <span className="text-love-600/50">Loading...</span>
          </div>
        )}
        <img
          src={moment.imageUrl}
          alt={moment.title}
          className={`w-full h-full object-cover transition-all duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="absolute top-0 left-0 p-3">
          <div className="flex gap-2">
            {moment.isPrivate && (
              <Badge variant="outline" className="bg-white/80 text-love-700">
                Private
              </Badge>
            )}
            <Badge className="bg-love-500 text-white">
              <Calendar size={14} className="mr-1" />
              {formatDate(moment.date)}
            </Badge>
          </div>
        </div>
      </div>
      
      <CardContent className="pt-5">
        <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground mb-2">
          {moment.title}
        </h3>
        
        {isDetailView ? (
          <div className="mt-4 text-foreground/80">
            <p>{moment.description}</p>
          </div>
        ) : (
          <p className="line-clamp-2 text-foreground/80">
            {moment.description}
          </p>
        )}
        
        {moment.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {moment.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-foreground/5 hover:bg-foreground/10">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      {!isDetailView && (
        <CardFooter className="pt-0 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-love-600 hover:text-love-700 hover:bg-love-100 p-0 h-auto"
          >
            <Heart size={18} className="mr-1" />
            <span>Memory</span>
          </Button>
          
          <Button asChild size="sm" className="bg-love-500 hover:bg-love-600 btn-hover">
            <Link to={`/moments/${moment.id}`}>
              <Eye size={16} className="mr-1" />
              <span>View</span>
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default MomentCard;
