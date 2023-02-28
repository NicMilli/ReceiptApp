import { useSelector, useDispatch } from "react-redux"
import { useState, useMemo, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { uploadInvoiceForm } from "../features/invoice/InvoiceSlice"
import { FaFileUpload } from "react-icons/fa"
import { toast } from 'react-toastify'
import countryList from 'react-select-country-list'

function InvoiceForm() {
    var {invoice, isLoading, isError, message, isFormDone} = useSelector((state) => state.invoice) ;
    var {user} = useSelector((state) => state.auth)
    const navigate = useNavigate() ;

    if (!user) {
        navigate('/sign-in')
    }

    const [formData, setFormData] = useState({
        date: '',
        vendor: '',
        location: '',
        currency: '',
        amount: Number(invoice.total.replace('\r\n', '')),
        category: '',
        otherCategory:'',
        comment: '',
        url: invoice.url,
        name: user.name,
        email: user.email,
        invoiceId: invoice.filename
    })

    const dispatch = useDispatch()

    const options = useMemo(() => countryList().getData(), [])
    const countryLabels = options.map(option => option.label)
    var {date, vendor, location, currency, amount, category, otherCategory, comment} = formData

    const onChange = (e) => {
        e.preventDefault() ;
       
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value
        }))
    }

    const onSubmit = async(e) => {
        e.preventDefault() ;
        dispatch(uploadInvoiceForm(formData)) ;
    }
   
    useEffect(() => {

        if(isError) {
            toast.error(message);
        } ;
        if(isFormDone) { //once the invoice has been succesfully uploaded to firebase, it's removed from the state by employee dashboard
            toast.success('Succesfully uploaded your form! Routing to dashboard...') ;
            navigate('/employee-dashboard')
        } ;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoice, isLoading, isError, message, isFormDone]) ;

    return(
        <div className='pageContainer'>
        <header>
            <p className="pageHeader">
                Create New Invoice <FaFileUpload />
            </p>
        </header>
        <main>

        <form onSubmit={onSubmit}>
            <p>Date of purchase</p>
            <input type="date"
                className="calendarInput"
                placeholder='YYYY-MM-DD'
                id='date'
                value={date}
                onChange={onChange}
                required
            />

            <p>Location</p>
            <select id="location" 
                placeholder="location"
                value={location}
                onChange={onChange}
                required> 
                <option>Select Country</option>
                {
                countryLabels.map((label, key) => (
                <option key={key} value={label}>{label}</option>)
                )}
            </select>

            <p>Vendor</p>
            <input type="text"
                className="formInput"
                placeholder='Vendor'
                id='vendor'
                value={vendor}
                onChange={onChange}
                required
            />

            <p>Currency Code</p>
            <input type="text"
                className="formInput"
                placeholder='ZAR'
                id='currency'
                value={currency}
                onChange={onChange}
                required
            />

            <p>Amount</p>
            <input type="number"
                step="0.01"
                min="0"
                className="formInput"
                placeholder='Amount'
                id='amount'
                value={amount}
                onChange={onChange}
                required
            />

            <p>Category</p>
            <select
                id="category"
                placeholder="category"
                value={category}
                onChange={onChange}>
                <option>Select Category</option>
                <option value='rental'>Rental</option>
                <option value='airfare'>Airfare</option>
                <option value='lodging'>Lodging</option>
                <option value='meals'>Meals</option>
                <option value='parking & tolls'>Parking & Tolls</option>
                <option value='other'>Other</option>
                required
            </select>
            {category === 'other' ? (
                <input type="text"
                className="formInput"
                placeholder="Enter custom category"
                id='otherCategory'
                value={otherCategory}
                onChange={onChange}
                />
            ): <div></div> }

            <p>Name</p>
            <input type="text"
                className="formInput"
                placeholder='name'
                id='name'
                readOnly={true}
                value={user.name}
                required
            />

            <p>Email</p>
            <input type="text"
                className="formInput"
                placeholder='email'
                id='email'
                readOnly={true}
                value={user.email}
                required
            />
            <p>Comments</p>
            <input type="text"
                className="formInput"
                placeholder='Optional comments'
                id='comment'
                value={comment}
                onChange={onChange}
            />
            <button type='submit' className="submitButton">Submit</button>
        </form>
        </main>
    </div>
    )
}

export default InvoiceForm