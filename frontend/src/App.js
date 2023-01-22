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
import SignOut from './pages/SignOut';
import CreateInvoice from "./pages/CreateInvoice";
import ViewInvoices from "./pages/ViewInvoices";
import EditInvoices from "./pages/EditInvoices";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from './pages/NotFound';
// import UploadImage from "./pages/UploadImage";
// import EditImage from "./pages/EditImage";
// import Profile from "./pages/Profile";
// import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <>
      <Router>
        <Routes>
        {/* <Route path='/' element={<Landing/>} /> */}
          <Route element={<WithoutNav/>} >
          <Route path='/sign-up' element={<SignUp/>} />
            <Route path='/sign-in' element={<SignIn/>} />
            <Route path='/' element={<Landing/>} />
            <Route path='*' element={<NotFound />}/>
          </Route >

          <Route element={<WithNav />} >
            <Route path='/create-invoice' element={<CreateInvoice />} />
            <Route path='edit-invoices' element={<EditInvoices />} />
            <Route path='/view-invoices' element={<ViewInvoices />} />
            <Route path='/employee-dashboard' element={<EmployeeDashboard />} />
            <Route path='/forgot-password' element={<ForgotPassword/>} />
            <Route path='/sign-out' element={<SignOut />} />
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
