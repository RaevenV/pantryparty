import { useUser } from '@/context/UserContext';
import Background from "/Background.png";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const {userData } = useUser();
  const navigate = useNavigate();
  const toggleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div
        className="bg-cream w-full pt-[80px] min-h-screen flex flex-col justify-center items-center px-10 font-kanit pb-20 relative"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="">profile</div>
        <h2>{userData?.name}</h2>
        <div className=" mt-2 flex justify-between items-center w-full">
          <button
            onClick={toggleBack}
            className="w-full h-14 rounded-2xl bg-mainGreen backdrop-blur-md flex items-center justify-center hover:scale-[1.015] transition-all duration-100 ease-in text-white"
          >
            back
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile