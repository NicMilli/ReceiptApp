import { useState, useEffect } from 'react'
import { FaReceipt, FaFileInvoice, FaFileUpload, FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function EmployeeDashboard() {
    var [date, setDate] = useState(new Date())
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const nav = useNavigate()

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date(), 10000))
        return clearInterval(timer)
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
                <div className="dashButton" style={{"background-color": "#FFB81C"}}>
                    Create New Invoice <FaFileUpload />
                </div> 
                <div className="dashButton" style={{"background-color": "#E03C31"}}>
                    View Invoices <FaFileInvoice />
                </div>
                <div className="dashButton" style={{"background-color": "#007749"}}>
                    Edit Invoices <FaEdit />
                </div>
            </main>
        </div>
    )
}

export default EmployeeDashboard