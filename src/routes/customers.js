const express = require('express');
const router = express.Router();
const customerController = require('../controller/customers');

router.get("/", customerController.getAllCustomer);
// create
router.post("/", customerController.createCustomer);
// memanggil data secara spesifik sesuai id
router.get("/:id", customerController.getDetailCustomer);
// update
router.put("/:id", customerController.updateCustomer);
// delete
router.delete("/:id", customerController.deleteCustomer);

module.exports = router