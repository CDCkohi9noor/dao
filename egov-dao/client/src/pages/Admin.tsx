import React from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navgiate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>SubmitForm</div>
        <div className=" ">
          <Button
            onClick={() => navgiate("/admin/submit")}
            className="bg-slate-700"
          >
            Create Proposal
          </Button>
        </div>
      </div>

      <div className=" mt-5 text-xl font-semibold">Closed Proposals</div>
      <div></div>
    </div>
  );
};

export default Admin;
