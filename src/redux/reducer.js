const initialState = {
  isAuthenticated: null,
  loading: true,
};

const SET_AUTHEN = "SET_AUTHEN";

export const setAuthen = (isAuthenticated) => (dispatch) => {
  dispatch({
    type: SET_AUTHEN,
    payload: isAuthenticated,
  });
  localStorage.authenticated = isAuthenticated;
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTHEN:
      return {
        ...initialState,
        isAuthenticated: payload,
        loading: false,
      };
    default:
      return state;
  }
}
