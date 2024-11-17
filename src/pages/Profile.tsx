import { useUser } from '@/context/UserContext';
import Background from "/Background.png";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const toggleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div
        className=" bg-cream w-full pt-[80px] gap-y-4  min-h-screen flex flex-col justify-start items-center px-16 font-kanit pb-20 relative"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="h-[420px] bg-mainGreen w-full rounded-b-[100px] absolute -top-20"></div>
        <section className=" flex flex-col  justify-start items-center   font-normal z-30  min-h-[200px] w-full rounded-xl relative">
          <div className="border-4 bg-white shadow-md -mt-4 border-white z-40 w-[120px] rounded-[50%] h-[120px] p-2">
            <div className=" bg-cyan-200 w-full h-full rounded-[50%] "></div>
          </div>
          <div className="bg-white pt-10 text-[18px] absolute bottom-0 w-full h-36 rounded-xl shadow-xl flex justify-center items-center flex-col">
            <h2><b className='font-normal text-[17px]'>Chef</b> {userData?.name}</h2>
            <h2 className="text-[12px] tracking-wide text-slate-500">
              {userData?.rank}
            </h2>
            <h2 className="text-[12px] tracking-wide text-slate-500">
              {userData?.phone}
            </h2>
          </div>
        </section>
        <section className="shadow-xl z-30 p-4 font-normal bg-white min-h-[450px] w-full rounded-xl"></section>

        <div className=" mt-8 flex justify-between items-center w-full px-16">
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