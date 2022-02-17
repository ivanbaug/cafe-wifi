import axios from 'axios';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { MY_API_URL } from '../constants/apiConstant';
import { REFRESH_TOKEN } from '../constants/userConstants';
import { logout } from '../actions/userActions';
import store from '../store';

const useAxios = () => {

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
    // console.log(`UseAxios: Expired:${isExpired}`)
    if (!isExpired) return req
    try {
      // console.log(`UseAxios:trying to get new token:${isExpired}`)
      const { data } = await axios.post(`${MY_API_URL}/api/users/token/refresh/`, {
        refresh: userToken.refresh
      });

      localStorage.setItem('authToken', JSON.stringify(data))
      // console.log(`UseAxios:new token acquired`)
      store.dispatch({
        type: REFRESH_TOKEN,
        payload: data
      })
      // console.log(`useAxios: received data:${JSON.stringify(data, null, 4)}`)
      req.headers.Authorization = `Bearer ${data.access}`
      // console.log(`useAxios: new request:${JSON.stringify(req, null, 4)}`)
      return req
    }
    catch (error) {
      // Logout in case of expired refresh token
      store.dispatch(logout())
    }
  })

  return axiosInstance

}

export default useAxios