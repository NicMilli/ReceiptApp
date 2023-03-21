import { useState, useEffect } from 'react'
import { FaReceipt, FaFileInvoice, FaFileUpload, FaUsers } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { resetInvoice } from "../features/invoice/InvoiceSlice"
import { resetAddEmployee } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

function EmployeeDashboard() {
    var [date, setDate] = useState(new Date())
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetInvoice()); // Setting other invoice state variables to original state when you go back to dashboard
        dispatch(resetAddEmployee()); // Also reset the added user in state
        var timer = setInterval(() => setDate(new Date(), 10000));
        return clearInterval(timer);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
   
    return(
        <div className="pageContainer">
            <header className="pageHeader">
                <p>
                    Welcome back to InvoiceMe!
                    < FaReceipt />
                </p>
                
            </header>
            <h1>Today is {date.toLocaleDateString(undefined, options)}</h1>
            <main>    
                <p>
                    What would you like to do today?
                </p>
                <button className="dashButton" onClick={() => navigate('/create-invoice')}style={{"backgroundColor": "#FFB81C"}}>
                    Create New Invoice  
                    <FaFileUpload />
                </button> 
                <button className="dashButton" onClick={() => navigate('/view-invoices')} style={{"backgroundColor": "#E03C31"}}>
                    View & Edit Invoices  
                    <FaFileInvoice />
                </button>
                {user.position === "admin" &&
                    <button className="dashButton" onClick={() => navigate('/add-new-employee')} style={{"backgroundColor": "#007749"}}>
                     Add new employee
                    <FaUsers />
                </button>
                }
            </main>
        </div>
    )
}

export default EmployeeDashboard