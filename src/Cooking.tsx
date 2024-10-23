import { useLocation } from "react-router-dom";
import { cookingSteps, RecipeWithId } from "./lib/types";
import { useEffect, useMemo, useState, useRef } from "react";
import { Navbar2 } from "./components/Navbar2";
import { useTimer } from "react-timer-hook";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  Volume2,
  VolumeX,
} from "lucide-react";
import Background from "/background3.png";

const Cooking = () => {
  const location = useLocation();
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

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
    if (currentStepIndex < cookingSteps.length - 1) {
      const currentStep = cookingSteps[currentStepIndex];
      let expiryTime = getExpiryTimestamp(currentStep.time || 1);
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
          className="w-full min-h-screen flex flex-col items-center justify-center px-6 font-raleway pb-20 bg-darkGreen"
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Cooking Complete!</h1>
            <p className="text-2xl">Enjoy your meal!🥳</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar2 />
      <div
        className="w-full min-h-screen flex flex-col items-center px-6 font-raleway pb-10 bg-darkGreen"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="mt-20 flex flex-col items-center gap-8">
          <div className="text-white text-center">
            <h2 className="text-2xl font-semibold mb-2">
              Step {currentStepIndex + 1}
            </h2>
            <p className="text-xl">{currentStep?.name}</p>
            <p className="text-lg mt-2">
              Duration: {currentStep?.time} minutes
            </p>
          </div>

          <div className="w-64 h-64 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border-4 border-white">
            <div className="text-white text-5xl font-bold">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>
          </div>

          <div className="flex mt-6 gap-6 items-center">
            <button
              onClick={handleReset}
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <RotateCcw className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
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
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={toggleMute}
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-white" />
              ) : (
                <Volume2 className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cooking;
