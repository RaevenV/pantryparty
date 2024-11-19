import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Recipe } from "@/lib/types/recipeTypes";
import { RecipeWithId } from "@/lib/types/recipeTypes";

//uda terlanjur pake controller + context, harusnya context aja tp males ganti

export class RecipeController {
  static async getAllRecipes(): Promise<RecipeWithId[]> {
    try {
      const recipesCollection = collection(db, "recipes");
      const recipeSnapshot = await getDocs(recipesCollection);

      const recipes: RecipeWithId[] = recipeSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data() as Recipe,
      }));

      localStorage.setItem("recipes", JSON.stringify(recipes));
      return recipes;
    } catch (error) {
      const cached = localStorage.getItem("recipes");
      if (cached) {
        return JSON.parse(cached) as RecipeWithId[];
      }
      throw error;
    }
  }

  static async getRecipeById(id: string): Promise<RecipeWithId | undefined> {
    const recipes = await this.getAllRecipes();
    return recipes.find((recipe) => recipe.id === id);
  }

  static async searchRecipes(
    searchTerm: string,
    recipes: RecipeWithId[]
  ): Promise<RecipeWithId[]> {
    if (!searchTerm.trim()) return recipes;
    const lowerSearchTerm = searchTerm.toLowerCase();

    return recipes.filter(
      (recipe) =>
        recipe.data.name.toLowerCase().includes(lowerSearchTerm) ||
        recipe.data.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(lowerSearchTerm)
        )
    );
  }

  static async searchRecipesByCategory(
    category: string,
    recipes: RecipeWithId[]
  ): Promise<RecipeWithId[]> {
    try {
      if (!category.trim()) return recipes;

      console.log("Filtering by category:", category);
      const lowerCategory = category.toLowerCase();

      const filteredRecipes = recipes.filter((recipe) => {
        if (!recipe?.data?.category || !Array.isArray(recipe.data.category)) {
          console.warn(
            `Recipe with id ${recipe?.id} has invalid category data`
          );
          return false;
        }

        return recipe.data.category.some(
          (cat) =>
            cat !== null &&
            typeof cat === "string" &&
            cat.toLowerCase().includes(lowerCategory)
        );
      });

      console.log("Filtered recipes count:", filteredRecipes.length);
      return filteredRecipes;
    } catch (err) {
      console.error("Detailed error in searchRecipesByCategory:", {
        message: err instanceof Error ? err.message : "Unknown error",
        stack: err instanceof Error ? err.stack : "No stack trace",
      });
      throw err;
    }
  }

  static cacheDuration = 60 * 60 * 1000;

  static clearCacheIfExpired(): void {
    const cache = localStorage.getItem("recipes");
    if (!cache) return;

    const { timestamp } = JSON.parse(cache);
    const isExpired = Date.now() - timestamp > this.cacheDuration;

    if (isExpired) {
      this.clearCache();
    }
  }

  static clearCache(): void {
    localStorage.removeItem("recipes");
  }
}
