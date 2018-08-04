import _ from "lodash";
import { ActionTypes as a } from "../../constants/Plans/Plans_action_types";

const INITIAL_STATE = {
  error: false,
  success: false,
  plansLoading: false,
  servicesLoading: false,
  plans: [],
  plansNames: [],
  service: []
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case a.GET_PLANS_REQUEST:
      return {
        ...state,
        plansLoading: true
      };
    case a.GET_PLANS_SUCCESS:
      return {
        ...state,
        plansLoading: false,
        error: false,
        success: true,
        plansNames: _.map(action.payload.plan, plan => ({
          nameTranslations: plan.nameTranslations,
          id: plan.id
        })),
        plans: action.payload.plan
      };
    case a.GET_PLANS_FAILURE:
      return {
        ...state,
        plansLoading: false,
        error: true,
        success: false
      };
    case a.GET_SERVICES_REQUEST:
      return {
        ...state,
        servicesLoading: true
      };
    case a.GET_SERVICES_SUCCESS:
      return {
        ...state,
        servicesLoading: false,
        error: false,
        success: true,
        services: action.payload.service
      };
    case a.GET_SERVICES_FAILURE:
      return {
        ...state,
        servicesLoading: false,
        error: true,
        success: false
      };
    default:
      return state;
  }
};
