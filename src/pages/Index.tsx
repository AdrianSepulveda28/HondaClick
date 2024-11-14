import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section with Background */}
      <div className="absolute inset-0 bg-honda-click bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
          Honda Click Community
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-center max-w-2xl">
          Join our exclusive community of Honda Click riders. Register your motorcycle and connect with fellow enthusiasts.
        </p>
        <div className="flex gap-4">
          <Link to="/login">
            <Button className="bg-honda-red hover:bg-red-600 text-white px-8 py-6 text-lg">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-white text-honda-dark hover:bg-gray-100 px-8 py-6 text-lg">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;