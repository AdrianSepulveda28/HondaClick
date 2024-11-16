import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: `${username}@honda.click`, // Using email format required by Supabase
        password,
      });

      if (error) throw error;

      // Check if user is admin (you'll need to set this in your user metadata)
      if (user?.user_metadata?.role === 'admin') {
        toast({
          title: "Admin Login Successful",
          description: "Welcome back, Admin!",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        navigate('/home');
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-honda-click bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <Input 
                  type="text" 
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input 
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-honda-red hover:bg-red-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <p className="text-center text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-honda-red hover:underline">
                  Register here
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;