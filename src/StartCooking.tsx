import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ingredients, RecipeWithId } from "./lib/types";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function StartCooking() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const foodItem = useMemo(
    () => location.state as RecipeWithId,
    [location.state]
  );

  const serving = useMemo(() => location.state.serving, [location.state]);

  const adjustedIngredients = useMemo(
    () => location.state.adjustedIngredients as ingredients[],
    [location.state]
  );

  const displayedIngredients = useMemo(() => {
    return isOpen ? adjustedIngredients : adjustedIngredients.slice(0, 4);
  }, [adjustedIngredients, isOpen]);

  const navigateStartCooking = () => {
    navigate("/cooking", {
      state: {
        ...foodItem,
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="w-full pt-[80px] min-h-screen flex flex-col bg-cream justify-start items-center px-6 font-raleway pb-20 bg-fixed">
        <div className="mb-4 menu-box w-full rounded-xl shadow-xl h-[200px] bg-mainGreen flex flex-row justify-between items-center px-4 py-4">
          <img
            src={foodItem.data.picture}
            alt=""
            className="w-[45%] h-full rounded-2xl object-cover"
          />
          <div className="w-[52%] h-full px-2 text-cream">
            <div className="font-extrabold text-[20px]">
              {foodItem.data.name}
            </div>
            <div className="flex flex-row w-full mt-2">
              <b className="font-extrabold tracking-wide">Difficulty:</b>
              <div className="ml-2 font-medium">{foodItem.data.difficulty}</div>
            </div>
            <div className="flex flex-row w-full mt-2 justify-start items-center">
              <img src="./time-left.png" className="h-4 w-4" alt="" />
              <div className="ml-2 font-medium">{foodItem.data.cookTime}</div>
            </div>
            <div className="flex flex-row w-full mt-2">
              <b className="font-extrabold tracking-wide">Servings:</b>
              <div className="ml-2 font-medium">{serving}</div>
            </div>
          </div>
        </div>
        <div className="gap-y-4 p-6 w-full h-auto flex flex-col justify-center items-center bg-mainGreen rounded-xl shadow-lg">
          <div className="w-full text-left text-white text-[25px] font-extrabold">
            Cooking Steps
          </div>
          <div className="flex flex-col justify-start items-center w-full gap-y-2 rounded-xl bg-cream px-4 py-4">
            {foodItem.data.cookingSteps.map((item, index) => (
              <div
                key={index}
                className="w-full text-[15px] flex justify-left items-center rounded-md text-mainGreen font-bold"
              >
                <span className="mr-2 text-lg">•</span>
                {item.name}
              </div>
            ))}
          </div>

          <button
            onClick={navigateStartCooking}
            className="w-full h-12 bg-cream mt-2 font-rowdies rounded-md text-mainGreen hover:scale-[1.01] transition-all duration-[200] ease-in-out"
          >
            Start Cooking
          </button>
        </div>

        <div className="gap-y-4 flex flex-col justify-center items-start text-cream font-bold rounded-lg w-full p-6 mb-6 mt-4 bg-mainGreen">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center text-white text-[25px] font-extrabold hover:opacity-80 transition-opacity"
          >
            <span>
              Ingredients{" "}
              {!isOpen &&
                adjustedIngredients.length > 4 &&
                `(${adjustedIngredients.length})`}
            </span>
            {isOpen ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <ChevronDown className="w-6 h-6" />
            )}
          </button>

          <div
            className="w-full overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: isOpen ? "none" : "320px",
              opacity: 1,
            }}
          >
            {displayedIngredients.map((item: any, index: any) => (
              <div
                key={index}
                className="text-left px-4 w-full text-[16px] h-14 flex justify-start items-center rounded-md bg-cream text-mainGreen font-bold mt-4"
              >
                {item.name} - {item.unit || ""} {item.unitType || ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default StartCooking;
