import { utils, writeFileXLSX } from 'xlsx';

const FileExport = ({invoice, to, from}) => {

    const onClick = async(e) => {
        e.preventDefault(); 
        const exportData = invoice.map(({url, imageInvoiceId, timestamp, name, email, date, location, category, otherCategory, vendor, currency, amount, compensated}) => ({name, email, date, location, category, otherCategory, vendor, currency, amount, compensated}));
        const ws = utils.json_to_sheet(exportData);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Invoices");
        writeFileXLSX(wb, `Select Invoices for ${to} to ${from}.xlsx`)
    }
    return (
        <div>
            <button onClick={onClick} className="exportButton">Export invoices to excel</button>
        </div>
    )
}

export default FileExport