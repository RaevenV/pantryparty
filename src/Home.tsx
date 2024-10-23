import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import FoodCard from "./components/FoodCard.tsx";
import { useRecipeContext } from "./context/RecipeContext.tsx";
import { RecipeWithId } from "./lib/types.ts";

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  // const [fetchCount, setFetchCount] = useState(0);
  const navigate = useNavigate();
  const { loading, error, getAllRecipes, searchRecipes, filteredRecipes } =
    useRecipeContext();

  useEffect(() => {
    getAllRecipes();
    // setFetchCount((prevCount) => prevCount + 1);
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      searchRecipes(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, searchRecipes]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
          <p className="text-lg text-gray-600">Fetching recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-lg text-red-500">Oops! Something went wrong.</p>
          <p className="text-sm text-gray-500">Please try again later.</p>
        </div>
      </div>
    );
  }

  const handleCardClick = (item: RecipeWithId) => {
    navigate(`/foodDetails`, { state: item });
  };

  return (
    <>
      <Navbar />
      <div className="bg-cream w-full pt-[80px] min-h-screen flex flex-col justify-start items-center px-6 font-raleway pb-20">
        <div className="w-full flex flex-row justify-between items-center h-16 ">
          <input
            name="search"
            type="text"
            placeholder="search for recipes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[85%] h-[70%] bg-white rounded-xl px-4 focus:border-0 shadow-md placeholder-darkGreen focus:outline-none text-darkGreen font-bold text-[14px]"
          />
          <img src="./profile.png" className="w-12 h-12 " alt="" />
        </div>
        <div className="mt-4 w-full h-20 flex flex-col justify-start items-start font-kanit">
          <div className="text-[24px] font-extrabold text-darkGreen ">
            SEARCH YOUR NEXT
          </div>
          <div className="text-[24px] font-extrabold text-darkGreen ">
            MEAL <b className="text-mainGreen italic">WITH US!</b>
          </div>
        </div>

        <div className="mt-6 w-full h-auto flex flex-wrap flex-row justify-between items-start gap-y-4 transition-all ease-in-out duration-150">
          {filteredRecipes.map((item) => (
            <FoodCard key={item.id} item={item} onClick={handleCardClick} />
          ))}
        </div>

        {/* Display the fetch count
        <div className="mt-4 text-sm text-gray-500">
          Data fetched {fetchCount} {fetchCount === 1 ? "time" : "times"}
        </div> */}
      </div>
    </>
  );
}
