import React, { useReducer } from "react";
import axios from "axios";
import AppraisalContext from "./appraisalContext";
import appraisalReducer from "./appraisalReducer";
import {
  GET_APPRAISALS,
  ADD_APPRAISAL,
  DELETE_APPRAISAL,
  CLEAR_APPRAISALS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_APPRAISAL,
  FILTER_APPRAISALS,
  CLEAR_FILTER,
  APPRAISAL_ERROR
} from "../types";

const AppraisalState = props => {
  const initialState = {
    appraisals: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(appraisalReducer, initialState);

  // Get appraisals
  const getAppraisals = async () => {
    try {
      const res = await axios.get("/api/appraisal");

      dispatch({ type: GET_APPRAISALS, payload: res.data });
    } catch (err) {
      dispatch({ type: APPRAISAL_ERROR, payload: err.response.msg });
    }
  };

   // Get all appraisals for admin role
   const getAllAppraisals = async () => {
    try {
      const res = await axios.get("/api/admin");

      dispatch({ type: GET_APPRAISALS, payload: res.data });
    } catch (err) {
      dispatch({ type: APPRAISAL_ERROR, payload: err.response.msg });
    }
  };

  // Add appraisal
  const addAppraisal = async appraisal => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/appraisal", appraisal, config);

      dispatch({ type: ADD_APPRAISAL, payload: res.data });
    } catch (err) {
      dispatch({ type: APPRAISAL_ERROR, payload: err.response.msg });
    }
  };

  // Delete appraisal
  const deleteAppraisal = async id => {
    try {
      await axios.delete(`/api/appraisal/${id}`);

      dispatch({ type: DELETE_APPRAISAL, payload: id });
    } catch (err) {
      dispatch({ type: APPRAISAL_ERROR, payload: err.response.msg });
    }
  };

    // Update appraisal
    const updateAppraisal = async appraisal => {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
  
      try {
        const res = await axios.put(
          `/api/appraisal/${appraisal._id}`,
          appraisal,
          config
        );
  
        dispatch({ type: UPDATE_APPRAISAL, payload: res.data });
      } catch (err) {
        dispatch({ type: APPRAISAL_ERROR, payload: err.response.msg });
      }
    };

    // Update appraisal as admin
    const updateAppraisalAdmin = async appraisal => {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
  
      try {
        const res = await axios.put(
          `/api/admin/${appraisal._id}`,
          appraisal,
          config
        );
  
        dispatch({ type: UPDATE_APPRAISAL, payload: res.data });
      } catch (err) {
        dispatch({ type: APPRAISAL_ERROR, payload: err.response.msg });
      }
    };
  
  // Clear appraisals
  const clearAppraisals = () => {
    dispatch({ type: CLEAR_APPRAISALS });
  };

  // Set current appraisal
  const setCurrent = appraisal => {
    dispatch({ type: CLEAR_CURRENT });
    dispatch({ type: SET_CURRENT, payload: appraisal });
  };

  // Clear current appraisal
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter appraisals
  const filterAppraisals = text => {
    dispatch({ type: FILTER_APPRAISALS, payload: text });
  };

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <AppraisalContext.Provider
      value={{
        appraisals: state.appraisals,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getAppraisals,
        getAllAppraisals,
        addAppraisal,
        deleteAppraisal,
        clearAppraisals,
        setCurrent,
        clearCurrent,
        updateAppraisal,
        updateAppraisalAdmin,
        filterAppraisals,
        clearFilter
      }}
    >
      {props.children}
    </AppraisalContext.Provider>
  );
};

export default AppraisalState;
