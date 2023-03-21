import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { FaUserCircle } from 'react-icons/fa'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import { viewInvoices } from "../features/invoice/InvoiceSlice"
import { sendQuestion, updateUser } from "../features/auth/authSlice"
import { toast } from "react-toastify"

const Profile = () => {
    const { user, isError, message, isQuestionDone } = useSelector((state) => state.auth) ;
    const { invoice, isUpdateDone } = useSelector((state) => state.invoice) ;

    const [questionForm, setQuestionForm] = useState('') ;
    const [updateProfileForm, setUpdateProfileForm] = useState({
        email: user.email,
        name: user.name
    }) ;
    const [updateProfile, setUpdateProfile] = useState(false);
    
    const {email, name} = updateProfileForm ;

    const dispatch = useDispatch() ;

    const onChange = (e) => {
        e.preventDefault() ;
        setQuestionForm(e.target.value)
    } ;

    const onUpdate = (e) => {
        e.preventDefault() ;
        setUpdateProfileForm((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault() ;
        dispatch(sendQuestion({"email": user.email, "question": questionForm}))
    } ;

    const onSubmitUpdate = (e) => {
        e.preventDefault() ;
        dispatch(updateUser(updateProfileForm)) ;
        setUpdateProfile(false) ;
    }
    
    useEffect(() => {

        if(isQuestionDone) {
            toast.success("Great! We'll look at your question and get back to you soon.")
        }
        if(isUpdateDone) {
            toast.success("We've succesfully updated your user on file.")
        }
        // dispatch(viewInvoices({"dateFrom": new Date(user.timestamp.seconds*1000), "dateTo": new Date(), "email": user.email}));
        dispatch(viewInvoices({"dateFrom": 0, "dateTo": new Date(), "email": user.email}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message, isQuestionDone, updateProfile, isUpdateDone])

    return (
        <div className='pageContainer'>
            <header>
                <p className="pageHeader">
                    {user.name}'s InvoiceMe Profile <FaUserCircle />
                </p>
            </header>

            <main>
            <div>
                <p>User since: {new Date(user.timestamp.seconds*1000).toDateString()}</p>
                {!(Object.keys(invoice).length === 0) && <div><p>Number of invoices submitted: {invoice.length}</p>
                <p>Number of outstanding invoices: {invoice.filter(item => item.compensated === false).length} </p></div>}
            </div>
            {!updateProfile && 
                <div className="inlineDiv">
                    <p className="formLabel" > Need to update your information?</p>
                    <button className="signInButton" onClick={() => setUpdateProfile(true)}>
                        <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                    </button>
                </div>}

            {updateProfile && <div className="pageContainer">
                <div className="formLabel">Adjust the information you need to update and submit.</div>
                <form style={{"margin": "1rem 1rem 0 0", "padding": "1rem "}} onSubmit={onSubmitUpdate}>
                    <input type="email" 
                    className="emailInput" 
                    placeholder='Email'
                    id='email'
                    value={email}
                    onChange={onUpdate}
                    />
                    <input type="text" 
                    className="nameInput" 
                    placeholder='Name'
                    id='name'
                    value={name}
                    onChange={onUpdate}
                    />
                    <button type='submit'>Submit</button>
                </form>
            </div>}

            <div className="formLabel">Need some help? Send your question to InvoiceMe in the form below and we'll reach out to you.</div>
            <form onSubmit={onSubmit}>
                <textarea className="questionInput"
                type="textarea" 
                placeholder="Submit your questions here." 
                id="questionForm"
                value={questionForm} 
                rows={5}
                onChange={onChange} 
                /> 
                <button style={{"margin":"1rem"}} type='submit'>Submit</button>
            </form>
            </main>
        </div>
    )
}

export default Profile