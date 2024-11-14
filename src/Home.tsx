import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import FoodCard from "./components/FoodCard.tsx";
import { useRecipeContext } from "./context/RecipeContext.tsx";
import { RecipeWithId } from "./lib/types.ts";
import Footer from "./components/Footer.tsx";
import Background from "/Background.png";

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { loading, error, getAllRecipes, searchRecipes, filteredRecipes, getTrendingRecipe} =
    useRecipeContext();

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if(searchTerm!=""){
        searchRecipes(searchTerm, filteredRecipes);
      }else{
        getAllRecipes();
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, searchRecipes]);

  const trending:RecipeWithId|null =   getTrendingRecipe;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center flex justify-center items-center flex-col">
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

      <div
        className="bg-cream w-full pt-[80px] min-h-screen flex flex-col justify-start items-center px-6 font-raleway pb-20"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full flex flex-row justify-between items-center h-16 ">
          <input
            name="search"
            type="text"
            placeholder="search for recipes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[75%] sm:w-[85%] h-[60%] sm:h-[70%] bg-white rounded-xl px-4 focus:border-0 shadow-md placeholder-darkGreen focus:outline-none text-darkGreen font-bold text-[14px]"
          />
          <img src="./profile.png" className="w-10 h-10 " alt="" />
        </div>

        {searchTerm === "" ? (
          <>
            <div className="my-4 w-full h-auto flex flex-col justify-start items-start font-kanit">
              <div className="text-[20px] font-extrabold text-darkGreen ">
                Today's Featured{" "}
                <b className="text-mainGreen font-bold italic"> Recipe!</b>
              </div>
            </div>

            <section
              className="relative h-52 w-full rounded-xl shadow-md overflow-hidden cursor-pointer hover:opacity-95 transition-opacity mb-4"
              onClick={() => {
                if (trending) {
                  handleCardClick(trending);
                }
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${trending?.data.picture})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="relative flex justify-center flex-col items-center h-full w-full bg-slate-700 bg-opacity-40 backdrop-filter backdrop-blur-sm">
                <h2 className="mb-2 italic font-extrabold text-white font-raleway text-[25px]">
                  {trending?.data.name}
                </h2>
                <h3 className="absolute bottom-4 right-4 font-medium  text-mainGreen bg-white rounded-md p-1 px-2 font-kanit tracking-wide text-[16px]">
                  total cooks : {trending?.data.totalCompleted}
                </h3>
              </div>
            </section>
            <hr className="w-full h-[0.8px] border-0 bg-mainGreen mb-2" />
          </>
        ) : null}

        {/* Display the fetch count
        <div className="mt-4 text-sm text-gray-500">
          Data fetched {fetchCount} {fetchCount === 1 ? "time" : "times"}
        </div> */}
        {/* <button onClick={handleBatchAdd} className="bg-red-500 text-white p-2 rounded">
          Add Cooking Step
        </button> */}

        <div className="mt-2 w-full h-auto flex flex-wrap flex-col  sm:flex-row justify-between items-start gap-y-4 transition-all ease-in-out duration-150">
          {filteredRecipes.map((item) => (
            <FoodCard key={item.id} item={item} onClick={handleCardClick} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
