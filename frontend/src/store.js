import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  cafeListReducer,
  cafeDetailsReducer,
  cafeDeleteReducer,
  cafeCreateReducer,
  cafeUpdateReducer,
  cafeCreateReviewReducer,
} from './reducers/cafeReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'
import jwt_decode from "jwt-decode"

const reducer = combineReducers({
  cafeList: cafeListReducer,
  cafeDetails: cafeDetailsReducer,
  cafeDelete: cafeDeleteReducer,
  cafeCreate: cafeCreateReducer,
  cafeUpdate: cafeUpdateReducer,
  cafeCreateReview: cafeCreateReviewReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
})


const userTokensFromStorage = localStorage.getItem('authToken') ?
  JSON.parse(localStorage.getItem('authToken')) : null

const userInfoFromToken = userTokensFromStorage ?
  jwt_decode(userTokensFromStorage.access) : null

const initialState = {
  userLogin: {
    userToken: userTokensFromStorage,
    userInfo: userInfoFromToken,
  }
}

const middleware = [thunk]



const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store