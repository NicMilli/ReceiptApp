import { useNavigate, useLocation } from "react-router-dom"
import { FaSignOutAlt, FaBookmark, FaUserCircle} from 'react-icons/fa'
import { useDispatch } from "react-redux"
import { logout, reset } from "../features/auth/authSlice"
import { resetInvoice } from "../features/invoice/InvoiceSlice"

import { toast } from "react-toastify"

function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const pathMatchRoute = (route) => {
        if(route === location.pathname) {
            return true
        }
    }

    const clickLogout = () => {
        dispatch(logout())
        dispatch(reset())
        dispatch(resetInvoice())
        toast.success('Signout Successful')
        navigate('/sign-out')
    }

  return (
    <footer className='navbar'>
        <nav className='navbarNav'>
            <ul className="navbarListItems">
                <li className="navbarListItem" onClick={() => navigate('/employee-dashboard')}>
                    <FaBookmark color={pathMatchRoute('/employee-dashboard') ? '#2c2c2c' : '#8f8f8f'} size='36px' />
                    <p className={pathMatchRoute('/employee-dashboard') 
                    ? 'navbarListItemNameActive' 
                    : 'navbarListItemName'}>
                        Dashboard
                    </p>
                </li>
                <li className="navbarListItem" onClick={() => navigate('/profile')}>
                    <FaUserCircle color={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'} size='36px' />
                    <p className={pathMatchRoute('/profile') 
                    ? 'navbarListItemNameActive' 
                    : 'navbarListItemName'}>
                        Profile
                    </p>
                </li>
                <li className="navbarListItem" onClick={clickLogout}>
                    <FaSignOutAlt color={pathMatchRoute('/sign-out') ? '#2c2c2c' : '#8f8f8f'} size='36px' />
                    <p className={pathMatchRoute('/sign-out') 
                    ? 'navbarListItemNameActive' 
                    : 'navbarListItemName'}>
                        Sign Out
                    </p>
                </li>
            </ul>
        </nav>
    </footer>
  )
}

export default Navbar