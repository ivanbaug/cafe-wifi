import {
  CAFE_LIST_REQUEST,
  CAFE_LIST_SUCCESS,
  CAFE_LIST_FAIL,
  CAFE_DETAILS_REQUEST,
  CAFE_DETAILS_SUCCESS,
  CAFE_DETAILS_FAIL,
  CAFE_DELETE_REQUEST,
  CAFE_DELETE_SUCCESS,
  CAFE_DELETE_FAIL,
  CAFE_CREATE_REQUEST,
  CAFE_CREATE_SUCCESS,
  CAFE_CREATE_FAIL,
  CAFE_CREATE_RESET,
  CAFE_UPDATE_REQUEST,
  CAFE_UPDATE_SUCCESS,
  CAFE_UPDATE_FAIL,
  CAFE_UPDATE_RESET,
  CAFE_CREATE_REVIEW_REQUEST,
  CAFE_CREATE_REVIEW_SUCCESS,
  CAFE_CREATE_REVIEW_FAIL,
  CAFE_CREATE_REVIEW_RESET,
  CAFE_TOP_REQUEST,
  CAFE_TOP_SUCCESS,
  CAFE_TOP_FAIL,
} from '../constants/cafeConstants'

export const cafeListReducer = (state = { cafes: [] }, action) => {
  switch (action.type) {
    case CAFE_LIST_REQUEST:
      return { loading: true, cafes: [] }
    case CAFE_LIST_SUCCESS:
      return {
        loading: false,
        cafes: action.payload.cafes,
        // page: action.payload.page,
        // pages: action.payload.pages,
      }
    case CAFE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}