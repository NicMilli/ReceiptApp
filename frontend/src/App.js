import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import WithNav from "./hooks/WithNav";
import WithoutNav from "./hooks/WithoutNav";
import Landing from './pages/Landing';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignOut from './pages/SignOut';
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceForm from "./pages/InvoiceForm";
import ViewInvoices from "./pages/ViewInvoices";
import EditInvoices from "./pages/EditInvoices";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from './pages/NotFound';
import PrivateRoutes from "./components/PrivateRoutes";


function App() {
  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route element={<WithoutNav/>} >
            <Route path='/sign-up' element={<SignUp/>} />
            <Route path='/sign-in' element={<SignIn/>} />
            <Route path='/' element={<Landing/>} />
            <Route path='*' element={<NotFound />}/>
          </Route >

          <Route element={<WithNav />} >
            <Route element={<PrivateRoutes />} >
              <Route path='create-invoice' exact element={<CreateInvoice />} />
              <Route path='create-invoice/invoice-form' element={<InvoiceForm />} />
              <Route path='/employee-dashboard' element={<EmployeeDashboard />} /> 
              <Route path='/edit-invoices' element={<EditInvoices />} /> 
              <Route path='/view-invoices' element={<ViewInvoices />} /> 
              <Route path='/profile' element={<Profile />} />
            </Route>     
            <Route path='/forgot-password' element={<ForgotPassword/>} />
            <Route path='/sign-out' element={<SignOut />} />
          {/* <Route path='/upload-image' element={<UploadImage/>} />
          <Route path='/edit-image/:imageId' element={<EditImage/>} /> */}
          </Route >

        </Routes>
      </Router>

      <ToastContainer />
      </PersistGate>
      </Provider>
    </>
  );
}

export default App;
