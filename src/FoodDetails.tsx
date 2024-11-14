import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useState, useMemo } from "react";
import { ingredients, RecipeWithId } from "./lib/types";
import Footer from "./components/Footer";

export function FoodDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const toggleBack = () => {
    navigate(-1);
  };

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
    navigate("/cooking", {
      state: {
        ...foodItem,
      },
    });
  };

  const ServingControl = () => (
    <div className="flex flex-col w-full items-center h-16 rounded-xl overflow-hidden shadow-lg ">
      <div
        id="portion"
        className="w-full h-full flex flex-row justify-between items-center text-darkGreen shadow-md rounded-lg overflow-hidden"
      >
        <button
          onClick={handleMinus}
          className="w-[20%] bg-mainGreen text-[25px] text-white h-full flex justify-center items-center "
        >
          -
        </button>
        <input
          onChange={handleInputChange}
          value={`${serving} portion${serving > 1 ? "s" : ""}`}
          type="text"
          className="px-2 py-1 w-[60%] h-full text-center"
        />
        <button
          onClick={handlePlus}
          className="w-[20%] bg-mainGreen text-[25px] text-white h-full flex justify-center items-center "
        >
          +
        </button>
      </div>
    </div>
  );

  const FoodDetailsCard = () => (
    <div
      className="menu-box w-full rounded-xl shadow-xl h-[250px] flex flex-col justify-end items-center overflow-hidden"
      style={{
        backgroundImage: `url(${foodItem.data.picture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative w-full h-[40%] py-4 px-6 text-white bg-mainGreen rounded-xl  gap-y-2 flex flex-col justify-start items-start font-kanit">
        <div className="font-medium text-[15px] sm:text-[17px]">
          {foodItem.data.name}
        </div>
        <div className="flex flex-row w-full text-[12px] sm:text-[14px]">
          <b className="font-medium tracking-wide ">Difficulty:</b>
          <div className="ml-2 font-medium">{foodItem.data.difficulty}</div>
        </div>
        <div className="  absolute top-4 right-6 flex flex-row justify-start items-center text-[10px] sm:text-[14px] font-medium">
          {foodItem.data.cookTime}
        </div>

        
      </div>
    </div>
  );

  const IngredientsList = () => (
    <div className="gap-y-4 p-6 w-full h-auto flex flex-col justify-center items-center bg-mainGreen rounded-xl shadow-lg ">
      <h3 className="w-full text-left text-white text-[25px] font-medium tracking-wider">
        Ingredients
      </h3>

      <ul className="flex flex-col justify-start items-center w-full gap-y-2 rounded-xl bg-white px-4 py-4 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-25">
        {adjustedIngredients.map((item, index) => (
          <li
            key={index}
            className="w-full text-left flex items-center text-[12px] sm:text-[15px] text-white font-normal"
          >
            <span className="mr-2 text-lg">•</span>
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
        className="px-[5%] mx-auto pt-[100px] pb-16 font-kanit w-full min-h-screen flex flex-col justify-start items-center gap-y-4"
        style={{
          backgroundImage: `url("/Background.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <FoodDetailsCard />
        <ServingControl />
        <IngredientsList />

        <div className="gap-y-4 p-6 w-full h-auto flex flex-col justify-center items-center bg-mainGreen rounded-xl shadow-lg">
          <div className="w-full text-left text-white text-[25px] font-medium tracking-wider">
            Cooking Steps
          </div>
          <div className="flex flex-col justify-start items-center w-full gap-y-2 rounded-xl bg-white px-4 py-4 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-25">
            {foodItem.data.cookingSteps.map((item, index) => (
              <div
                key={index}
                className="w-full text-[12px] sm:text-[15px] flex justify-left items-center rounded-md text-white font-normal"
              >
                <span className="mr-2 text-lg">•</span>
                {item.name}
              </div>
            ))}
          </div>

          <button
            onClick={navigateStartCooking}
            className="w-full h-12 bg-white mt-2 font-kanit font-medium rounded-md text-white hover:scale-[1.01] hover:bg-opacity-30  transition-all duration-150 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-25"
          >
            Start Cooking
          </button>
        </div>
        <div className=" mt-2 flex justify-between items-center w-full">
          <button
            onClick={toggleBack}
            className="w-full h-14 rounded-2xl bg-mainGreen backdrop-blur-md flex items-center justify-center hover:scale-[1.015] transition-all duration-100 ease-in text-white"
          >
            back
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
