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

const Register = () => {
  const { error, register } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !age) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await register({
        email,
        password,
        age: Number(age),
        name: name,
      });
      navigate("/");
    } catch (err) {
      console.error("Error registering:", err);
      if (err instanceof Error) {
        if (err.message.includes("auth/email-already-in-use")) {
          alert(
            "This email is already registered. Please try signing in instead."
          );
        } else {
          alert("Registration failed. Please try again.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative bg-cream w-full pt-[80px] min-h-screen flex flex-col justify-center items-center px-10 font-raleway pb-20"
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
            Become a Pantry Pal! 🤩
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="grid w-full items-center gap-4">
              {/* Name Input */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  autoComplete="off"
                  value={name}
                  className="font-light"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  className="font-light"
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
                  className="font-light"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              {/* Age Input */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  type="number"
                  id="age"
                  value={age}
                  className="font-light font-kanit"
                  onChange={(e) => setAge(Number(e.target.value))}
                  placeholder="Enter your age"
                />
              </div>
            </div>
          </form>
        </CardContent>

        {error && <p className="text-red-500 px-5">{error}</p>}

        <CardFooter className="flex justify-end">
          <Button
            onClick={handleRegister}
            className="bg-mainGreen hover:bg-darkGreen"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </CardFooter>
      </Card>

      <h2 className="w-full text-center absolute bottom-14 text-[20px] text-white font-kanit italic">
        Whisk it, flip it, taste the fun!
      </h2>
    </div>
  );
};

export default Register;
