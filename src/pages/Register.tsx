import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Register = () => {
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
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <Input placeholder="Choose a username" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" placeholder="Create a password" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Repeat Password</label>
                <Input type="password" placeholder="Repeat your password" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ID Number</label>
                <Input placeholder="Enter your ID number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Plate Number</label>
                <Input placeholder="Enter your plate number" />
              </div>
              <Button className="w-full bg-honda-red hover:bg-red-600 text-white">
                Register
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