import {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAuthStatus } from "./useAuthStatus"

export const useAdminStatus = () => {
    const [Admin, setAdmin] = useState(false)
    const [checkingAdminStatus, setCheckingAdminStatus] = useState(true)
    const isMounted = useRef(true)
    const [loggedIn, checkingStatus] = useAuthStatus()

    useEffect(() => {
        if(isMounted) {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if(user.position === 'admin') {
                setAdmin(true)
            }
            if(!checkingStatus) {
            setCheckingAdminStatus(false) }
        })
    }

    return () => {
        isMounted.current = false
    }
    }, [isMounted])

  return { loggedIn, Admin, checkingAdminStatus }
}
