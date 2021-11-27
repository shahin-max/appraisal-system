import {
  GET_APPRAISALS,
  ADD_APPRAISAL,
  DELETE_APPRAISAL,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_APPRAISAL,
  FILTER_APPRAISALS,
  CLEAR_FILTER,
  APPRAISAL_ERROR,
  CLEAR_APPRAISALS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_APPRAISALS:
      return {
        ...state,
        appraisals: action.payload,
        loading: false
      };
    case ADD_APPRAISAL:
      return {
        ...state,
        appraisals: [action.payload, ...state.appraisals],
        loading: false
      };
    case UPDATE_APPRAISAL:
      return {
        ...state,
        appraisals: state.appraisals.map(appraisal =>
          appraisal._id === action.payload._id ? action.payload : appraisal
        ),
        loading: false
      };
    case DELETE_APPRAISAL:
      return {
        ...state,
        appraisals: state.appraisals.filter(
          appraisal => appraisal._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_APPRAISALS:
      return {
        ...state,
        appraisals: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_APPRAISALS:
      return {
        ...state,
        filtered: state.appraisals.filter(appraisal => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return appraisal.name.match(regex) || appraisal.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case APPRAISAL_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
