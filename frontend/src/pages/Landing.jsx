import { FaReceipt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate()

    const onClick = async (e) => {
        navigate('/sign-in')
    }

    return (
    <div className="pageContainer">
        <header>
            <p className="pageHeader">
                Welcome to InvoiceMe!         
                <FaReceipt />
            </p>
        </header>

        <main>
            <p>
                Are you an..
            </p>

            <button className="landing" onClick={() => onClick()}>
                Admin
            </button>
            <button className="landing" onClick={() => onClick()}>
                Employee
            </button>


        </main>
    </div>
    )
};

export default Landing

