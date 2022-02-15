import axios from 'axios'
import { MY_API_URL } from '../constants/apiConstant'
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

export const listCafes = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: CAFE_LIST_REQUEST })
    const { data } = await axios.get(`${MY_API_URL}/api/cafes`)
    dispatch({
      type: CAFE_LIST_SUCCESS,
      payload: data,
    })
  }
  catch (error) {
    dispatch({
      type: CAFE_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}

export const listCafeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CAFE_DETAILS_REQUEST })
    const { data } = await axios.get(`${MY_API_URL}/api/cafes/${id}`)
    dispatch({
      type: CAFE_DETAILS_SUCCESS,
      payload: data,
    })
  }
  catch (error) {
    dispatch({
      type: CAFE_DETAILS_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}

export const deleteCafe = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAFE_DELETE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.delete(
      `${MY_API_URL}/api/cafes/delete/${id}`,
      config
    )

    dispatch({
      type: CAFE_DELETE_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: CAFE_DELETE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail : error.message,
    })
  }
}