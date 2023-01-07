import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
// import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
// import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
// import UploadImage from "./pages/UploadImage";
// import EditImage from "./pages/EditImage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={<Landing/>} /> */}
          {/* <Route path='/profile' element={<PrivateRoute />} >
            <Route path='/profile' element={<Profile/>} />
          </Route> */}
          <Route path='/sign-in' element={<SignIn/>} />
          <Route path='/sign-up' element={<PrivateRouteAdmin />} >
            <Route path='/sign-up' element={<SignUp/>} />
          </Route>
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          {/* <Route path='/upload-image' element={<UploadImage/>} />
          <Route path='/edit-image/:imageId' element={<EditImage/>} /> */}
        </Routes>
        <Navbar/>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
