export const initialState = {
  isAuthenticated: !!localStorage.getItem("userName"),
  userName: localStorage.getItem("userName") ? JSON.parse(localStorage.getItem("userName")) : null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        userName: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        userName: null,
      };
    default:
      return state;
  }
};
