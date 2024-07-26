const express = require("express");

const invoicesController = require("../controllers/invoices")

const router = express.Router();

router.get("/invoices", invoicesController.getInvoices);
router.get("/invoice-details/:invoiceId", invoicesController.getInvoiceLines);

module.exports = router;