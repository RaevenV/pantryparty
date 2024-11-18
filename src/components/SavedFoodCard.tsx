import { RecipeWithId } from "@/lib/types/recipeTypes";
interface SavedFoodCardProps {
  item: RecipeWithId;
  onClick: (item: RecipeWithId) => void;
}

const SavedFoodCard = ({ item, onClick }: SavedFoodCardProps) => {
  return (
    <div
      className="relative overflow-hidden border-[3px] border-darkGreen w-full h-[200px] sm:min-h-[320px] bg-white rounded-xl  hover:scale-[1.015] shadow-md transition-all ease-in-out duration-200 flex flex-col items-center justify-between cursor-pointer"
      onClick={() => onClick(item)}
    >
      <img
        src={item.data.picture}
        alt=""
        className="h-[110px] sm:h-[240px] w-full rounded-lg object-cover "
      />

      <div className="bg-mainGreen absolute -bottom-44 sm:-bottom-80 sm:w-[300px] w-full h-full rounded-[50%] bg-opacity-35"></div>

      <div className="relative w-full h-[110px] py-3  rounded-md text-sm font-medium font-archivo px-4  flex flex-col justify-start items-start ">
        <span className="font-bold text-[14px] text-nowrap">
          {item.data.name}
        </span>
        <span className="block text-[12px] mt-1">{item.data.cookTime}</span>
        <span className="sm:absolute sm:bottom-4 sm:right-4 flex w-full h-20px justify-end items-center gap-x-1 sm:gap-x-2">
          <img src="./star.png" className="w-[20px]" alt="" />
          <h1 className="font-medium font-kanit text-[16px]">
            {item.data.rating}
          </h1>
        </span>
      </div>
    </div>
  );
};

export default SavedFoodCard;
