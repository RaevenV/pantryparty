import { useEffect, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";


export function Navbar() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setMenu((prev) => !prev);
  };

  const handleHomeClick = () => {
    navigate(`/`);
  };

  useEffect(() => {
    const smallnav = document.querySelector("#small-nav");

    if (menu) {
      smallnav?.classList.remove("hidden");
      smallnav?.classList.add("flex");
      gsap.fromTo(
        smallnav,
        { right: "100%", opacity: 0 },
        {
          right: "0%",
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.2)",
        }
      );
    } else {
      gsap.to(smallnav, {
        right: "100%",
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          smallnav?.classList.add("hidden");
        },
      });
    }
  }, [menu]);

  return (
    <>
      <div
        className="absolute top-0 w-full h-20 flex flex-row justify-between items-center px-6 bg-transparent"
        
      >
        <img
          onClick={handleHomeClick}
          src="/logo.png"
          className="h-[72px] w-[72px] cursor-pointer"
          alt="Logo"
        />
        <img
          id="menu"
          src={menu ? "/close.png" : "/menu.png"}
          className="h-8 w-8 cursor-pointer"
          onClick={handleMenuClick}
          alt={menu ? "Close menu" : "Open menu"}
        />
      </div>
      <div
        id="small-nav"
        className="absolute top-[85px] w-full h-[500px] bg-transparent z-[1] justify-center items-center hidden"
      >
        <div className="w-[80%] h-full bg-mainGreen rounded-xl flex justify-center items-center shadow-xl">
          <div className="w-[90%] h-[92%]  px-6 py-8 rounded-md flex justify-start items-center flex-col gap-y-8 text-white font-raleway font-bold">
            <a href="#">test</a>
            <a href="#">test</a>
            <a href="#">test</a>
          </div>
        </div>
      </div>
    </>
  );
}
