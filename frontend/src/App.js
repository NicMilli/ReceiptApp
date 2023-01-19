import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import WithNav from "./hooks/WithNav";
import WithoutNav from "./hooks/WithoutNav";
import Landing from './pages/Landing';
import EmployeeDashboard from './pages/EmployeeDashboard';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import ForgotPassword from "./pages/ForgotPassword";
// import UploadImage from "./pages/UploadImage";
// import EditImage from "./pages/EditImage";
// import Profile from "./pages/Profile";
// import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={<Landing/>} />
          <Route element={<WithoutNav/>} >
            
            <Route path='/sign-up' element={<PrivateRouteAdmin />}>
              <Route path='/sign-up' element={<SignUp/>} />
            </Route>
            
            <Route path='/sign-in' element={<SignIn/>} />
          </Route >

          <Route element={<WithNav />} >
            <Route path='/employee-dashboard' element={<EmployeeDashboard />} />
            <Route path='/forgot-password' element={<ForgotPassword/>} />
          {/* <Route path='/upload-image' element={<UploadImage/>} />
          <Route path='/edit-image/:imageId' element={<EditImage/>} /> */}
          </Route >

        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
