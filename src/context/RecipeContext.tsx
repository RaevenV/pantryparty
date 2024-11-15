import { RecipeWithId } from "@/lib/types/recipeTypes";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { RecipeController } from "@/controllers/RecipeController";
import { useCallback } from "react";
import { useMemo } from "react";

interface RecipeContextType {
  loading: boolean;
  error: string | null;
  recipes: RecipeWithId[];
  getAllRecipes: () => Promise<void>;
  searchRecipes: (searchTerm: string, recipes: RecipeWithId[]) => Promise<void>;
  filteredRecipes: RecipeWithId[];
  getTrendingRecipe: RecipeWithId | null;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [recipes] = useState<RecipeWithId[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeWithId[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if ("recipes" in localStorage) {
        setFilteredRecipes(
          JSON.parse(localStorage.getItem("recipes")!) as RecipeWithId[]
        );
      } else {
        setFilteredRecipes(await RecipeController.getAllRecipes());
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchRecipes = useCallback(
    async (searchTerm: string, recipes: RecipeWithId[]) => {
      try {
        const results = await RecipeController.searchRecipes(
          searchTerm,
          recipes
        );
        setFilteredRecipes(results);
      } catch (err) {
        setError((err as Error).message);
      }
    },
    []
  );

  const getTrendingRecipe = useMemo(() => {
    if (filteredRecipes.length === 0) return null;
    return filteredRecipes.reduce(
      (trendingRecipe: RecipeWithId | null, recipe: RecipeWithId) => {
        if (
          !trendingRecipe ||
          recipe.data.totalCompleted > trendingRecipe.data.totalCompleted
        ) {
          return recipe;
        } else if (
          recipe.data.totalCompleted === trendingRecipe.data.totalCompleted
        ) {
          return recipe;
        }
        return trendingRecipe;
      },
      null
    );
  }, [filteredRecipes]);

  return (
    <RecipeContext.Provider
      value={{
        loading,
        error,
        recipes,
        filteredRecipes,
        getAllRecipes,
        searchRecipes,
        getTrendingRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = (): RecipeContextType => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipeContext must be used within a RecipeProvider");
  }
  return context;
};
