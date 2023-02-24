import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from "../components/OAuth"
import { useDispatch, useSelector } from "react-redux"
import { register, reset } from '../features/auth/authSlice'
import { resetInvoice } from "../features/invoice/InvoiceSlice"


function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        email: '',
        password: '',
    })
    const {name, position, email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const { user, isError, isSuccess, message } = useSelector((state) =>
    state.auth)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        dispatch(register(formData))
    }

    useEffect(() => {

        if(isError) {
            toast.error(message)
        } 
        if(isSuccess && user) {
            navigate('/employee-dashboard')
            toast.success(`Welcome to your InvoiceMe, ${name}`)
        }
        dispatch(reset())
        dispatch(resetInvoice())
     // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch, navigate, isError, isSuccess, user, message])

  return (
    <>
    <div className="pageContainer">
        <header>
            <p className="pageHeader">
                Sign Up
            </p>
        </header>

        <main>
            <form onSubmit={onSubmit}>
            <input type="text" 
                className="nameInput" 
                placeholder='Name'
                id='name'
                value={name}
                onChange={onChange}
                />

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
                    value={password}
                    onChange={onChange} />

                <img src={visibilityIcon} alt="show password" 
                className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)} />
                </div>

            <select 
                id="position" 
                placeholder="position"
                value={position}
                onChange={onChange}
                >
                <option value="select position">Select Position</option>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
            </select>

                <Link to='/forgot-password' className='forgotPasswordLink' >
                    Forgot Password
                </Link>

                <div className="SignUpBar">
                    <p className="signUpText">
                        Sign Up
                    </p>
                    <button className="signUpButton">
                        <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                    </button>
                </div>
            </form>

            <OAuth/>

            <Link to='/sign-in' className="registerLink">
                Sign In Instead
            </Link>
        </main>
        Add error message for password length!
    </div>

    </>
  )
}

export default SignUp