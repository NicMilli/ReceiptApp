import { useSelector, useDispatch } from "react-redux"
import { useState, useMemo, useRef, useEffect } from "react"
import countryList from 'react-select-country-list'
import { FaFileUpload } from "react-icons/fa"
import { createInvoice } from '../features/invoice/invoiceSlice'
import { toast } from 'react-toastify'
import FormData from 'form-data'


function CreateInvoice() {

    const [formData, setFormData] = useState({
        image: null,
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
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const options = useMemo(() => countryList().getData(), [])
    const countryLabels = options.map(option => option.label)
    const {image, date, vendor, location, currency, amount, category, otherCategory, comment} = formData

    const onChange = async(e) => {
        e.preventDefault()
     
        const res = await setFormData((prevData) => ({
            ...prevData, 
            image: e.target.files[0]
        }))
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        console.log('e.target sent from page is ', image)
        // run service that handles files and returns the total amount.
        const response = await dispatch(createInvoice(image)) 
        console.log(response)
    }

    useEffect(() => {
        if (isMounted) {
        }
        return() => {   
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, image])


    return(
        <div className='pageContainer'>
            <header>
                <p className="pageHeader">
                    Create New Invoice <FaFileUpload />
                </p>
            </header>
            <main>
            <form onSubmit={onSubmit}>
                <p>Image Upload</p> 
                    <input
                        className='formInputFile'
                        type='file'
                        id='image'
                        name='image'
                        onChange={onChange}
                        accept='.jpg,.png,.jpeg'
                        // enctype="multipart/form-data"
                        // multiple
                        required />
                <button type='submit' className="submitButton">Submit</button>
            </form>
                {/* <form onSubmit={onSubmit}>
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
            </form> */}
            </main>
        </div>
    )
}

export default CreateInvoice