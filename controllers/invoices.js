const { format } = require("date-fns");
const { calculateDetails, processInvoices } = require("../utils/invoiceHelper");
const fetchData = require("../services/apiService");

const INVOICES_API_URL = "https://bever-aca-assignment.azurewebsites.net/invoices";
const INVOICELINES_API_URL = "https://bever-aca-assignment.azurewebsites.net/invoicelines";
const PRODUCTS_API_URL = "https://bever-aca-assignment.azurewebsites.net/products";

exports.getInvoices = async (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/?error=Please login first.");
    }

    try {
        const [invoicesData, invoiceLinesData, productsData] = await Promise.all([
            fetchData(INVOICES_API_URL),
            fetchData(INVOICELINES_API_URL),
            fetchData(PRODUCTS_API_URL)
        ]);

        const invoices = processInvoices(invoicesData, invoiceLinesData, productsData, req.session.user.UserId);


        res.render("invoices", {
            username: req.session.user.Name,
            invoices,
            details: null
        })

    } catch (error) {
        next({ status: 500, message: error.message });
    }
};

exports.getInvoiceLines = async (req, res, next) => {
    const { invoiceId } = req.params;

    try {
        const [invoicesData, invoiceLinesData, productsData] = await Promise.all([
            fetchData(INVOICES_API_URL),
            fetchData(INVOICELINES_API_URL),
            fetchData(PRODUCTS_API_URL)
        ]);

        const invoices = processInvoices(invoicesData, invoiceLinesData, productsData, req.session.user.UserId);



        const invoiceLines = invoiceLinesData.value.filter((line) => line.InvoiceId === invoiceId);

        const details = calculateDetails(invoiceLines, productsData);

        res.render("invoices", {
            username: req.session.user.Name,
            invoices,
            details: details
        })

    } catch (error) {
        next({ status: 500, message: error.message });
    }
};