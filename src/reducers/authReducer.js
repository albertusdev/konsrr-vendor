import { createAction } from '@reduxjs/toolkit'


const initialState = {
  user: null,
  profile: null,
  isLoading: true,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'auth/LOGIN': 
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      }
    case 'auth/LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      }
    case 'auth/SET_PROFILE':
      return {
        ...state,
        profile: action.payload
      }
    default:
      return state
  }
}

export const login = createAction("auth/LOGIN")
export const logout = createAction("auth/LOGOUT")
export const setProfile = createAction("auth/SET_PROFILE")