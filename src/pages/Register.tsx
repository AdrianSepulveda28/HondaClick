import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Register user with Supabase
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: `${username}@honda.click`, // Using email format required by Supabase
        password,
        options: {
          data: {
            username,
            id_number: idNumber,
            plate_number: plateNumber,
            role: 'user',
          }
        }
      });

      if (signUpError) throw signUpError;

      // Upload profile picture if one was selected
      if (profilePic && user) {
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(`${user.id}`, profilePic);

        if (uploadError) throw uploadError;
      }

      toast({
        title: "Registration Pending",
        description: "Your registration is pending admin approval. You will be notified once approved.",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Registration Failed",
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
      
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col items-center space-y-4 mb-6">
                <Avatar className="w-32 h-32 border-2 border-honda-red">
                  {profilePic ? (
                    <AvatarImage src={URL.createObjectURL(profilePic)} />
                  ) : (
                    <AvatarFallback className="bg-honda-dark text-white">
                      <User className="w-16 h-16" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="w-full">
                  <label className="text-sm font-medium">Profile Picture</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="mt-1"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <Input 
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input 
                  type="password" 
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <Input 
                  type="password" 
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ID Number</label>
                <Input 
                  placeholder="Enter your ID number"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Plate Number</label>
                <Input 
                  placeholder="Enter your plate number"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-honda-red hover:bg-red-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Register"}
              </Button>
              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-honda-red hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;