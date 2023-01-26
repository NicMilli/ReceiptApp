import axios from "axios"


const API_URL = "/api/invoice/"

const createInvoice = async(file) => {
    const response = await axios.post(API_URL + 'image', file)
    return response.data
}

const invoiceService = {
    createInvoice 
}
    
export default invoiceService