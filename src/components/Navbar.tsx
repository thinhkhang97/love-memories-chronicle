
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <h1 className="text-2xl font-serif font-semibold text-love-700 group-hover:text-love-600 transition-colors">
            <span className="animate-pulse-soft inline-block">♥</span> Forever Us
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/moments">Moments</NavLink>
          <NavLink to="/add-moment">Add Memory</NavLink>
          <Button 
            asChild 
            className="bg-love-500 hover:bg-love-600 text-white btn-hover"
          >
            <Link to="/anniversary">Our Anniversary</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)}
            className="text-love-700"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass animate-fade-in">
          <div className="flex flex-col space-y-4 px-4 py-6">
            <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/moments" onClick={() => setIsOpen(false)}>Moments</MobileNavLink>
            <MobileNavLink to="/add-moment" onClick={() => setIsOpen(false)}>Add Memory</MobileNavLink>
            <Button 
              asChild 
              className="w-full bg-love-500 hover:bg-love-600 text-white btn-hover"
              onClick={() => setIsOpen(false)}
            >
              <Link to="/anniversary">Our Anniversary</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-foreground/80 hover:text-love-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-love-400 after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ 
  to, 
  children, 
  onClick 
}: { 
  to: string; 
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link
    to={to}
    className="text-foreground/80 hover:text-love-600 transition-colors py-2 text-lg font-medium w-full block"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
