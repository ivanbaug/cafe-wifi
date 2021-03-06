import axios from 'axios'
import { MY_API_URL } from '../constants/apiConstant'
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
  // USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  // USER_UPDATE_RESET,
  // REFRESH_TOKEN,
} from "../constants/userConstants";
import useAxios from '../utils/useAxios';



export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const { data } = await axios.post(
      `${MY_API_URL}/api/users/login/`,
      { 'username': email, 'password': password },
      config
    )
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('authToken', JSON.stringify(data))
  }
  catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('authToken')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: USER_LIST_RESET })
  dispatch({ type: USER_REGISTER_RESET })
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    const { data } = await axios.post(
      `${MY_API_URL}/api/users/register/`,
      { 'name': name, 'email': email, 'password': password },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('authToken', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail : error.message,
    })
  }
}


export const getUserDetails = (id) => async (dispatch, getState) => {
  const axiosAuth = useAxios()
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    })

    const { data } = await axiosAuth.get(`${MY_API_URL}/api/users/${id}/`)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail : error.message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  const axiosAuth = useAxios()
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    })

    const { data } = await axiosAuth.put(
      `${MY_API_URL}/api/users/profile/update/`,
      user,
      // config
    )

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('authToken', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail : error.message,
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  const axiosAuth = useAxios()
  try {
    dispatch({
      type: USER_LIST_REQUEST
    })

    const { data } = await axiosAuth.get(
      `${MY_API_URL}/api/users/`,
    )

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail : error.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  const axiosAuth = useAxios()
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    })

    const { data } = await axiosAuth.delete(
      `${MY_API_URL}/api/users/delete/${id}`,
    )

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail : error.message,
    })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  const axiosAuth = useAxios()
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
    })


    const { data } = await axiosAuth.put(
      `${MY_API_URL}/api/users/update/${user._id}/`,
      user,
    )

    dispatch({
      type: USER_UPDATE_SUCCESS,
    })

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail : error.message,
    })
  }
}
