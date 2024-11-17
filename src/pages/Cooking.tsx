import { useLocation, useNavigate } from "react-router-dom";
import { cookingSteps, RecipeWithId } from "@/lib/types/recipeTypes";
import { useEffect, useMemo, useState, useRef } from "react";
import { Navbar2 } from "@/components/Navbar2";
import { useTimer } from "react-timer-hook";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
} from "lucide-react";
import Background from "/background3.png";
import { useUser } from "@/context/UserContext";

const Cooking = () => {
  const location = useLocation();
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();
  const { userData } = useUser();

  const toggleBack = () => {
    navigate(-1);
  };

  const toggleHome = () => {
    navigate("/");
  };

  useEffect(() => {
    audioRef.current = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
    );
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isCompleted && userData) {
      userData.completedRecipes?.push(foodItem);
      if (typeof userData.weeklyCompleted === "number") {
        userData.weeklyCompleted += 1;
      } else {
        userData.weeklyCompleted = 1; 
      }
    }
  }, [isCompleted]);

  const foodItem = useMemo(
    () => location.state as RecipeWithId,
    [location.state]
  );

  const cookingSteps: cookingSteps[] = useMemo(
    () =>
      foodItem.data.cookingSteps
        .map((step) => ({
          isTimed: step.isTimed,
          name: step.name,
          order: step.order,
          time: step.time,
        }))
        .sort((a, b) => a.order - b.order),
    [foodItem.data.cookingSteps]
  );

  const getExpiryTimestamp = (minutes: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + minutes * 60);
    return time;
  };

  const { seconds, minutes, isRunning, start, pause, restart } = useTimer({
    expiryTimestamp: getExpiryTimestamp(cookingSteps[0]?.time || 0),
    autoStart: false,
    onExpire: () => {
      if (!isMuted && audioRef.current) {
        audioRef.current.play();
      }
      if (currentStepIndex === cookingSteps.length - 1) {
        setIsCompleted(true);
        audioRef.current?.pause();
      } else {
      }
    },
  });

  useEffect(() => {
    if (currentStepIndex < cookingSteps.length) {
      const currentStep = cookingSteps[currentStepIndex];
      let expiryTime = getExpiryTimestamp(currentStep.time);
      restart(expiryTime, false);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [currentStepIndex, cookingSteps, restart]);

  const handlePlayPause = () => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  };

  const handleReset = () => {
    const currentStep = cookingSteps[currentStepIndex];
    const time = getExpiryTimestamp(currentStep.time);
    restart(time, false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < cookingSteps.length - 1) {
      setCurrentStepIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex != 0) {
      setCurrentStepIndex((prevIndex) => prevIndex - 1);
    } else {
      setIsCompleted(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      if (!isMuted) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };
  

  const currentStep = cookingSteps[currentStepIndex];

  if (isCompleted) {
    return (
      <>
        <Navbar2 />
        <div
          className="w-full min-h-screen flex flex-col items-center justify-center px-6 font-raleway pb-20 bg-darkGreen "
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Cooking Complete!</h1>
            <p className="text-2xl">Enjoy your meal! 🥳</p>
          </div>
          <div className="absolute bottom-20 mt-8 flex justify-between items-center w-full  px-8">
            <button
              onClick={toggleHome}
              className="w-full h-14 rounded-2xl bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors text-white text-[20px]"
            >
              home
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar2 />
      <div
        className="w-full min-h-screen flex flex-col items-center px-6  pb-10 bg-darkGreen font-kanit"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        

        <div className="mt-24 flex flex-col items-center gap-8 ">
          <div className="text-white text-center px-4 ">
            <h2 className="text-2xl font-semibold mb-2">
              Step {currentStepIndex + 1}
            </h2>
            <p className="text-md">{currentStep?.name}</p>
            <p className="text-lg mt-2 ">
              Duration: {currentStep?.time} minutes
            </p>
          </div>

          <div className="w-64 h-64 font-kanit rounded-full bg-white  flex items-center justify-center  backdrop-filter backdrop-blur-md bg-opacity-35">
            <div className="text-white text-5xl font-medium">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>
          </div>
        </div>

        <section className="mt-20 h-20 flex justify-between items-center w-full gap-x-3 px-2">
          <button
            onClick={handlePreviousStep}
            disabled={currentStepIndex == 0}
            className="w-1/3 h-full rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={handlePlayPause}
            className="w-1/2 h-full rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isRunning ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white" />
            )}
          </button>

          <button
            onClick={handleNextStep}
            disabled={currentStepIndex >= cookingSteps.length - 1}
            className="w-1/3 h-full rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </section>
        <div className="mt-3 flex justify-between items-center w-full gap-x-3 px-2">
          <button
            onClick={handleReset}
            className="w-1/2 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <RotateCcw className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={toggleMute}
            className="w-1/2 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-white" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        <div className="mt-8 flex justify-between items-center w-full  px-2">
          <button
            onClick={toggleBack}
            className="w-full h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors text-white"
          >
            back
          </button>
        </div>
      </div>
    </>
  );
};

export default Cooking;
