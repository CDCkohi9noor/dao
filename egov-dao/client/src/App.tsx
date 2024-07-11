import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Proposals from "./pages/Proposals";
import ProposalsDetails from "./pages/ProposalsDetails";
import Bid from "./pages/Bid";
import Navbar from "./pages/_components/Navbar";
import Sidebar from "./pages/_components/Sidebar";
import SubmitForm from "./pages/SubmitForm";

const App = () => {
  return (
    <div className="bg-[#151617] text-white w-full min-h-screen py-10 px-10 sm:px-40 xl:px-[23rem]">
      <Navbar />
      <div className="flex gap-10">
        <div className="sticky hidden sm:block">
          <Sidebar />
        </div>
        <div className=" w-full">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/proposals" element={<Proposals />}></Route>
            <Route
              path="/proposals-details/:id"
              element={<ProposalsDetails />}
            ></Route>
            <Route path="/bids" element={<Bid />}></Route>
            <Route path="/submit-proposal" element={<Bid />}></Route>
            <Route path="/admin/submit" element={<SubmitForm />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
