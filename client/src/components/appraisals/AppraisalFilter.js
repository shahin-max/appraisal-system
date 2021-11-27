import React, { useContext, useRef, useEffect } from "react";
import AppraisalContext from "../../context/appraisal/appraisalContext";

const AppraisalFilter = () => {
  const appraisalContext = useContext(AppraisalContext);
  const text = useRef('')

  const { filterAppraisals, clearFilter, filtered } = appraisalContext;

  useEffect(() => {
    if(filtered === null) {
      text.current.value = "";
    }
  })

  const onChange = e => {
    if(text.current.value !== '') {
      filterAppraisals(e.target.value);
    } else {
      clearFilter();
    }
  }


  return (
    <form>
      <input ref={text} type="text" placeholder="Search..." onChange={onChange} />
    </form>
  )
}

export default AppraisalFilter;
