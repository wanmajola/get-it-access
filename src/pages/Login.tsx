
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Success",
        description: "Login successful!",
      });
      navigate("/welcome");
    } else {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-white p-4">
      <Card className="w-full shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-purple-900">GetItAll</CardTitle>
          <CardDescription className="text-purple-700">Login to your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-purple-800 hover:bg-purple-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </>
              )}
            </Button>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-700 hover:text-purple-900 font-semibold">
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
