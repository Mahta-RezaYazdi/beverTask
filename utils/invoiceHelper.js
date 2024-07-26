const { format } = require("date-fns");

const calculateDetails = (invoiceLines, productsData) => {
    return invoiceLines.map((line) => {
        const product = productsData.value.find((product) => product.ProductId === line.ProductId);
        const totalAmount = line.Quantity * product.Price;
        return {
            product: product.Name,
            pricePerUnit: product.Price,
            quantity: line.Quantity,
            totalAmount
        }
    })
};

const processInvoices = (invoicesData, invoiceLinesData, productsData, userId) => {
    return invoicesData.value
        .filter((invoice) => invoice.UserId === userId)
        .map((invoice) => {
            const date = new Date(invoice.PaidDate);
            const simpleDate = format(date, "yyyy-MM-dd");

            const invoiceLines = invoiceLinesData.value.filter((line) => line.InvoiceId === invoice.InvoiceId);
            const details = calculateDetails(invoiceLines, productsData);

            const totalAmount = details.reduce((sum, detail) => sum + detail.totalAmount, 0);

            return { ...invoice, PaidDate: simpleDate, totalAmount };
        });

};

module.exports = { calculateDetails, processInvoices };