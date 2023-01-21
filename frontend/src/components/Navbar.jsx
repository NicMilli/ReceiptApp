import { useNavigate, useLocation } from "react-router-dom"
import {FaSignOutAlt, FaBookmark, FaUserCircle} from 'react-icons/fa'

function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()

    const pathMatchRoute = (route) => {
        if(route === location.pathname) {
            return true
        }
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
                <li className="navbarListItem" onClick={() => navigate('/sign-out')}>
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