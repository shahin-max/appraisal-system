import React, { useContext } from "react";
import PropTypes from "prop-types";
import AppraisalContext from "../../context/appraisal/appraisalContext";

const AppraisalItem = ({ appraisal }) => {

  const appraisalContext = useContext(AppraisalContext);
  const {deleteAppraisal, setCurrent, clearCurrent } = appraisalContext;

  const {
    _id,
    name,
    email,
    evalperiod,
    type
  } = appraisal;

  

  const onDelete = () => {
    deleteAppraisal(_id);
    clearCurrent();
  } 

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "submitted" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {evalperiod && (
          <li>
            <i className="fas fa-calendar"></i> {evalperiod}
          </li>
        )}
        {email && (
          <li>
            <i style={{ fontSize: "15px" }} className="fas fa-envelope-open"></i> {email}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={() => setCurrent(appraisal)}>Edit</button>
        <button className="btn btn-primary btn-sm" onClick={onDelete}>Delete</button>
      </p>
    </div>
  );
};

AppraisalItem.propTypes = {
  appraisal: PropTypes.object.isRequired
};

export default AppraisalItem;
