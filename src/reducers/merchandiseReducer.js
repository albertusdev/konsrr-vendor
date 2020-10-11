import { createAction } from '@reduxjs/toolkit'

const initialState = {
  merchandises: [],
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'merchandise/SET_MERCHANDISES': 
      return {
        ...state,
        merchandises: action.payload
      }
    default:
      return state
  }
}

export const setMerchandises = createAction("merchandise/SET_MERCHANDISES");
