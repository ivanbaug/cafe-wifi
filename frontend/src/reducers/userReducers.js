import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  // USER_LIST_REQUEST,
  // USER_LIST_SUCCESS,
  // USER_LIST_FAIL,
  // USER_LIST_RESET,
  // USER_DELETE_REQUEST,
  // USER_DELETE_SUCCESS,
  // USER_DELETE_FAIL,
  // USER_UPDATE_REQUEST,
  // USER_UPDATE_SUCCESS,
  // USER_UPDATE_FAIL,
  // USER_UPDATE_RESET,
  REFRESH_TOKEN,
} from "../constants/userConstants";
import jwt_decode from "jwt-decode";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userToken: action.payload,
        userInfo: jwt_decode(action.payload.access),
      }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case REFRESH_TOKEN:
      return {
        loading: false,
        userToken: action.payload,
        userInfo: jwt_decode(action.payload.access),
      }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userToken: action.payload,
        userInfo: jwt_decode(action.payload.access),
      }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_REGISTER_RESET:
      return { userInfo: null }
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        userToken: action.payload,
        userInfo: jwt_decode(action.payload.access),
      }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}