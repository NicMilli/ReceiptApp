import { useSelector, useDispatch } from "react-redux"
import { useState, useRef, useEffect} from "react"
import { useNavigate } from 'react-router-dom'
import { FaFileUpload } from "react-icons/fa"
import { createInvoice } from '../features/invoice/invoiceSlice'
import LoadingIcons from 'react-loading-icons'
import { toast } from 'react-toastify'


function CreateInvoice() {

    const [images, setImages] = useState(null);

    const { invoice, isLoading, isError, isSuccess, message } = useSelector((state) => state.invoice)
    const isMounted = useRef(true) ;
    const dispatch = useDispatch() ;
    const navigate = useNavigate() ; 

    const onChange = async(e) => {
        e.preventDefault()
        setImages(e.target.files[0] )
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        // run service that handles files and returns the total amount.
        
        dispatch(createInvoice(images)) 
    }

    useEffect(() => {
        if (isMounted) {
           
        }

        if(isError) {
            toast.error(message);
        } ;
        if(isSuccess && invoice) {
            toast.success('Succesfully uploaded your image! Routing to form page...') ;
            navigate('/create-invoice/invoice-form')
        } ;
        return() => {   
            isMounted.current = false ;
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, invoice, isLoading, isError, isSuccess, message])

    if(isLoading) {return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">
                    Uploading your image - Just a moment.
                </p>
                <LoadingIcons.Circles />
            </header> 
         </div>
    )}

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
                        // multiple
                        required />
                <button type='submit' className="submitButton">Submit</button>
            </form>
               
            </main>
        </div>
    )
}

export default CreateInvoice