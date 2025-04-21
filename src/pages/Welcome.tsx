
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";

const Welcome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Return null while checking for user to avoid flash of content
  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-white p-4">
      <Card className="w-full shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-purple-900">Welcome!</CardTitle>
          <CardDescription className="text-2xl font-medium text-purple-700">
            {user.first_name}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            You've successfully logged into your GetItAll account.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            User details:<br />
            Email: {user.email}<br />
            Name: {user.first_name} {user.last_name}
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleLogout} 
            className="w-full bg-purple-800 hover:bg-purple-900"
          >
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Welcome;
