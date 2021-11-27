import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AppraisalItem from "./AppraisalItem";
import AppraisalContext from "../../context/appraisal/appraisalContext";
import Spinner from "../layout/Spinner";

const Appraisals = () => {
  const appraisalContext = useContext(AppraisalContext);

  const { appraisals, filtered, getAllAppraisals, loading } = appraisalContext;

  useEffect(() => {
    getAllAppraisals();
    // eslint-disable-next-line
  }, []);

  if (appraisals !== null && appraisals.length === 0 && !loading) {
    return <h4>Appraisal list will be displayed there</h4>;
  }

  return (
    <Fragment>
      {appraisals !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(appraisal => (
                <CSSTransition
                  key={appraisal._id}
                  timeout={500}
                  classNames="item"
                >
                  <AppraisalItem key={appraisal._id} appraisal={appraisal} />
                </CSSTransition>
              ))
            : appraisals.map(appraisal => (
                <CSSTransition
                  key={appraisal._id}
                  timeout={500}
                  classNames="item"
                >
                  <AppraisalItem appraisal={appraisal} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Appraisals;
