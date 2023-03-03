import { useEffect, useState, useMemo } from "react";
import { updateInvoice, markAsCompensated } from "../features/invoice/InvoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaClipboardCheck } from "react-icons/fa";
import countryList from 'react-select-country-list'


const InvoiceNote = ({item}, {key}) => {
    const {user} = useSelector((state) => state.auth);

    const options = useMemo(() => countryList().getData(), []);
    const countryLabels = options.map(option => option.label);

    const [formData, setFormData] = useState({
        date: '',
        vendor: item.vendor,
        location: item.location,
        currency: item.currency,
        amount: item.amount,
        category: item.category,
        otherCategory: item.otherCategory,
        comment: item.comment,
        url: item.url,
        name: item.name,
        email: user.email,
        imageInvoiceId: item.imageInvoiceId
    });
    const [editInvoice, setEditInvoice] = useState(false);

    var {date, vendor, location, currency, amount, category, otherCategory, comment, name, imageInvoiceId} = formData;

    const onChange = (e) => {
        e.preventDefault();
       
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value
        }));
    };


    const dispatch = useDispatch();

    const onClick = (e) => {
        e.preventDefault();
        setEditInvoice(true);
    };

    const onClickCompensate = (e) => {
        e.preventDefault();
        dispatch(markAsCompensated({"imageInvoiceId": imageInvoiceId}));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateInvoice(formData));
        setEditInvoice(false);
    };

    useEffect(() => {

    }, [dispatch]);

    return (
        <div className="invoiceNoteContainer" key={key}>

            <header className="invoiceNoteHeader">{new Date(item.date.seconds*1000).toDateString()}</header>

                {!editInvoice &&                 
                    <div className="noteInput">
                        <p>Category: {item.category}</p>
                        <p>Location: {item.location}</p>
                        <p>Vendor: {item.vendor}</p>
                        <p>Currency: {item.currency}</p>
                        <p>Amount: {item.amount}</p>
                        <p>Compensated: {item.compensated.toString()}</p>
                        <p>Name: {name}</p>
                    <div className="invoiceNoteButtons">
                        <button className="invoiceNoteEdit" onClick={onClick}><FaEdit/>Edit Invoice</button>
                        {!item.compensated && user.position === "admin" &&
                            <button className="invoiceNoteEdit" onClick={onClickCompensate}><FaClipboardCheck/>Mark as Compensated</button>
                        }
                        {item.compensated && user.position === "admin" && 
                            <button className="invoiceNoteEdit">Invoice already marked compensated.</button>
                        }
                    </div>
                    
                </div>}

                {editInvoice &&
                    <form onSubmit={onSubmit}>

                    <p>Date of purchase</p>
                    <input type="date"
                        // className="calendarInput"
                        className="formUpdate"
                        placeholder='YYYY-MM-DD'
                        id='date'
                        value={date}
                        onChange={onChange}
                        required
                    />
        
                    <p>Location</p>
                    <select id="location" 
                        placeholder="location"
                        className="formUpdate"
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
                        className="formUpdate"
                        placeholder='Vendor'
                        id='vendor'
                        value={vendor}
                        onChange={onChange}
                        required
                    />
        
                    <p>Currency Code</p>
                    <input type="text"
                        className="formUpdate"
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
                        className="formUpdate"
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
                        className="formUpdate"
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
                        className="formUpdate"
                        placeholder="Enter custom category"
                        id='otherCategory'
                        value={otherCategory}
                        onChange={onChange}
                        />
                    ): <div></div> }
        
                    <p>Name</p>
                    <input type="text"
                        className="formUpdate"
                        placeholder='name'
                        id='name'
                        readOnly={true}
                        value={user.name}
                        required
                    />
        
                    <p>Email</p>
                    <input type="text"
                        className="formUpdate"
                        placeholder='email'
                        id='email'
                        readOnly={true}
                        value={user.email}
                        required
                    />
                    <p>Comments</p>
                    <input type="text"
                        className="formUpdate"
                        placeholder='Optional comments'
                        id='comment'
                        value={comment}
                        onChange={onChange}
                    />
                    <button type='submit' className="submitButton">Update</button>
                    </form>
                }
        </div> 
    )
}

export default InvoiceNote