import { Input } from "@/components/ui/input";
import Background from "/Background4.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn, error } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn({ email, password });
      navigate("/");
    } catch (err) {
      console.error("Error logging in:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-cream w-full pt-[80px] min-h-screen flex flex-col justify-center items-center px-10 font-kanit pb-20 relative"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card className="w-full shadow-xl overflow-hidden">
        <CardHeader className="bg-mainGreen mb-8">
          <CardTitle className="text-white text-[18px] font-medium tracking-wide">
            Welcome Back, Pal! 👋
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid w-full items-center gap-4">
            {/* Email Input */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            {/* Password Input */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-x-2">
          <Button
            onClick={() => navigate("/register")}
            className="bg-mainGreen hover:bg-darkGreen"
          >
            Register
          </Button>
          <Button
            onClick={handleSignIn}
            className="bg-mainGreen hover:bg-darkGreen"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
      </Card>

      <h2 className="w-full text-center absolute bottom-14 text-[20px] text-white font-kanit italic">Welcome back, Chef!</h2>
    </div>
  );
};

export default Login;
