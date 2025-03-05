
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Upload, X, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { v4 as uuidv4 } from 'uuid';

export interface MomentFormData {
  id: string;
  title: string;
  date: Date;
  description: string;
  imageUrl: string;
  tags: string[];
  isPrivate: boolean;
}

interface MomentFormProps {
  onSave: (moment: MomentFormData) => void;
  initialData?: Partial<MomentFormData>;
}

const defaultImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027",
];

const MomentForm = ({ onSave, initialData }: MomentFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<MomentFormData>>({
    id: initialData?.id || uuidv4(),
    title: initialData?.title || "",
    date: initialData?.date || new Date(),
    description: initialData?.description || "",
    imageUrl: initialData?.imageUrl || defaultImages[0],
    tags: initialData?.tags || [],
    isPrivate: initialData?.isPrivate || false,
  });
  
  const [newTag, setNewTag] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, date }));
    }
  };

  const handlePrivacyToggle = (isPrivate: boolean) => {
    setFormData((prev) => ({ ...prev, isPrivate }));
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
    }));
  };

  const handleSelectImage = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, imageUrl }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.imageUrl) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Cast as MomentFormData since we've verified all required fields
    onSave(formData as MomentFormData);
    
    toast({
      title: "Success!",
      description: "Your moment has been saved.",
    });
    
    navigate("/moments");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="glass-card w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-serif text-center">
            {initialData?.id ? "Edit Memory" : "Create New Memory"}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Our First Date"
              className="bg-white/70"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-white/70"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? (
                    format(formData.date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Share the details of this special memory..."
              className="min-h-[120px] bg-white/70"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Image</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {defaultImages.map((imageUrl) => (
                <div
                  key={imageUrl}
                  className={`relative aspect-video rounded-md overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-love-400 ${
                    formData.imageUrl === imageUrl ? "ring-2 ring-love-500" : ""
                  }`}
                  onClick={() => handleSelectImage(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt="Moment"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="relative aspect-video rounded-md overflow-hidden border-2 border-dashed border-foreground/20 flex items-center justify-center bg-foreground/5 cursor-pointer hover:bg-foreground/10 transition-colors">
                <Upload size={24} className="text-foreground/50" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex space-x-2">
              <Input
                id="newTag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag (e.g., vacation)"
                className="bg-white/70"
              />
              <Button 
                type="button" 
                onClick={handleAddTag}
                className="bg-love-500 hover:bg-love-600"
              >
                <Plus size={16} />
              </Button>
            </div>
            
            {formData.tags && formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-foreground/10 gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 rounded-full hover:bg-foreground/20 p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="privacy"
              checked={formData.isPrivate}
              onCheckedChange={handlePrivacyToggle}
            />
            <Label htmlFor="privacy">Make this memory private</Label>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className="border-love-200 hover:bg-love-50"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-love-500 hover:bg-love-600 btn-hover"
          >
            Save Memory
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default MomentForm;
