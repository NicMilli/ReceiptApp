import { useState, useEffect, useMemo } from "react"
import { FaFileInvoice } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { viewInvoices } from "../features/invoice/InvoiceSlice";
import InvoiceNote from "../components/InvoiceNote";
import LoadingIcons from 'react-loading-icons'
import { toast } from 'react-toastify'
import { getEmployees } from "../features/auth/authSlice";

function ViewInvoices() {
    const dispatch = useDispatch() ;
    const { invoice, isViewsDone, isUpdateDone, isError, isLoading, message } = useSelector((state) => state.invoice) ;
    const { user, employees } = useSelector((state) => state.auth) ;

    const [searchParameters, setSearchParameters] = useState({
        dateFrom: new Date(),
        dateTo: Date.now(),
        employeeList: []
    }) ;
    let {dateFrom, dateTo, employeeList} = searchParameters ;

    const [view, setView] = useState(false)
   
    const onChange = (e) => {
        e.preventDefault();
        setSearchParameters((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value
        }))

    }

    const onCheck = (e) => {
        let newArray = [...employeeList, e.target.value];

        if (employeeList.includes(e.target.value)) {
            newArray = newArray.filter(person => person !== e.target.value); // this is effectively unchecking the box and removing person from array
        } ;
        setSearchParameters((prevState) => ({
            ...prevState,
            employeeList : newArray
        }))

    } ;

    const onSubmit = (e) => {
        e.preventDefault();
        if(dateFrom > dateTo) {
            toast.error('Please enter your dates in the correct order.');
        }
        else if (dateFrom <= dateTo) {
            dispatch(viewInvoices({"dateFrom": new Date(dateFrom), "dateTo": new Date(dateTo), "employeeList": employeeList, "email": user.email, "position": user.position}));
        }

    }

    useEffect(() => {
        dispatch(getEmployees());
        if(isViewsDone && invoice) {
            setView(true);
        };
        if(isUpdateDone && message) {
            dispatch(viewInvoices({"dateFrom": new Date(dateFrom), "dateTo": new Date(dateTo), "employeeList": employeeList, "email": user.email, "position": user.position}));
            toast.success(message);
            setView(true);
        }
        if(isError) {
            toast.error(message);
        }

         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isViewsDone, invoice, isError, message, isUpdateDone])

    if(isLoading) {return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">
                    Retrieving your invoices - Just a moment.
                </p>
                <LoadingIcons.Circles />
            </header> 
         </div>
    )};

    return(
        <div className='pageContainer'>
            <header>
                <p className="pageHeader">
                    View & Edit Invoices <FaFileInvoice />
                </p>
            </header>
            <main>
                <p>Select what date range you would like to view your invoices for.</p>
                <p>Note: Dates should indicate purchase/service date - not the date that the invoice was submitted.</p>
                <form onSubmit={onSubmit}>
                    <p>From</p>
                        <input type="date"
                            className="calendarInput"
                            placeholder='YYYY-MM-DD'
                            id='dateFrom'
                            value={dateFrom}
                            onChange={onChange}
                            required
                        />
                    <p>To</p>
                    <input type="date"
                            className="calendarInput"
                            placeholder='YYYY-MM-DD'
                            id='dateTo'
                            value={dateTo}
                            onChange={onChange}
                            required
                        />
                        {user.position === "admin" && 
                        <div>
                            {employees.length !== 0 && 
                                <fieldset>
                                    <legend>Select all employees to view invoices from.</legend>
                                {employees.map((item, key)=> (
                                    
                                    <div key={key}>
                                        <input onChange={onCheck} type="checkbox" id="employeeList" name={item} value={item}/>
                                        <label htmlFor={employeeList}>{item}</label>
                                    </div>
                                ))}
                                </fieldset>
                            }
                        </div>
                
                        }
                    <button type='submit' className="submitButton">Submit</button>
                </form>
                <div> {view && <p>Invoices found for query dates {new Date(dateFrom).toDateString()} to {new Date(dateTo).toDateString()} for {employeeList.join(', ')}</p>}
                    {view && invoice.map((item, id) => ( 
                        <InvoiceNote item={item} key={id} />
                    ))
                    } 
               </div>
            </main>
        </div>
    )
}

export default ViewInvoices
