import { HomeIcon } from "@radix-ui/react-icons";
import { BarChart, Book, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <ul className="menu menu-vertical gap-5 flex flex-col  lg:menu-horizontal bg-base-200 rounded-box">
      <li
        onClick={() => navigate("/")}
        className="hover:bg-black/20 gap-2 cursor-pointer w-[120px] h-[40px] flex items-center justify-start px-2 rounded-lg"
      >
        <HomeIcon width={20} height={20} />
        <a>Home</a>
      </li>
      <li
        onClick={() => navigate("/bids")}
        className="hover:bg-black/20 gap-2 cursor-pointer w-[120px] h-[40px] flex items-center justify-start px-2 rounded-lg"
      >
        <BarChart width={20} height={20} />
        <a>Bids</a>
      </li>

      <li
        onClick={() => navigate("/profile")}
        className="hover:bg-black/20 gap-2 cursor-pointer w-[120px] h-[40px] flex items-center justify-start px-2 rounded-lg"
      >
        <User width={20} height={20} />
        <a>Profile</a>
      </li>
      <li
        onClick={() => navigate("/admin")}
        className="hover:bg-black/20 gap-2 cursor-pointer w-[120px] h-[40px] flex items-center justify-start px-2 rounded-lg"
      >
        <User width={20} height={20} />
        <a>Admin</a>
      </li>
    </ul>
  );
};

export default Sidebar;
