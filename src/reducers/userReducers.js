

export const userReducers = (state = { isAuthenticated: false, user: null, loading: false }, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
        case "LOAD_USER_REQUEST":
            return {
                isAuthenticated: false,
                user: null,
                loading: true
            };

        case "LOGIN_SUCCESS":
        case "LOAD_USER_SUCCESS":
            return {
                isAuthenticated: true,
                user: action.payload,
                loading: false
            
            };

        case "LOGIN_FAIL":
        case "LOAD_USER_FAIL":
            return {
                isAuthenticated: false,
                user: null,
                loading: false
            };

        case "LOGOUT_SUCCESS":
            return {
                isAuthenticated: false,
                user: null,
                loading: false
            };

        case "LOGOUT_FAIL":
            return {
                ...state,
                loading: false
            };

        case "LOGOUT_REQUEST":
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}