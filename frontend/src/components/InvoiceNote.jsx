import { FaEdit } from "react-icons/fa";


const InvoiceNote = ({item}, {key}) => {

    return (
        <div className="invoiceNoteContainer" key={key}>
            <header className="invoiceNoteHeader">{new Date(item.date.seconds*1000).toDateString()}</header>
                <div className="noteInput">
                    <p>Category: {item.category}</p>
                    <p>Location: {item.location}</p>
                    <p>Vendor: {item.vendor}</p>
                    <p>Currency: {item.currency}</p>
                    <p>Amount: {item.amount}</p>
                    <p>Compensated: {item.compensated.toString()}</p>
                    <button className="invoiceNoteEdit"><FaEdit/>Edit Invoice</button>
                </div>
                
        </div>
    )
}

export default InvoiceNote