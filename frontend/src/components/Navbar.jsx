import { useNavigate, useLocation } from "react-router-dom"
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'
import {FaArrowAltCircleUp, FaEdit, FaBookmark, FaUserCircle} from 'react-icons/fa'

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
                {/* <li className="navbarListItem" onClick={() => navigate('/upload-image')}>
                    <FaArrowAltCircleUp color={pathMatchRoute('/upload-image') ? '#2c2c2c' : '#8f8f8f'} 
                    size='36px' />
                    <p className={pathMatchRoute('/') 
                    ? 'navbarListItemNameActive' 
                    : 'navbarListItemName'}>
                        Upload Image
                    </p>
                </li> */}
                {/* <li className="navbarListItem" onClick={() => navigate('/edit-image')}>
                    <FaEdit color={pathMatchRoute('/edit-image') ? '#2c2c2c' : '#8f8f8f'} size='36px' />
                    <p className={pathMatchRoute('/edit-image') 
                    ? 'navbarListItemNameActive' 
                    : 'navbarListItemName'}>
                        View/Edit Images
                    </p>
                </li> */}
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
            </ul>
        </nav>
    </footer>
  )
}

export default Navbar