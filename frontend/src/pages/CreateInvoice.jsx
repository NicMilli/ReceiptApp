import { useSelector } from "react-redux"
import { useState, useMemo, useEffect } from "react"
import countryList from 'react-select-country-list'
import { useRef } from "react"
import { FaFileUpload } from "react-icons/fa"

function CreateInvoice() {

    const [formData, setFormData] = useState({
        image: {},
        date: '',
        vendor: '',
        location: '',
        currency: '',
        amount: 0,
        category: '',
        otherCategory:'',
        comment: ''
    })
    const isMounted = useRef(true)
    const options = useMemo(() => countryList().getData(), [])

    const countryLabels = options.map(option => option.label)
    const { image, date, vendor, location, currency, amount, category, otherCategory, comment} = formData

    const {user} = useSelector((state) => state.auth)
   
    const onChange = (e) => {
        e.preventDefault()
        
        setFormData((prevState) => ({...prevState, 
           [ e.target.id] : e.target.value}))
    }

    const onSubmit = (e) => {
        if(e.target.file) {
            // run auth service that handles files and returns the total amount.
        }
    }
    
    useEffect(() => {
        if (isMounted) {
        }
        
        return() => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return(
        <div className='pageContainer'>
            <header>
                <p className="pageHeader">
                    Create Invoice
                </p>
            </header>
            <main>
            <form onSubmit={onSubmit}>
                <p>Image Upload</p> 
                    <input
                        className='formInputFile'
                        type='file'
                        id='image'
                        onChange={onChange}
                        max='6'
                        accept='.jpg,.png,.jpeg'
                        // multiple
                        required />
            </form>
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
                    <input type="decimal" 
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
            </form>

            </main>

        </div>
    )
}

export default CreateInvoice