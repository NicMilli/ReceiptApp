import { FaReceipt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function EmployeeDashboard() {
    nav = useNavigate()
    
    return(
        <div className="pageContainer">
            <header className="pageHeader">
                <p>
                    Welcome back to InvoiceMe!
                    < FaReceipt />
                </p>
            </header>

            <main>
                <p>
                    What would you like to do today?
                </p>
            </main>
        </div>
    )
}

export default EmployeeDashboard