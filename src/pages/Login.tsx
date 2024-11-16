import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Temporary login logic until backend is implemented
    if (username === "admin") {
      toast({
        title: "Admin Login Successful",
        description: "Welcome back, Admin!",
      });
      navigate('/admin');
    } else {
      toast({
        title: "User Login Successful",
        description: "Welcome back!",
      });
      navigate('/home');
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
                />
              </div>
              <Button type="submit" className="w-full bg-honda-red hover:bg-red-600 text-white">
                Login
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