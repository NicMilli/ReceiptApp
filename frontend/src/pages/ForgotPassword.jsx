import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { forgotPassword } from "../features/auth/authSlice"
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'


function ForgotPassword() {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const {forgotPasswordSent, message} = useSelector((state) => state.auth);
  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async(e) => {
    e.preventDefault();
    dispatch(forgotPassword({email: email}));
  }

  useEffect(() => {
    if(forgotPasswordSent) {
      toast.success('A temporary password has been sent to your email.')
    } else if(message) {
      toast.error(message)
    }
    console.log('hi')
  },[forgotPasswordSent, message])

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">
          Forgot Password
        </p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input type="email" className="emailInput" 
          placeholder='Email' id='email'
          value={email} onChange={onChange} />
          <Link to='/sign-in' className="forgotPasswordLink">
            Sign In
          </Link>

          <div className="signInBar">
            <div className="signInText">
              Send Reset Link
            </div>
            <button className="signInButton">
              <ArrowRightIcon fill='#ffffff' 
              width='34px' height='34px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword