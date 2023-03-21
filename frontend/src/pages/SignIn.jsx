import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { useDispatch, useSelector } from "react-redux"
import { login, reset } from '../features/auth/authSlice'
import { resetInvoice } from "../features/invoice/InvoiceSlice"


function SignIn() {
    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formData 

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isError, isSuccess, message} = 
        useSelector((state) => state.auth)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }
    useEffect(() => {
            if(isError) {
                toast.error(message)
            }

            if(isSuccess && user) {
                toast.success(`Welcome Back ${user.name}`)
                navigate('/employee-dashboard')
            }

        dispatch(reset())
        dispatch(resetInvoice())
        
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if(isLoading) {return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">
                    Loading - Just a moment.
                </p>
            </header> 
         </div>
    )}

    return (
    <>
    <div className="pageContainer">
        <header>
            <p className="pageHeader">
                Welcome Back
            </p>
        </header>

        <main>
            <form onSubmit={onSubmit}>

                <input type="email" 
                className="emailInput" 
                placeholder='Email'
                id='email'
                value={email}
                onChange={onChange}
                />

                <div className="passwordInputDiv">
                    <input 
                    type={showPassword ? 'text' : 'password' }
                    className='passwordInput'
                    placeholder='Password'
                    id='password'
                    autoComplete="off"
                    value={password}
                    onChange={onChange} />

                <img src={visibilityIcon} alt="show password" 
                className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)} />
                </div>

                <Link to='/forgot-password' className='forgotPasswordLink' >
                    Forgot Password
                </Link>

                <div className="signInBar">
                    <p className="signInText">
                        Sign In
                    </p>
                    <button className="signInButton">
                        <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                    </button>
                </div>
            </form>

        </main>
    </div>

    </>
  )
}


export default SignIn