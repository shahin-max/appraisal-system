import React, { useState, useContext, useEffect } from "react";
import AppraisalContext from "../../context/appraisal/appraisalContext";
import AuthContext from "../../context/auth/authContext";

const AppraisalForm = () => {
  const authContext = useContext(AuthContext);
  const appraisalContext = useContext(AppraisalContext);

  const { user } = authContext;

  const {
    addAppraisal,
    updateAppraisal,
    current,
    clearCurrent
  } = appraisalContext;

  useEffect(() => {
    if (current !== null) {
      setAppraisal(current);
    } else {
      setAppraisal({
        name: "",
        email: "",
        evalperiod: "",
        position: "",
        team: "",
        teamleader: "",
        achieved: "",
        goals: "",
        wishlist: "",
        swot1: "",
        swot2: "",
        swot3: "",
        swot4: "",
        feedback: "",
        tlfeedback: "",
        type: "draft"
      });
    }
  }, [appraisalContext, current]);

  const [appraisal, setAppraisal] = useState({
    name: "",
    email: "",
    evalperiod: "",
    position: "",
    team: "",
    teamleader: "",
    achieved: "",
    goals: "",
    wishlist: "",
    swot1: "",
    swot2: "",
    swot3: "",
    swot4: "",
    feedback: "",
    tlfeedback: "",
    type: "draft"
  });

  const {
    evalperiod,
    position,
    team,
    teamleader,
    achieved,
    goals,
    wishlist,
    swot1,
    swot2,
    swot3,
    swot4,
    feedback,
    tlfeedback
  } = appraisal;

  const onChange = e => {
    setAppraisal({
      ...appraisal,
      [e.target.name]: e.target.value,
      // eslint-disable-next-line
      ["name"]: String(user && user.name),
      // eslint-disable-next-line
      ["email"]: String(user && user.email)
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addAppraisal(appraisal);
    } else {
      updateAppraisal(appraisal);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>{current ? "Edit Appraisal" : "Add Appraisal"}</h2>
      {/*Bio*/}
      <div className="grid-bio flex-2-form">
        <div className="flex-child-form-1">
          <h4>Name</h4>
          <h4 className="text-primary">{user && user.name}</h4>
        </div>
        <div className="flex-child-form-2">
          <h4>Email</h4>
          <h4 className="text-primary">{user && user.email}</h4>
        </div>
      </div>
      {/* Evaluation Period */}
      <h4>Evaluation Period</h4>
      <select name="evalperiod" onChange={onChange} value={evalperiod}>
        <option value="Please Select" defaultValue>
          Please Select
        </option>
        <option value="End-year appraisal – 2019">
          End-year appraisal – 2019
        </option>
        <option value="Mid-year appraisal – 2020">
          Mid-year appraisal – 2020
        </option>
        <option value="End-year appraisal – 2020">
          End-year appraisal – 2020
        </option>
        <option value="Mid-year appraisal – 2021">
          Mid-year appraisal – 2021
        </option>
        <option value="End-year appraisal – 2021">
          End-year appraisal – 2021
        </option>
        <option value="Mid-year appraisal – 2022">
          Mid-year appraisal – 2022
        </option>
        <option value="End-year appraisal – 2022">
          End-year appraisal – 2022
        </option>
        <option value="Mid-year appraisal – 2023">
          Mid-year appraisal – 2023
        </option>
        <option value="End-year appraisal – 2023">
          End-year appraisal – 2023
        </option>
      </select>
      {/* Position */}
      <h4>Your Position</h4>
      <select name="position" onChange={onChange} value={position}>
        <option value="Please Select" defaultValue>
          Please Select
        </option>
        <option value="Starter">Starter</option>
        <option value="Data Processor">Data Processor</option>
        <option value="Customer Expert">Customer Expert</option>
        <option value="Team Leader">Team Leader</option>
        <option value="Help Desk Analyst">Help Desk Analyst</option>
      </select>
      {/* Team */}
      <h4>Your Team</h4>
      <select name="team" onChange={onChange} value={team}>
        <option value="Please Select" defaultValue>
          Please Select
        </option>
        <option value="CHEVRON">CHEVRON</option>
        <option value="DOW">DOW</option>
        <option value="EXXON">EXXON</option>
        <option value="Help Desk">Help Desk</option>
        <option value="Ineos/Borealis">Ineos/Borealis</option>
        <option value="SABIC">SABIC</option>
        <option value="SINGAPORE">SINGAPORE</option>
        <option value="US Sub-Team 1">US Sub-Team 1</option>
        <option value="US Sub-Team 2">US Sub-Team 2</option>
        <option value="US Sub-Team 2">US Sub-Team 2</option>
        <option value="WVN136">WVN136</option>
      </select>
      {/* Teamleader */}
      <h4>Who is your Team Leader?</h4>
      <select name="teamleader" onChange={onChange} value={teamleader}>
        <option value="Please Select" defaultValue>
          Please Select
        </option>
        <option value="Bondarenco Denis">Bondarenco Denis</option>
        <option value="Foiu Cristina">Foiu Cristina</option>
        <option value="Gitu Alina">Gitu Alina</option>
        <option value="Gutium Dan">Gutium Dan</option>
        <option value="Haraz Daniela">Haraz Daniela</option>
        <option value="Leasoc Denis">Leasoc Denis</option>
        <option value="Puscas Elena">Puscas Elena</option>
        <option value="Petrova Irina">Petrova Irina</option>
        <option value="Rusnac Natalia">Rusnac Natalia</option>
        <option value="Samoila Vadim">Samoila Vadim</option>
        <option value="Tanasii Anna">Tanasii Anna</option>
        <option value="Tepleacov Inga">Tepleacov Inga</option>
      </select>
      {/* <input
        type="text"
        placeholder=""
        name="teamleader"
        value={teamleader}
        onChange={onChange}
      /> */}
      <h4>Objectives/tasks achieved</h4>
      {/* Achieved */}
      <textarea
        placeholder=""
        name="achieved"
        value={achieved}
        onChange={onChange}
      />
      <h4>Objectives/tasks still to be accomplished</h4>
      {/* Goals */}
      <textarea placeholder="" name="goals" value={goals} onChange={onChange} />
      <h4>Wish-list of Trainings/ Activities to accomplish</h4>
      {/* Wishlist */}
      <textarea
        placeholder=""
        name="wishlist"
        value={wishlist}
        onChange={onChange}
      />
      <h4>Individual SWOT analysis:</h4>
      <div className="flex-2-form">
        {/* Swot 1*/}
        <div className="flex-child-form-1">
          <h5>What are your Strengths?</h5>
          <textarea
            placeholder=""
            name="swot1"
            value={swot1}
            onChange={onChange}
          />
        </div>
        <div className="flex-child-form-2">
          {/* Swot 2*/}
          <h5>What are your Weaknesses?</h5>
          <textarea
            placeholder=""
            name="swot2"
            value={swot2}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="flex-2-form">
        {/* Swot 3*/}
        <div className="flex-child-form-1">
          <h5>What are your Opportunities/ Wishes?</h5>
          <textarea
            placeholder=""
            name="swot3"
            value={swot3}
            onChange={onChange}
          />
        </div>
        <div className="flex-child-form-2">
          {/* Swot 4*/}
          <h5>What are your Threats / worries?</h5>
          <textarea
            placeholder=""
            name="swot4"
            value={swot4}
            onChange={onChange}
          />
        </div>
      </div>
      <h4>Feedback and proposals</h4>
      {/* Feedback */}
      <textarea
        placeholder=""
        name="feedback"
        value={feedback}
        onChange={onChange}
      />
      <h4>Teamleader Feedback</h4>
      {/* Teamleader Feedback */}
      <textarea placeholder="" name="tlfeedback" value={tlfeedback} readOnly />
      {/* Status */}
      <h4>Submit now or save and edit later?</h4>
      <input
        type="submit"
        value={current ? "Update" : "Save Draft"}
        className="btn btn-primary btn-block"
      />
      <div>
        <button className="btn btn-success btn-block" name="type" value="submitted" onClick={onChange}>Submit Now</button>
      </div>
      {""}
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default AppraisalForm;
