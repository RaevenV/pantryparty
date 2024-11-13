// // import { recipes } from "../types";


// // // {
// // //   /* buat ngeseed db */
// // // }
// // // <button onClick={handleBatchAdd} className="bg-red-500 text-white p-2 rounded">
// // //   Add Cooking Step
// // // </button>;


// // const handleBatchAdd = async () => {
// //   const CookingSteps: recipes[] = [
// //     {
// //       id: "1",
// //       name: "Singaporean Fried Rice",
// //       picture: "",
// //       difficulty: "Medium",
// //       cookTime: "30 minutes",
// //       ingredients: [
// //         {
// //           name: "Cooked rice",
// //           unit: 200,
// //           unitType: "g",
// //         },
// //         {
// //           name: "Mixed vegetables",
// //           unit: 100,
// //           unitType: "g",
// //         },
// //         {
// //           name: "Eggs",
// //           unit: 2,
// //           unitType: "pieces",
// //         },
// //         {
// //           name: "Soy sauce",
// //           unit: 10,
// //           unitType: "ml",
// //         },
// //         {
// //           name: "Oyster sauce",
// //           unit: 15,
// //           unitType: "ml",
// //         },
// //         {
// //           name: "Shrimp",
// //           unit: 100,
// //           unitType: "g",
// //         },
// //         {
// //           name: "Green onions",
// //           unit: 20,
// //           unitType: "g",
// //         },
// //         {
// //           name: "Cooking oil",
// //           unit: 15,
// //           unitType: "ml",
// //         },
// //       ],
// //       cookingSteps: [
// //         {
// //           name: "Heat oil in a large wok over medium-high heat",
// //           order: 1,
// //           time: 1,
// //           isTimed: true,
// //         },
// //         {
// //           name: "Scramble eggs and set aside",
// //           order: 2,
// //           time: 2,
// //           isTimed: true,
// //         },
// //         {
// //           name: "Stir-fry shrimp until pink",
// //           order: 3,
// //           time: 3,
// //           isTimed: true,
// //         },
// //         {
// //           name: "Add vegetables and stir-fry",
// //           order: 4,
// //           time: 2,
// //           isTimed: true,
// //         },
// //         {
// //           name: "Add rice and break up any clumps",
// //           order: 5,
// //           time: 2,
// //           isTimed: true,
// //         },
// //         {
// //           name: "Add soy sauce and oyster sauce",
// //           order: 6,
// //           time: 0,
// //           isTimed: false,
// //         },
// //         {
// //           name: "Mix in scrambled eggs and green onions",
// //           order: 7,
// //           time: 1,
// //           isTimed: true,
// //         },
// //       ],
// //     },
// //     {
// //       id: "2",
// //       name: "Garlic Butter Shrimp",
// //       picture: "",
// //       difficulty: "Easy",
// //       cookTime: "15 minutes",
// //       ingredients: [
// //         {
// //           name: "Large shrimp",
// //           unit: 500,
// //           unitType: "g",
// //         },
// //         {
// //           name: "Butter",
// //           unit: 60,
// //           unitType: "g",
// //         },
// //         {
// //           name: "Garlic cloves",
// //           unit: 6,
// //           unitType: "pieces",
// //         },
// //         {
// //           name: "Lemon juice",
// //           unit: 30,
// //           unitType: "ml",
// //         },
// //         {
// //           name: "Parsley",
// //           unit: 15,
// //           unitType: "g",
// //         },
// //         {
// //           name: "Salt",
// //           unit: 5,
// //           unitType: "g",
// //         },
// //         {
// //           name: "Black pepper",
// //           unit: 3,
// //           unitType: "g",
// //         },
// //       ],
// //       cookingSteps: [
// //         {
// //           name: "Season shrimp with salt and pepper",
// //           order: 1,
// //           time: 0,
// //           isTimed: false,
// //         },
// //         {
// //           name: "Melt butter in a large skillet over medium heat",
// //           order: 2,
// //           time: 2,
// //           isTimed: true,
// //         },
// //         {
// //           name: "Add minced garlic and sauté until fragrant",
// //           order: 3,
// //           time: 1,
// //           isTimed: true,
// //         },
// //         {
// //           name: "Add shrimp and cook until pink",
// //           order: 4,
// //           time: 4,
// //           isTimed: true,
// //         },
// //         {
// //           name: "Add lemon juice and stir",
// //           order: 5,
// //           time: 0,
// //           isTimed: false,
// //         },
// //         {
// //           name: "Garnish with chopped parsley",
// //           order: 6,
// //           time: 0,
// //           isTimed: false,
// //         },
// //       ],
// //     },
// //     {
// //       id: "3",
// //       name: "Avocado Toast",
// //       picture: "",
// //       difficulty: "Easy",
// //       cookTime: "10 minutes",
// //       ingredients: [
// //         {
// //           name: "Bread slices",
// //           unit: 2,
// //           unitType: "pieces",
// //         },
// //         {
// //           name: "Ripe avocado",
// //           unit: 1,
// //           unitType: "piece",
// //         },
// //         {
// //           name: "Cherry tomatoes",
// //           unit: 100,
// //           unitType: "g",
// //         },
// //         {
// //           name: "Red pepper flakes",
// //           unit: 2,
// //           unitType: "g",
// //         },
// //         {
// //           name: "Salt",
// //           unit: 3,
// //           unitType: "g",
// //         },
// //         {
// //           name: "Black pepper",
// //           unit: 2,
// //           unitType: "g",
// //         },
// //         {
// //           name: "Lemon juice",
// //           unit: 5,
// //           unitType: "ml",
// //         },
// //       ],
// //       cookingSteps: [
// //         {
// //           name: "Toast bread until golden brown",
// //           order: 1,
// //           time: 3,
// //           isTimed: true,
// //         },
// //         {
// //           name: "Mash avocado in a bowl",
// //           order: 2,
// //           time: 0,
// //           isTimed: false,
// //         },
// //         {
// //           name: "Add lemon juice, salt, and pepper to avocado",
// //           order: 3,
// //           time: 0,
// //           isTimed: false,
// //         },
// //         {
// //           name: "Slice cherry tomatoes",
// //           order: 4,
// //           time: 0,
// //           isTimed: false,
// //         },
// //         {
// //           name: "Spread avocado mixture on toast",
// //           order: 5,
// //           time: 0,
// //           isTimed: false,
// //         },
// //         {
// //           name: "Top with tomatoes and red pepper flakes",
// //           order: 6,
// //           time: 0,
// //           isTimed: false,
// //         },
// //       ],
// //     },
// //     {
// //       id: "4",
// //       name: "Teriyaki Chicken",
// //       picture: "",
// //       difficulty: "Medium",
// //       cookTime: "25 minutes",
// //       ingredients: [
// //         {
// //           name: "Chicken thighs",
// //           unit: 500,
// //           unitType: "g",
// //         },
// //         {
// //           name: "Soy sauce",
// //           unit: 60,
// //           unitType: "ml",
// //         },
// //         {
// //           name: "Mirin",
// //           unit: 60,
// //           unitType: "ml",
// //         },
// //         {
// //           name: "Sugar",
// //           unit: 30,
// //           unitType: "g",
// //         },
// //         {
// //           name: "Garlic",
// //           unit: 3,
// //           unitType: "cloves",
// //         },
// //         {
// //           name: "Ginger",
// //           unit: 15,
// //           unitType: "g",
// //         },
// //         {
// //           name: "Cooking oil",
// //           unit: 15,
// //           unitType: "ml",
// //         },
// //         {
// //           name: "Sesame seeds",
// //           unit: 10,
// //           unitType: "g",
// //         },
// //       ],
// //       cookingSteps: [
// //         {
// //           name: "Mix soy sauce, mirin, and sugar for sauce",
// //           order: 1,
// //           time: 0,
// //           isTimed: false,
// //         },
// //         {
// //           name: "Heat oil in pan over medium-high heat",
// //           order: 2,
// //           time: 2,
// //           isTimed: true,
// //         },
// //         {
// //           name: "Cook chicken skin-side down",
// //           order: 3,
// //           time: 5,
// //           isTimed: true,
// //         },
// //         {
// //           name: "Flip and cook other side",
// //           order: 4,
// //           time: 4,
// //           isTimed: true,
// //         },
// //         {
// //           name: "Add minced garlic and ginger",
// //           order: 5,
// //           time: 1,
// //           isTimed: true,
// //         },
// //         {
// //           name: "Pour in sauce mixture",
// //           order: 6,
// //           time: 0,
// //           isTimed: false,
// //         },
// //         {
// //           name: "Simmer until sauce thickens",
// //           order: 7,
// //           time: 3,
// //           isTimed: true,
// //         },
// //         {
// //           name: "Garnish with sesame seeds",
// //           order: 8,
// //           time: 0,
// //           isTimed: false,
// //         },
// //       ],
// //     },
// //   ];

// // };


// import { recipes } from "./lib/types.ts";

// import { BatchAddCookingSteps } from "./lib/firebaseUtils.ts";

// const handleBatchAdd = async () => {
//   const CookingSteps: recipes[] = [
//     {
//       id: "1",
//       name: "Instant Noodle Upgrade",
//       difficulty: "Easy",
//       cookTime: "15 minutes",
//       ingredients: [
//         { name: "Instant noodles", unit: 1, unitType: "package" },
//         { name: "Frozen mixed vegetables", unit: 150, unitType: "g" },
//         { name: "Egg", unit: 1, unitType: "piece" },
//         { name: "Soy sauce", unit: 15, unitType: "ml" },
//         { name: "Sesame oil", unit: 5, unitType: "ml" },
//       ],
//       cookingSteps: [
//         {
//           name: "Cook instant noodles according to package instructions",
//           order: 1,
//           time: 5,
//           isTimed: true,
//         },
//         {
//           name: "Add frozen vegetables during the last 2 minutes of cooking",
//           order: 2,
//           time: 2,
//           isTimed: true,
//         },
//         {
//           name: "Drain noodles and vegetables, then return to the pot",
//           order: 3,
//           time: 1,
//           isTimed: true,
//         },
//         {
//           name: "Crack egg into the pot and stir to scramble",
//           order: 4,
//           time: 2,
//           isTimed: true,
//         },
//         {
//           name: "Drizzle with soy sauce and sesame oil, then mix well",
//           order: 5,
//           time: 1,
//           isTimed: true,
//         },
//       ],
//       picture: "",
//     },
//     {
//       id: "2",
//       name: "Mapo Tofu",
//       difficulty: "Medium",
//       cookTime: "25 minutes",
//       ingredients: [
//         { name: "Firm tofu", unit: 300, unitType: "g" },
//         { name: "Ground beef or pork", unit: 200, unitType: "g" },
//         { name: "Sichuan peppercorns", unit: 5, unitType: "g" },
//         { name: "Chili bean sauce", unit: 30, unitType: "ml" },
//         { name: "Soy sauce", unit: 30, unitType: "ml" },
//         { name: "Rice vinegar", unit: 15, unitType: "ml" },
//         { name: "Cornstarch", unit: 10, unitType: "g" },
//         { name: "Vegetable oil", unit: 30, unitType: "ml" },
//         { name: "Green onions", unit: 30, unitType: "g" },
//         { name: "Cooked rice", unit: 200, unitType: "g" },
//       ],
//       cookingSteps: [
//         {
//           name: "Cut the tofu into 1-inch cubes",
//           order: 1,
//           time: 3,
//           isTimed: true,
//         },
//         {
//           name: "Heat the vegetable oil in a skillet over medium-high heat",
//           order: 2,
//           time: 2,
//           isTimed: true,
//         },
//         {
//           name: "Add the ground meat and cook until browned",
//           order: 3,
//           time: 5,
//           isTimed: true,
//         },
//         {
//           name: "Add Sichuan peppercorns and chili bean sauce",
//           order: 4,
//           time: 2,
//           isTimed: true,
//         },
//         {
//           name: "Add tofu cubes and simmer for 5 minutes",
//           order: 5,
//           time: 5,
//           isTimed: true,
//         },
//         {
//           name: "Mix soy sauce, rice vinegar, cornstarch, then add",
//           order: 6,
//           time: 3,
//           isTimed: true,
//         },
//         {
//           name: "Stir until the sauce thickens",
//           order: 7,
//           time: 2,
//           isTimed: true,
//         },
//         {
//           name: "Serve over steamed rice, garnish with green onions",
//           order: 8,
//           time: 3,
//           isTimed: true,
//         },
//       ],
//       picture: "",
//     },
//     {
//       id: "3",
//       name: "Spicy Chicken Stir-Fry",
//       difficulty: "Easy",
//       cookTime: "20 minutes",
//       ingredients: [
//         { name: "Boneless chicken thighs", unit: 400, unitType: "g" },
//         { name: "Red and yellow bell peppers", unit: 200, unitType: "g" },
//         { name: "Green beans", unit: 100, unitType: "g" },
//         { name: "Soy sauce", unit: 30, unitType: "ml" },
//         { name: "Chili paste", unit: 10, unitType: "g" },
//         { name: "Garlic", unit: 3, unitType: "cloves" },
//         { name: "Vegetable oil", unit: 30, unitType: "ml" },
//         { name: "Cooked rice", unit: 200, unitType: "g" },
//         { name: "Salt and pepper", unit: 1, unitType: "pinch" },
//       ],
//       cookingSteps: [
//         {
//           name: "Cut the chicken into bite-sized pieces",
//           order: 1,
//           time: 3,
//           isTimed: true,
//         },
//         {
//           name: "Heat vegetable oil in a large skillet",
//           order: 2,
//           time: 2,
//           isTimed: true,
//         },
//         {
//           name: "Add chicken and cook until browned",
//           order: 3,
//           time: 5,
//           isTimed: true,
//         },
//         {
//           name: "Add bell peppers and green beans, stir-fry for 3-4 minutes",
//           order: 4,
//           time: 4,
//           isTimed: true,
//         },
//         {
//           name: "Add soy sauce, chili paste, and minced garlic",
//           order: 5,
//           time: 3,
//           isTimed: true,
//         },
//         { name: "Serve stir-fry over rice", order: 6, time: 2, isTimed: true },
//         {
//           name: "Season with salt and pepper",
//           order: 7,
//           time: 1,
//           isTimed: true,
//         },
//       ],
//       picture: "",
//     },
//     {
//       id: "4",
//       name: "Beef and Broccoli",
//       difficulty: "Medium",
//       cookTime: "25 minutes",
//       ingredients: [
//         { name: "Flank steak", unit: 400, unitType: "g" },
//         { name: "Broccoli florets", unit: 300, unitType: "g" },
//         { name: "Soy sauce", unit: 45, unitType: "ml" },
//         { name: "Brown sugar", unit: 15, unitType: "g" },
//         { name: "Garlic", unit: 3, unitType: "cloves" },
//         { name: "Ginger", unit: 10, unitType: "g" },
//         { name: "Vegetable oil", unit: 30, unitType: "ml" },
//         { name: "Cornstarch", unit: 10, unitType: "g" },
//         { name: "Cooked rice", unit: 200, unitType: "g" },
//       ],
//       cookingSteps: [
//         {
//           name: "Mix soy sauce, brown sugar, garlic, and ginger",
//           order: 1,
//           time: 3,
//           isTimed: true,
//         },
//         {
//           name: "Marinate beef for 10 minutes",
//           order: 2,
//           time: 10,
//           isTimed: true,
//         },
//         { name: "Heat oil in a skillet", order: 3, time: 2, isTimed: true },
//         {
//           name: "Stir-fry beef until browned",
//           order: 4,
//           time: 4,
//           isTimed: true,
//         },
//         {
//           name: "Add broccoli, stir-fry 4-5 minutes",
//           order: 5,
//           time: 5,
//           isTimed: true,
//         },
//         {
//           name: "Add cornstarch slurry, stir until thickened",
//           order: 6,
//           time: 2,
//           isTimed: true,
//         },
//         { name: "Serve over rice", order: 7, time: 2, isTimed: true },
//       ],
//       picture: "",
//     },
//   ];

//   BatchAddCookingSteps(CookingSteps);
// };