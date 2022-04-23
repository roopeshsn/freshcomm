import axios from 'axios'
import {
  CAROUSEL_LIST_REQUEST,
  CAROUSEL_LIST_SUCCESS,
  CAROUSEL_LIST_FAIL,
  CAROUSEL_UPDATE_REQUEST,
  CAROUSEL_UPDATE_SUCCESS,
  CAROUSEL_UPDATE_FAIL,
  CAROUSEL_DETAILS_SUCCESS,
  CAROUSEL_DETAILS_REQUEST,
  CAROUSEL_DETAILS_FAIL,
  CAROUSEL_CREATE_REQUEST,
  CAROUSEL_CREATE_SUCCESS,
  CAROUSEL_CREATE_FAIL,
} from '../constants/carouselConstants'
import { logout } from './userActions'

export const listCarousels = () => async (dispatch) => {
  try {
    dispatch({ type: CAROUSEL_LIST_REQUEST })
    const { data } = await axios.get(`/api/carousels`)
    dispatch({ type: CAROUSEL_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CAROUSEL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCarouselDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CAROUSEL_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/carousels/${id}`)
    dispatch({ type: CAROUSEL_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CAROUSEL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createCarousel = (carousel) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAROUSEL_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/carousels`, carousel, config)

    dispatch({
      type: CAROUSEL_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CAROUSEL_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateCarousel = (carousel) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAROUSEL_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/carousels/${carousel._id}`,
      carousel,
      config,
    )

    dispatch({
      type: CAROUSEL_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: CAROUSEL_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CAROUSEL_UPDATE_FAIL,
      payload: message,
    })
  }
}
