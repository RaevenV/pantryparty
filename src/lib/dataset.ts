// import { recipes } from "../types";


// // {
// //   /* buat ngeseed db */
// // }
// // <button onClick={handleBatchAdd} className="bg-red-500 text-white p-2 rounded">
// //   Add Cooking Step
// // </button>;


// const handleBatchAdd = async () => {
//   const CookingSteps: recipes[] = [
//     {
//       id: "1",
//       name: "Singaporean Fried Rice",
//       picture: "",
//       difficulty: "Medium",
//       cookTime: "30 minutes",
//       ingredients: [
//         {
//           name: "Cooked rice",
//           unit: 200,
//           unitType: "g",
//         },
//         {
//           name: "Mixed vegetables",
//           unit: 100,
//           unitType: "g",
//         },
//         {
//           name: "Eggs",
//           unit: 2,
//           unitType: "pieces",
//         },
//         {
//           name: "Soy sauce",
//           unit: 10,
//           unitType: "ml",
//         },
//         {
//           name: "Oyster sauce",
//           unit: 15,
//           unitType: "ml",
//         },
//         {
//           name: "Shrimp",
//           unit: 100,
//           unitType: "g",
//         },
//         {
//           name: "Green onions",
//           unit: 20,
//           unitType: "g",
//         },
//         {
//           name: "Cooking oil",
//           unit: 15,
//           unitType: "ml",
//         },
//       ],
//       cookingSteps: [
//         {
//           name: "Heat oil in a large wok over medium-high heat",
//           order: 1,
//           time: 1,
//           isTimed: true,
//         },
//         {
//           name: "Scramble eggs and set aside",
//           order: 2,
//           time: 2,
//           isTimed: true,
//         },
//         {
//           name: "Stir-fry shrimp until pink",
//           order: 3,
//           time: 3,
//           isTimed: true,
//         },
//         {
//           name: "Add vegetables and stir-fry",
//           order: 4,
//           time: 2,
//           isTimed: true,
//         },
//         {
//           name: "Add rice and break up any clumps",
//           order: 5,
//           time: 2,
//           isTimed: true,
//         },
//         {
//           name: "Add soy sauce and oyster sauce",
//           order: 6,
//           time: 0,
//           isTimed: false,
//         },
//         {
//           name: "Mix in scrambled eggs and green onions",
//           order: 7,
//           time: 1,
//           isTimed: true,
//         },
//       ],
//     },
//     {
//       id: "2",
//       name: "Garlic Butter Shrimp",
//       picture: "",
//       difficulty: "Easy",
//       cookTime: "15 minutes",
//       ingredients: [
//         {
//           name: "Large shrimp",
//           unit: 500,
//           unitType: "g",
//         },
//         {
//           name: "Butter",
//           unit: 60,
//           unitType: "g",
//         },
//         {
//           name: "Garlic cloves",
//           unit: 6,
//           unitType: "pieces",
//         },
//         {
//           name: "Lemon juice",
//           unit: 30,
//           unitType: "ml",
//         },
//         {
//           name: "Parsley",
//           unit: 15,
//           unitType: "g",
//         },
//         {
//           name: "Salt",
//           unit: 5,
//           unitType: "g",
//         },
//         {
//           name: "Black pepper",
//           unit: 3,
//           unitType: "g",
//         },
//       ],
//       cookingSteps: [
//         {
//           name: "Season shrimp with salt and pepper",
//           order: 1,
//           time: 0,
//           isTimed: false,
//         },
//         {
//           name: "Melt butter in a large skillet over medium heat",
//           order: 2,
//           time: 2,
//           isTimed: true,
//         },
//         {
//           name: "Add minced garlic and sauté until fragrant",
//           order: 3,
//           time: 1,
//           isTimed: true,
//         },
//         {
//           name: "Add shrimp and cook until pink",
//           order: 4,
//           time: 4,
//           isTimed: true,
//         },
//         {
//           name: "Add lemon juice and stir",
//           order: 5,
//           time: 0,
//           isTimed: false,
//         },
//         {
//           name: "Garnish with chopped parsley",
//           order: 6,
//           time: 0,
//           isTimed: false,
//         },
//       ],
//     },
//     {
//       id: "3",
//       name: "Avocado Toast",
//       picture: "",
//       difficulty: "Easy",
//       cookTime: "10 minutes",
//       ingredients: [
//         {
//           name: "Bread slices",
//           unit: 2,
//           unitType: "pieces",
//         },
//         {
//           name: "Ripe avocado",
//           unit: 1,
//           unitType: "piece",
//         },
//         {
//           name: "Cherry tomatoes",
//           unit: 100,
//           unitType: "g",
//         },
//         {
//           name: "Red pepper flakes",
//           unit: 2,
//           unitType: "g",
//         },
//         {
//           name: "Salt",
//           unit: 3,
//           unitType: "g",
//         },
//         {
//           name: "Black pepper",
//           unit: 2,
//           unitType: "g",
//         },
//         {
//           name: "Lemon juice",
//           unit: 5,
//           unitType: "ml",
//         },
//       ],
//       cookingSteps: [
//         {
//           name: "Toast bread until golden brown",
//           order: 1,
//           time: 3,
//           isTimed: true,
//         },
//         {
//           name: "Mash avocado in a bowl",
//           order: 2,
//           time: 0,
//           isTimed: false,
//         },
//         {
//           name: "Add lemon juice, salt, and pepper to avocado",
//           order: 3,
//           time: 0,
//           isTimed: false,
//         },
//         {
//           name: "Slice cherry tomatoes",
//           order: 4,
//           time: 0,
//           isTimed: false,
//         },
//         {
//           name: "Spread avocado mixture on toast",
//           order: 5,
//           time: 0,
//           isTimed: false,
//         },
//         {
//           name: "Top with tomatoes and red pepper flakes",
//           order: 6,
//           time: 0,
//           isTimed: false,
//         },
//       ],
//     },
//     {
//       id: "4",
//       name: "Teriyaki Chicken",
//       picture: "",
//       difficulty: "Medium",
//       cookTime: "25 minutes",
//       ingredients: [
//         {
//           name: "Chicken thighs",
//           unit: 500,
//           unitType: "g",
//         },
//         {
//           name: "Soy sauce",
//           unit: 60,
//           unitType: "ml",
//         },
//         {
//           name: "Mirin",
//           unit: 60,
//           unitType: "ml",
//         },
//         {
//           name: "Sugar",
//           unit: 30,
//           unitType: "g",
//         },
//         {
//           name: "Garlic",
//           unit: 3,
//           unitType: "cloves",
//         },
//         {
//           name: "Ginger",
//           unit: 15,
//           unitType: "g",
//         },
//         {
//           name: "Cooking oil",
//           unit: 15,
//           unitType: "ml",
//         },
//         {
//           name: "Sesame seeds",
//           unit: 10,
//           unitType: "g",
//         },
//       ],
//       cookingSteps: [
//         {
//           name: "Mix soy sauce, mirin, and sugar for sauce",
//           order: 1,
//           time: 0,
//           isTimed: false,
//         },
//         {
//           name: "Heat oil in pan over medium-high heat",
//           order: 2,
//           time: 2,
//           isTimed: true,
//         },
//         {
//           name: "Cook chicken skin-side down",
//           order: 3,
//           time: 5,
//           isTimed: true,
//         },
//         {
//           name: "Flip and cook other side",
//           order: 4,
//           time: 4,
//           isTimed: true,
//         },
//         {
//           name: "Add minced garlic and ginger",
//           order: 5,
//           time: 1,
//           isTimed: true,
//         },
//         {
//           name: "Pour in sauce mixture",
//           order: 6,
//           time: 0,
//           isTimed: false,
//         },
//         {
//           name: "Simmer until sauce thickens",
//           order: 7,
//           time: 3,
//           isTimed: true,
//         },
//         {
//           name: "Garnish with sesame seeds",
//           order: 8,
//           time: 0,
//           isTimed: false,
//         },
//       ],
//     },
//   ];

// };
