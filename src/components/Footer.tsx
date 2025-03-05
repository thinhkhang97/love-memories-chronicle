
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white/50 backdrop-blur-sm border-t border-foreground/5 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-medium mb-4">Forever Us</h3>
            <p className="text-foreground/70">
              A beautiful place to capture and celebrate your most precious moments together.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-love-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/moments" className="text-foreground/70 hover:text-love-600 transition-colors">
                  Moments
                </Link>
              </li>
              <li>
                <Link to="/add-moment" className="text-foreground/70 hover:text-love-600 transition-colors">
                  Add Memory
                </Link>
              </li>
              <li>
                <Link to="/anniversary" className="text-foreground/70 hover:text-love-600 transition-colors">
                  Our Anniversary
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Our Anniversary</h3>
            <p className="text-foreground/70">
              A special place to celebrate your love journey together and count down to your special day.
            </p>
            <div className="mt-4">
              <Link 
                to="/anniversary" 
                className="inline-flex items-center text-love-600 hover:text-love-700 transition-colors"
              >
                <Heart size={16} className="mr-1" />
                <span>Set Your Anniversary</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 pt-6 border-t border-foreground/5">
          <p className="text-foreground/60 text-sm">
            Forever Us &copy; {new Date().getFullYear()} • Made with 
            <Heart size={14} className="inline-block mx-1 text-love-500" /> 
            for your love story
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
