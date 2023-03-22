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
  const response = await axios.post(API_URL + 'form', form);

  if (response.data) {
    localStorage.removeItem('invoice') // Once we've successfully uploaded an invoice to the database, go ahead and delete it from local storage
  }
  return response.data
}

const viewInvoices = async(info) => {

  const response = await axios.get(API_URL + 'view', {
    headers: {
        info: JSON.stringify(info)
      }
    });
    
  if (response.data) {
    localStorage.setItem('invoice', JSON.stringify(response.data)) ; // If there was no error, set the local storage to all the invoices that matched the query parameters
  };
  return response.data;
};

const updateInvoice = async(invoice) => {
  console.log(invoice)
  const response = await axios.put(API_URL + '/update-invoice', invoice);
  return response.data;
};

const markAsCompensated = async(invoice) => {
  const response = await axios.put(API_URL + '/mark-as-compensated', invoice);
  return response.data;
};


const invoiceService = {
    createInvoice,
    uploadInvoiceForm,
    viewInvoices,
    updateInvoice,
    markAsCompensated
}

export default invoiceService