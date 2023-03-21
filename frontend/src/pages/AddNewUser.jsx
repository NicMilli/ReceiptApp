import { FaUsers } from "react-icons/fa";
import LoadingIcons from 'react-loading-icons';
import { useEffect, useState } from "react";
import { adminAddEmployee, resetAddEmployee } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


function AddNewEmployee() {
    const { addedEmployeeToken, user, isError, isLoading, message } = useSelector((state) => state.auth); 
    const [formData, setFormData] = useState({
        email:'',
        position:'',
        adminEmail: user.email
    });
    const { email, position } = formData;
    const [viewAddUser, setViewAddUser] = useState(!addedEmployeeToken);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(adminAddEmployee(formData));
        setViewAddUser(false);
    };

    const onChange = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value
        }))
    };

    const onAddAnotherEmployee = () => {
        dispatch(resetAddEmployee());
        setFormData('','');
        setViewAddUser(true)
    }

    useEffect(() => {
    
        if (addedEmployeeToken) {
            toast.success('New Employee added.');
        } 
        if (message) {
            toast.error(message);
            setViewAddUser(true);
            dispatch(resetAddEmployee());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addedEmployeeToken, isError, isLoading, message, viewAddUser])

    if(isLoading) {return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">
                    Adding your new employee - just a moment.
                </p>
                <LoadingIcons.Circles />
            </header> 
         </div>
    )}

    return (
        <div className='pageContainer'>
            <header>
                <p className="pageHeader">
                    Add New Employee <FaUsers />
                </p>
            </header>
            <main>
                {viewAddUser &&      
                <div>               
                    <p>The process of adding a new member to your organization's InvoiceMe group is simple, just enter their email and position.</p>
                    <p>Note: Admin positions have certain abilities that employees don't. An admin can view any employee's invoice, and can add new users to your organization. </p>
                    <form onSubmit={onSubmit}>
                        <div className="formLabel">New employee information</div>
                        <input 
                            type="text"
                            value={email}
                            id="email"
                            className="formInput"
                            placeholder="New employee's email"
                            onChange={onChange}
                        />
                        <select 
                            value={position}
                            id="position" 
                            placeholder="position"
                            className="formInput"
                            onChange={onChange}
                            >
                            <option value="select position">Select Position</option>
                            <option value="employee">Employee</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button style={{"margin":"1rem"}} type='submit'>Submit</button>
                    </form>
                </div>}
                {!viewAddUser && 
                <div>
                    <p>Thank you for adding your new employee to InvoiceMe. Their personal sign-up token is</p>
                        <div className="newUserContainer">
                            <p>{addedEmployeeToken}</p>
                            
                        </div>
                    <p>They can now use this token to sign up with InvoiceMe. Please note - the sign-up token is only valid for 2 hours.</p>
                    <button onClick={onAddAnotherEmployee}>Add another employee</button>
                </div>
                }
            </main>
        </div>
    )
}

export default AddNewEmployee