import axios from "axios"


const API_URL = "/api/invoice/"

const createInvoice = async(file) => {
    response = await axios.post(API_URL + 'image', file)
    return response.data
}

invoiceService = {
    createInvoice 
}
    
export default invoiceService