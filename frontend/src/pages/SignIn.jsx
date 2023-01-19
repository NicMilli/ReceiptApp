import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
// import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from "../components/OAuth"
import { useDispatch, useSelector } from "react-redux"
import { login, reset } from '../features/auth/authSlice'


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
            navigate('/employee-dashboard')
        }

        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }
    // const onSubmit = async (e) =>{
    //     e.preventDefault()

    //     try {

    //     const auth = getAuth()

    //     const userCredential = await signInWithEmailAndPassword
    //     (auth, email, password)

    //     if(userCredential.user) {
    //         navigate('/employee-dashboard')
    //     }
        
    //     const name = auth.currentUser.displayName
    //     // const name = await userCredential.user.name
    //     toast.success(`Welcome back ${name}`)
    //     } catch (error) {
    //         console.log(error)
    //         toast.error('Incorrect user credentials')
    //     }
    // }

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

            <OAuth />

            {/* <Link to='/sign-up' className="registerLink">
                Sign Up Instead
            </Link> */}
        </main>
    </div>

    </>
  )
}

export default SignIn