
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";

const AuthPage = () => {
  const { signIn, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in, redirect to home page
    if (user && !isLoading) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient">
        <div className="text-love-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="glass-card w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Heart size={40} className="text-love-500 animate-pulse-soft" />
            </div>
            <CardTitle className="text-3xl font-serif">Welcome to Forever Us</CardTitle>
            <CardDescription>Sign in to capture and cherish your precious moments together</CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col gap-4">
            <Button 
              onClick={signIn}
              className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 flex items-center justify-center gap-2"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-5 h-5" />
              Sign in with Google
            </Button>
          </CardContent>
          
          <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
            <p>Your memories are secured with privacy controls</p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
