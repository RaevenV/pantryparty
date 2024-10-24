import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useState, useMemo } from "react";
import { ingredients, RecipeWithId } from "./lib/types";

export function FoodDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const foodItem = useMemo(
    () => location.state as RecipeWithId,
    [location.state]
  );

  const [ingredients] = useState<ingredients[]>(
    foodItem?.data?.ingredients || []
  );
  const [serving, setServing] = useState(1);
  const initialServing = 1;

  const adjustedIngredients = useMemo(() => {
    const multiplier = serving / initialServing;
    return ingredients.map((item) => ({
      ...item,
      unit: item.unit ? Number((item.unit * multiplier).toFixed(1)) : null,
    })) as ingredients[];
  }, [serving, ingredients, initialServing]);

  // Serving size handlers
  const handleMinus = () => {
    if (serving > 1) {
      setServing(serving - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1) {
      setServing(value);
    }
  };

  const handlePlus = () => {
    setServing(serving + 1);
  };

  const navigateStartCooking = () => {
    navigate("/startCooking", {
      state: {
        ...foodItem,
        adjustedIngredients,
        serving,
      },
    });
  };

  const ServingControl = () => (
    <div className="flex flex-row w-full mt-2 items-center ">
      <label htmlFor="portion" className="mr-2 text-[14px]">
        Servings:
      </label>
      <div
        id="portion"
        className="w-[50%] h-8 flex flex-row justify-between items-center text-darkGreen shadow-md"
      >
        <button
          onClick={handleMinus}
          className="w-[20%] bg-slate-100 h-full flex justify-center items-center rounded-l-md"
        >
          -
        </button>
        <input
          onChange={handleInputChange}
          value={serving}
          type="text"
          className="px-2 py-1 w-[60%] text-center"
        />
        <button
          onClick={handlePlus}
          className="w-[20%] bg-slate-100 h-full flex justify-center items-center rounded-r-md"
        >
          +
        </button>
      </div>
    </div>
  );

  const FoodDetailsCard = () => (
    <div className="menu-box w-full rounded-xl shadow-xl h-[160px] bg-mainGreen flex flex-row justify-between items-center px-4 py-4">
      <img
        src={foodItem.data.picture}
        alt={foodItem.data.name}
        className="w-[35%] h-full rounded-2xl object-cover"
      />
      <div className="w-[60%] h-full px-2 text-white">
        <div className="font-extrabold text-[16px] mb-4">
          {foodItem.data.name}
        </div>
        <div className="flex flex-row w-full mt-2 text-[12px]">
          <b className="font-extrabold tracking-wide ">Difficulty:</b>
          <div className="ml-2 font-medium">{foodItem.data.difficulty}</div>
        </div>
        <div className="flex flex-row w-full mt-2 justify-start items-center text-[12px]">
          <b className="font-extrabold tracking-wide">Duration:</b>
          <div className="ml-2 font-medium">{foodItem.data.cookTime}</div>
        </div>
        <ServingControl />
      </div>
    </div>
  );

  const IngredientsList = () => (
    <div className="text-cream font-bold rounded-lg w-full p-4 mb-6 mt-4 bg-mainGreen py-6">
      <h3 className="text-2xl font-bold mb-4">Ingredients</h3>
      <ul className="space-y-2">
        {adjustedIngredients.map((item, index) => (
          <li key={index} className="flex items-center text-lg">
            <span className="mr-2">•</span>
            {item.name} - {item.unit || ""} {item.unitType || ""}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <Navbar />
      <div
        className="px-[5%] mx-auto pt-[100px] pb-20 font-raleway w-full min-h-screen flex flex-col justify-start items-center"
        style={{
          backgroundImage: `url("/Background2.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <FoodDetailsCard />
        <IngredientsList />

        <div className="flex justify-center items-center w-full h-24">
          <button
            onClick={navigateStartCooking}
            className="shadow-xl px-1 py-1 hover:scale-[1.02] h-[60%] w-[60%] bg-mainGreen transition-all ease-in duration-[200] cursor-pointer rounded-xl"
          >
            <div className=" backdrop-blur text-cream font-bold text-xl flex justify-center items-center w-full h-full border rounded-lg ">
              Start Cooking
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
