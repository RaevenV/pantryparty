import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import FoodCard from "@/components/FoodCard.tsx";
import { useRecipeContext } from "@/context/RecipeContext.tsx";
import { RecipeWithId } from "@/lib/types/recipeTypes.ts";
import Footer from "@/components/Footer.tsx";
import Background from "/Background.png";

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryTerm, setCategoryTerm] = useState("");
  const navigate = useNavigate();
  const {
    loading,
    error,
    getAllRecipes,
    searchRecipes,
    filteredRecipes,
    getTrendingRecipe,
    searchRecipesByCategory
  } = useRecipeContext();

 

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchTerm) {
        searchRecipes(searchTerm, filteredRecipes);
      } else if (categoryTerm) {
        console.log(filteredRecipes);
        searchRecipesByCategory(categoryTerm, filteredRecipes);
      } else {
        getAllRecipes();
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, categoryTerm]);


  const handleCategoryClick = (category: string) => {
    setCategoryTerm(category);
    setSearchTerm(""); 
  };


  const trending: RecipeWithId | null = getTrendingRecipe;

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
    console.error("Error:", error); // Log the error to see what's causing it
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-lg text-red-500">Oops! Something went wrong.</p>
          <p className="text-sm text-gray-500">Please try again later.</p>
        </div>
      </div>
    );
  }

  const toggleBack = () => {
    setSearchTerm("");
    setCategoryTerm("");
    navigate("/");
  };


  const handleCardClick = (item: RecipeWithId) => {
    navigate(`/foodDetails`, { state: item });
  };

  return (
    <>
      <Navbar />

      <div
        className="bg-cream w-full pt-[80px] min-h-screen flex flex-col justify-start items-center px-6 font-raleway pb-20 transition-all duration-200"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "505px 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="w-full flex flex-row justify-between items-center h-16 ">
          <input
            name="search"
            type="text"
            placeholder="search for recipes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full  h-[60%] sm:h-[75%]  bg-white rounded-xl px-4 border-[3px] border-darkGreen placeholder-darkGreen focus:outline-none text-darkGreen font-bold text-[14px]"
          />
        </div>
        {searchTerm === "" && categoryTerm === "" ? (
          <>
            <div className="my-4 w-full h-auto flex flex-col justify-start items-start font-kanit">
              <div className="text-[20px] font-extrabold text-darkGreen ">
                Today's Featured{" "}
                <b className="text-mainGreen font-bold italic"> Recipe!</b>
              </div>
            </div>

            <section
              className="relative border-[3px] border-darkGreen h-52 w-full rounded-xl shadow-md overflow-hidden cursor-pointer hover:opacity-95 transition-opacity "
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

            {/* categories */}
            <section className="mt-4 w-full gap-1  sm:gap-2 flex flex-wrap justify-between items-center">
              <button
                onClick={() => handleCategoryClick("Asian")}
                className="hover:bg-slate-200 transition-all duration-150 font-kanit font-medium text-[14px] flex justify-center items-center w-[49%] h-14 bg-white shadow-lg rounded-lg border-[3px] border-darkGreen"
              >
                Asian Cuisine 🍱
              </button>
              <button
                onClick={() => handleCategoryClick("Chicken / Beef")}
                className="hover:bg-slate-200 transition-all duration-150 font-kanit font-medium text-[12px] sm:text-[14px] flex justify-center items-center w-[49%] h-14 bg-white shadow-lg rounded-lg border-[3px] border-darkGreen"
              >
                Chicken & Beef 🥩🍗
              </button>
              <button
                onClick={() => handleCategoryClick("Seafood")}
                className="hover:bg-slate-200 transition-all duration-150 font-kanit font-medium text-[14px] flex justify-center items-center w-[49%] h-14 bg-white shadow-lg rounded-lg border-[3px] border-darkGreen"
              >
                Seafood 🍤
              </button>
              <button
                onClick={() => handleCategoryClick("Vegetarian")}
                className="hover:bg-slate-200 transition-all duration-150 font-kanit font-medium text-[14px] flex justify-center items-center w-[49%] h-14 bg-white shadow-lg rounded-lg border-[3px] border-darkGreen"
              >
                Vegetarian 🥬
              </button>
            </section>
          </>
        ) : null}
        {/* Display the fetch count
        <div className="mt-4 text-sm text-gray-500">
          Data fetched {fetchCount} {fetchCount === 1 ? "time" : "times"}
        </div> */}
        {/* <button onClick={handleBatchAdd} className="bg-red-500 text-white p-2 rounded">
          Add Cooking Step
        </button> */}
        <div className="mt-4 w-full h-auto flex flex-wrap flex-col  sm:flex-row justify-between items-start gap-y-4 transition-all ease-in-out duration-150">
          {filteredRecipes.map((item) => (
            <FoodCard key={item.id} item={item} onClick={handleCardClick} />
          ))}
        </div>

        {searchTerm != "" || categoryTerm != "" ? (
          <>
            <div className="mt-8 flex justify-between items-center w-full  px-2">
              <button
                onClick={toggleBack}
                className="w-full h-14 rounded-2xl bg-darkGreen backdrop-blur-md flex items-center justify-center hover:bg-mainGreen transition-colors duration-500 text-white"
              >
                back
              </button>
            </div>
          </>
        ) : null}
      </div>

      <Footer />
    </>
  );
}
