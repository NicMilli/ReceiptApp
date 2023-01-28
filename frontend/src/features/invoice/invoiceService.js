import axios from "axios"

const API_URL = "/api/invoice/"

const createInvoice = async(file) => {
  console.log('in service now', file)
    var formData = new FormData()
    formData.append('image', file)
    for (var fd of formData) {
      console.log('fd is', fd)
    }
    const response = await axios.post(API_URL + 'image', formData, 
    {
        headers: { 
          'Content-Type': 'multipart/form-data'
          //, getHeaders()?
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