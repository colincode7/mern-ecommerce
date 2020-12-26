import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAILED,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAILED,
  USER_UPDATE_PROFILE_RESET,
} from "../actionTypes/userConstants";

///////////////////////////     LOGIN REDUCER    ///////////////////////////////

export const userLoginReducer = (
  state = {
    loading: false,
    isAuthenticated: false,
    userInfo: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, error: null };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        userInfo: action.payload,
      };

    case USER_LOGIN_FAILED:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    case USER_LOGOUT:
      return {
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

///////////////////////////     REGISTER REDUCER    ///////////////////////////////

export const userRegisterReducer = (
  state = {
    loading: false,
    isAuthenticated: false,
    userInfo: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, error: null };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        userInfo: action.payload,
      };

    case USER_REGISTER_FAILED:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

/////////////////////////////////////////   USER PROFILE DETAILS   /////////////////////////////////

export const userDetailsReducer = (
  state = { loading: false, user: null, error: null },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

/////////////////////////////////////////   UPDATE USER PROFILE DETAILS   /////////////////////////////////

export const userUpdateProfileReducer = (
  state = { loading: false, userInfo: null, error: null, success: false },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        success: true,
      };

    case USER_UPDATE_PROFILE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
