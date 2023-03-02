import { useState, useEffect, memo } from "react"
import { FaFileInvoice } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { viewInvoices } from "../features/invoice/InvoiceSlice";
import InvoiceNote from "../components/InvoiceNote";
import LoadingIcons from 'react-loading-icons'
import { toast } from 'react-toastify'

function ViewInvoices() {
    const [dates, setDates] = useState({
        dateFrom: new Date(),
        dateTo: Date.now()
    }) ;
    const [view, setView] = useState(false)

    var {dateFrom, dateTo} = dates ;

    const { invoice, isViewsDone, isUpdateDone, isError, isLoading, message } = useSelector((state) => state.invoice) ;
    const { user } = useSelector((state) => state.auth) ;
    const dispatch = useDispatch() ;

    const onChange = (e) => {
        e.preventDefault() ;
        setDates((prevState) => ({
           ...prevState,
            [e.target.id] : e.target.value
        }))

    }

    const onSubmit = (e) => {
        e.preventDefault() ;
    
        if(dateFrom > dateTo) {
            toast.error('Please enter your dates in the correct order.') 
        }
        else if (dateFrom <= dateTo) {
            dispatch(viewInvoices({"dateFrom": new Date(dateFrom), "dateTo": new Date(dateTo), "email": user.email, "position": user.position}));
        }
    }

    useEffect(() => {
        console.log(message, isUpdateDone)
        if(isViewsDone && invoice) {
            setView(true);
        };
        if(isUpdateDone && message) {
            dispatch(viewInvoices({"dateFrom": new Date(dateFrom), "dateTo": new Date(dateTo), "email": user.email, "position": user.position}));
            toast.success(message);
            setView(true);
        }
        if(isError) {
            toast.error(message);
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isViewsDone, invoice, isError, message, dispatch, isUpdateDone])

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
                    View Invoices <FaFileInvoice />
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
                    <button type='submit' className="submitButton">Submit</button>
                </form>
                <div> {view && <p>Invoices found for query dates {new Date(dateFrom).toDateString()} to {new Date(dateTo).toDateString()} for {user.name}</p>}
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
