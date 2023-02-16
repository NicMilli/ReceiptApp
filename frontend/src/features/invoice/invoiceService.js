import axios from "axios"

const API_URL = "/api/invoice/"

const createInvoice = async(file) => {

    var formData = new FormData()
    formData.append('image', file);
;
    const response = await axios.post(API_URL + 'image', formData, 
    {
        headers: { 
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    if (response.data) {
    localStorage.setItem('invoice', JSON.stringify(response.data))
    }
    return response.data
}

const invoiceService = {
    createInvoice 
}

export default invoiceService