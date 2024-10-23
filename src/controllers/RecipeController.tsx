import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Recipe } from "@/lib/types";
import { RecipeWithId } from "@/lib/types";

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

  static async searchRecipes(searchTerm: string): Promise<RecipeWithId[]> {
    const recipes = await this.getAllRecipes(); // This returns RecipeWithId[]

    // Check if the search term is empty
    if (!searchTerm.trim()) return recipes; // Return the full list if no search term

    const lowerSearchTerm = searchTerm.toLowerCase();

    // Filter recipes based on name or ingredient name
    return recipes.filter(
      (recipe) =>
        recipe.data.name.toLowerCase().includes(lowerSearchTerm) ||
        recipe.data.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(lowerSearchTerm)
        )
    );
  }

  static clearCache(): void {
    localStorage.removeItem("recipes");
  }
}
