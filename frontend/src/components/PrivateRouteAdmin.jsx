import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"
import Spinner from "./Spinner"

const PrivateRouteAdmin = () => {
    const {Admin, checkingAdminStatus} = useAuthStatus()

    if(checkingAdminStatus) {
        return <Spinner />
    }

  return (
    Admin ? <Outlet /> : <Navigate to='/sign-in' />
  )
}

export default PrivateRouteAdmin