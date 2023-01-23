import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkStatus } from "../features/auth/authSlice";

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)
    const isMounted = useRef(true)

    const {user, isError, isSuccess, message} = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        const checkMount = async() => { 
            await dispatch(checkStatus())

            if(isSuccess){
                setLoggedIn(true)
                setCheckingStatus(false)
            } else if (isError) {
                setLoggedIn(false)
                setCheckingStatus(false)
            }
            
        }
        
        if(isMounted) {
            checkMount()

    }
    return() => {
        isMounted.current = false
    }
           
    }, [isMounted, user, isSuccess, isError, message])
    return { loggedIn, checkingStatus }
}

