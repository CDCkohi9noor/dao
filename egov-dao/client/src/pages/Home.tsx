import { useEffect } from "react";
import { useEthereum } from "../context/ContractProvider";

const Home = () => {
  const { addressInit, getAllProposals } = useEthereum();

  useEffect(() => {
    addressInit();
  }, []);

  return (
    <div className=" flex flex-col gap-4">
      <div className=" sm:text-2xl text-xl ml-10">Current Proposals</div>
      <div className="  ">
        <div className="carousel rounded-box p-10 gap-10 flex flex-wrap">
          <div className="carousel-item bg-black rounded-lg w-[240px]">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
              alt="Burger"
            />
          </div>
          <div className="carousel-item w-[240px]">
            <img
              src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
              alt="Burger"
            />
          </div>
          <div className="carousel-item w-[240px]">
            <img
              src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
              alt="Burger"
            />
          </div>
          <div className="carousel-item w-[240px]">
            <img
              src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
              alt="Burger"
            />
          </div>
          <div className="carousel-item w-[240px]">
            <img
              src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
              alt="Burger"
            />
          </div>
          <div className="carousel-item w-[240px]">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
              alt="Burger"
            />
          </div>
          <div className="carousel-item w-[240px]">
            <img
              src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
              alt="Burger"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
