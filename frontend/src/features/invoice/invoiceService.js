import axios from "axios"

const API_URL = "/api/invoice/"

const createInvoice = async(file) => {
    var formData = new FormData()
    formData.append('image', file);
    const response = await axios.post(API_URL + 'image', formData,
    {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    if (response.data) {
      localStorage.setItem('invoice', JSON.stringify(response.data)) //if image succesfully uploaded, store the URL, filename, and total amount.
    }
    return response.data
}

const uploadInvoiceForm = async(form) => {
  const response = await axios.post(API_URL + 'form', form)

  if (response.data) {
    localStorage.removeItem('invoice') // Once we've successfully uploaded an invoice to the database, go ahead and delete it from local storage
  }
  return response.data
}

const viewInvoices = async(dates) => {
  const response = await axios.get(API_URL + 'view', {
    headers: {
        info: JSON.stringify(dates)
      }
    });

  if (response.data) {
    localStorage.setItem('invoice', JSON.stringify(response.data)) ; // If there was no error, set the local storage to all the invoices that matched the query parameters
  } ;
  return response.data ;
} ;


const invoiceService = {
    createInvoice,
    uploadInvoiceForm,
    viewInvoices,
}

export default invoiceService