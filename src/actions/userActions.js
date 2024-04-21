import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LOAD_USER_REQUEST" });
        const token = localStorage.getItem('token');
        const { data } = await axios.get("/api/auth/logdata", {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });
        const logData = data;
        localStorage.setItem('UserType', data.role);
        dispatch({ type: "LOAD_USER_SUCCESS", payload: logData });
    } catch (error) {
        dispatch({ type: "LOAD_USER_FAIL" });
    }
}

export const loginUser = (user) => async (dispatch) => {
    try {
        dispatch({ type: "LOGIN_REQUEST" });
        const { data } = await axios.post("/api/auth/login", { user });
        localStorage.setItem('token', data.token);
        dispatch({ type: "LOGIN_SUCCESS" });
        dispatch(loadUser()); // Reuse the loadUser action after successful login
       // toast.success("Login Successfully");
     } catch (error) {
        console.log(error)
            const errorMessage = error.response?.data?.error || "Login failed"; // Extract error message from response data
            toast.error(errorMessage); // Display appropriate error message
            dispatch({ type: "LOGIN_FAIL" });
        }
}



export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LOGOUT_REQUEST" });
        localStorage.clear();
        toast.success("Logout Successfully");
        dispatch({ type: "LOGOUT_SUCCESS" });
    } catch (error) {
        dispatch({ type: "LOGOUT_FAIL" });
    }
}