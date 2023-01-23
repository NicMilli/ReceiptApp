import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"

const PrivateRoutes = () => {

  const {checkingStatus, loggedIn} = useAuthStatus()
  
  if(checkingStatus) {
      return <div className="pageContainer">
        <header>
          <p>
            Confirming verifications...
          </p>
        </header>
      </div>
  }

  return (
    loggedIn ? <Outlet /> : <Navigate to='/sign-in'/>
  )
}

export default PrivateRoutes