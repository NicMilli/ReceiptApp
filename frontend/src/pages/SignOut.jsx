import { FaReceipt, FaSmile } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function SignOut() {
    const navigate = useNavigate()

    return (
        <div className="pageContainer">
            <header className="pageHeader">
                You're now logged out of InvoiceMe
                <FaReceipt />
            </header>

            <main>
                <h1 style={{"padding":'0 4rem'}}>Have a great day! <FaSmile /></h1>
                <div style={{"padding":'8rem', "textAlign":"center"}}>
                    <p>Psssst... Didn't mean to log out?</p>
                    <button 
                        className="signOutButton" 
                        onClick={() => navigate('/sign-in')}> 
                        Log back in here 
                    </button>
                </div>
            </main>
        </div>
    )
}

export default SignOut