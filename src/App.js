import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/signuo&login/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/Updatepassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./components/core/About/About";
import Myprofile from "./components/core/auth/Myprofile";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/core/auth/ProtectedRoute";
import Error from "./pages/Error";
import Setting from "./components/core/auth/Setting";
import EnrolledCourses from "./components/core/auth/EnrolledCourses";
import MyCourse from "./components/core/MyCourse/MyCourse";
import Cart from "../src/components/core/Cart/index";
import AddCourse from "./components/core/AddCourse/AddCourse";
import Catalog from "./components/common/Catalog";
import CourseBuy from "./components/core/buycourse/CourseBuy";
import ViewCourse from "./components/common/ViewCourse";
import { ACCOUNT_TYPE } from "./utils/constants";
import VideoDetailsSidebar from "./components/core/viewcourse/VideoDetailsSidebar";
import PlayVideo from "./components/core/viewcourse/PlayVideo";
import { useDispatch, useSelector } from "react-redux";
import InstructorDashboard from "./pages/InstructorDashboard";
import EditCourse from "./components/core/AddCourse/EditCourse";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catelogName" element={<Catalog />} />
        <Route path="course/:courseId" element={<CourseBuy />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/forgotpass"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        {/* ✅ New Update Password Route with token */}
        <Route
          path="/update-password/:token"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="/Aboutus"
          element={
              <About />

          }
        />

       {/* <Route element={
        <ProtectedRoute>
          <ViewCourse />
        </ProtectedRoute>
      }>

 
          

      </Route> */}


      <Route element = {<ProtectedRoute/>}>
      <Route element = {<ViewCourse/>}>
      <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<PlayVideo/>}
          />
      </Route>
      
      </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Dashboard />}>
            <Route path="/dashboard/my-profile" element={<Myprofile />} />
            <Route path="/dashboard/settings" element={<Setting />} />
            <Route
              path="/dashboard/enrolled-courses"
              element={<EnrolledCourses />}
            />
            <Route path="/dashboard/cart" element={<Cart />} />
            <Route path="/dashboard/my-courses" element={<MyCourse />} />
            <Route path="/dashboard/add-course" element={<AddCourse />} />
            <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
             <Route path="/dashboard/instructor" element={<InstructorDashboard/>} />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
