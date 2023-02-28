import { useSelector, useDispatch } from "react-redux"
import { FaUserCircle } from 'react-icons/fa'
import { useEffect } from "react"

const Profile = () => {
    const { user } = useSelector((state) => state.auth) ;
    
    const dispatch = useDispatch() ;

    useEffect(() => {

    }, [])
    
    return (
        <div className='pageContainer'>
            <header>
                <p className="pageHeader">
                    {user.name}'s InvoiceMe Profile <FaUserCircle />
                </p>
            </header>
            <main>
            <div className="noteInput">
                <p>User since: {new Date(user.timestamp.seconds*1000).toDateString()}</p>
                <p>Number of invoices submitted: </p>
            </div>
            </main>
        </div>
    )
}

export default Profile