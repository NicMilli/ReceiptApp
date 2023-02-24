import { useState, useEffect } from 'react'
import { FaReceipt, FaFileInvoice, FaFileUpload, FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { resetInvoice } from "../features/invoice/InvoiceSlice"
import { useDispatch } from 'react-redux'


function EmployeeDashboard() {
    var [date, setDate] = useState(new Date())
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetInvoice()) //setting other invoice state variables to original state when you go back to dashboard
        var timer = setInterval(() => setDate(new Date(), 10000))
        return clearInterval(timer)
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
                    View My Invoices  
                    <FaFileInvoice />
                </button>
                <button className="dashButton" onClick={() => navigate('/edit-invoices')} style={{"backgroundColor": "#007749"}}>
                    Edit My Invoices  
                    <FaEdit />
                </button>
            </main>
        </div>
    )
}

export default EmployeeDashboard