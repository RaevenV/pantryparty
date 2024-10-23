import { RecipeWithId } from "@/lib/types";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { RecipeController } from "@/controllers/RecipeController";
import { useCallback } from "react";

interface RecipeContextType {
  loading: boolean;
  error: string | null;
  recipes: RecipeWithId[];
  getAllRecipes: () => Promise<void>;
  searchRecipes: (searchTerm: string) => Promise<void>;
  filteredRecipes: RecipeWithId[];
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<RecipeWithId[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeWithId[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedRecipes = await RecipeController.getAllRecipes();
      setRecipes(fetchedRecipes);
      setFilteredRecipes(fetchedRecipes); // Initialize filtered recipes with all recipes
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchRecipes = useCallback(async (searchTerm: string) => {
    try {
      const results = await RecipeController.searchRecipes(searchTerm);
      setFilteredRecipes(results);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        loading,
        error,
        recipes,
        filteredRecipes,
        getAllRecipes,
        searchRecipes,
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
