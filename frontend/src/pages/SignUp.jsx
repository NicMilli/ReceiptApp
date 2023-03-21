import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import LoadingIcons from 'react-loading-icons'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { useDispatch, useSelector } from "react-redux"
import { register, reset, accessRegister } from '../features/auth/authSlice'
import { resetInvoice } from "../features/invoice/InvoiceSlice"


function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    
    const [accessForm, setAccessForm] = useState({
        accessCode: '',
        accessEmail: '',
    })

    const {accessCode, accessEmail} = accessForm;

    const [formData, setFormData] = useState({
        name: '',
        position: '',
        email: accessEmail,
        password: '',
    })
    const {name, email, password} = formData;
    
    const [accessCodeAuthenticated, setAccessCodeAuthenticated] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, message, isLoading, newEmployeeInfo } = useSelector((state) =>
    state.auth)

    const onChange = (e) => {
        if ((e.target.id === 'accessEmail') || (e.target.id === 'accessCode')) {
            setAccessForm((prevState) => ({
                ...prevState,
                [e.target.id] : e.target.value
            }))
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value
            }))
        }
    }

    const onSubmitAccess = async (e) => {
        e.preventDefault();
        dispatch(accessRegister(accessForm));
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(register(formData));
    }

    useEffect(() => {
        dispatch(reset());
        dispatch(resetInvoice());
        if(isError) {
            toast.error(message);
        } 
        if(isSuccess && user) {
            navigate('/employee-dashboard');
            toast.success(`Welcome to your InvoiceMe, ${name}`);
        }
        if (newEmployeeInfo) {
            setAccessCodeAuthenticated(true);
            setFormData((prevState) => ({
                ...prevState,
                email: newEmployeeInfo.email,
                position: newEmployeeInfo.position
            }))
        }

     // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch, navigate, isError, isSuccess, user, message, newEmployeeInfo])


    if(isLoading) {return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">
                    Creating your account - Just a moment.
                </p>
                <LoadingIcons.Circles />
            </header> 
         </div>
    )}

  return (
    <>
    <div className="pageContainer">
        <header>
            <p className="pageHeader">
                Sign Up
            </p>
        </header>
        {!accessCodeAuthenticated &&
            <main>
                <form onSubmit={onSubmitAccess}>
                    <input type="email" 
                    className="emailInput" 
                    placeholder='Email'
                    id='accessEmail'
                    value={accessEmail}
                    onChange={onChange}
                    />
                    <input type="text" 
                    className="passwordInput" 
                    placeholder='Access Code'
                    id='accessCode'
                    value={accessCode}
                    onChange={onChange}
                    />
                    <button>Submit Information</button>
                </form>

            </main>
        }
        {accessCodeAuthenticated && 
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
                    readOnly
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

                {/* <select 
                    id="position" 
                    placeholder="position"
                    value={position}
                    onChange={onChange}
                    readOnly
                    >
                    <option value="select position">Select Position</option>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select> */}

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

            <Link to='/sign-in' className="registerLink">
                Sign In Instead
            </Link>
        </main>
        }
    </div>

    </>
  )
}

export default SignUp