import { useSelector } from "react-redux"
import { useState } from "react"

function CreateInvoice() {

    const [formData, setFormData] = useState({
        date: '',
        vendor: '',
        location: '',
        currency: 'ZAR'
    })

    const {date, vendor, location, currency} = formData
    const {user} = useSelector((state) => state.auth)

    const onChange = (e) => {
        e.preventDefault()
        
        setFormData([...formData, 
            formData[e.target.id] = e.target.value])
    }

    const onSubmit = () => {

    }
    return(
        <div className='pageContainer'>
            <header>
                <p className="pageHeader">
                    Create Invoice
                </p>
            </header>
            <main>
            <form onSubmit={onSubmit}>

            <input type="date" 
                placeholder='YYYY-MM-DD'
                id='date'
                value={date}
                onChange={onChange}
            />

            <input type="text" 
                placeholder='Vendor'
                id='vendor'
                value={vendor}
                onChange={onChange}
            />

            <input type="text" 
                placeholder='Location'
                id='location'
                value={location}
                onChange={onChange}
            />

            <input type="text" 
                placeholder='Currency'
                id='currency'
                value={currency}
                onChange={onChange}
            />

            </form>
            </main>

        </div>
    )
}

export default CreateInvoice