import { RecipeWithId } from "@/lib/types";
interface FoodCardProps {
  item: RecipeWithId;
  onClick: (item: RecipeWithId) => void;
}

const FoodCard = ({ item, onClick }: FoodCardProps) => {
  return (
    <div
      className="w-[48%] h-60 bg-darkGreen  rounded-xl shadow-xl  hover:scale-[1.02] transition-all ease-in-out duration-[500] flex flex-col items-center justify-start cursor-pointer pt-2"
      onClick={() => onClick(item)}
    >
      <img
        src={item.data.picture}
        alt=""
        className="h-[60%] w-[92%] rounded-lg object-cover"
      />
      <div className="w-full h-[40%] flex justify-center items-center px-2 py-2">
        <div className="w-full h-full bg-cream rounded-md text-sm font-medium font-archivo px-2 pt-2 flex flex-col justify-start items-start">
          <span className="font-bold text-[12px] ">{item.data.name}</span>
          <span className="text-[10px]">prep time: {item.data.cookTime}</span>
          <span className="text-[10px]">difficulty: {item.data.difficulty}</span>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
