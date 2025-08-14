import {
  GET_ALL_FAVOURITE_FAIL,
  GET_ALL_FAVOURITE_REQUEST,
  GET_ALL_FAVOURITE_SUCCESS,
  GET_ALL_VIEW_FAIL,
  GET_ALL_VIEW_REQUEST,
  GET_ALL_VIEW_SUCCESS,
  ADD_FAVOURITE_FAIL,
  ADD_FAVOURITE_REQUEST,
  ADD_FAVOURITE_SUCCESS,
  REMOVE_FAVOURITE_FAIL,
  REMOVE_FAVOURITE_REQUEST,
  REMOVE_FAVOURITE_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/favouriteConstant";

const viewReducer = (state = { favourites: [], views: [] }, action) => {
  switch (action.type) {
    case GET_ALL_FAVOURITE_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_FAVOURITE_SUCCESS:
      return {
        ...state,
        loading: false,
        favourites: action.payload.favourites,
      };
    case GET_ALL_FAVOURITE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_ALL_VIEW_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_VIEW_SUCCESS:
      return { ...state, loading: false, views: action.payload.views };
    case GET_ALL_VIEW_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ADD_FAVOURITE_REQUEST:
      return { ...state, loading: true };
    case ADD_FAVOURITE_SUCCESS:
      return {
        ...state,
        loading: false,
        favourites: [...state.favourites, action.payload.view],
      };
    case ADD_FAVOURITE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case REMOVE_FAVOURITE_REQUEST:
      return { ...state, loading: true };
    case REMOVE_FAVOURITE_SUCCESS:
      return {
        ...state,
        loading: false,
        favourites: state.favourites.filter(
          (item) => item._id !== action.payload.view._id
        ),
      };
    case REMOVE_FAVOURITE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export { viewReducer };
