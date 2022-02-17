import axios from 'axios';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { MY_API_URL } from '../constants/apiConstant';
import { REFRESH_TOKEN } from '../constants/userConstants';
import { logout } from '../actions/userActions';
import store from '../store';
import { useDispatch, useSelector } from 'react-redux';

const useAxios = () => {
  // const dispatch = useDispatch()
  // const userLogin = useSelector(state => state.userLogin)
  // const { userToken } = userLogin

  const { userLogin: { userToken } } = store.getState()

  const axiosInstance = axios.create({
    baseURL: MY_API_URL,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${userToken.access}`
    }
  })

  axiosInstance.interceptors.request.use(async req => {

    const user = jwt_decode(userToken.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log(`expired:${isExpired}`)
    if (!isExpired) return req
    try {
      console.log(`trying to get new token:${isExpired}`)
      const { data } = await axios.post(`${MY_API_URL}/api/users/token/refresh/`, {
        refresh: userToken.refresh
      });

      localStorage.setItem('authToken', JSON.stringify(data))
      console.log(`new token acquired`)
      store.dispatch({
        type: REFRESH_TOKEN,
        payload: data
      })

      req.headers.Authorization = `Bearer ${data.access}`
      return req
    }
    catch (error) {
      // Logout in case of expired token
      store.dispatch(logout())
    }
  })

  return axiosInstance

}

export default useAxios