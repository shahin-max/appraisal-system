import React, { useContext, useEffect } from "react";
import Appraisals from "../appraisals/Appraisals";
import AppraisalForm from "../appraisals/AppraisalForm";
import AppraisalFilter from "../appraisals/AppraisalFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2 flex-2">
      <div className="flex-child-1">
        <AppraisalForm />
      </div>
      <div className="flex-child-2">
        <AppraisalFilter />
        <Appraisals />
      </div>
    </div>
  );
};

export default Home;
