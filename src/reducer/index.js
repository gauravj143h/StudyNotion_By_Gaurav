import { combineReducers } from "redux";
import authReducer from "../slice/authSlice"; // ✅ correct import
import profileReducer from "../slice/ProfileSlice"
import cartReducer from "../slice/cartslice"
import courseReducer from "../slice/courseSlice"
import viewCourseReducer from "../slice/viewCourseSlice"

const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
     viewCourse:viewCourseReducer,
})

export default rootReducer