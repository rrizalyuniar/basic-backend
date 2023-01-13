const express = require('express');
const router = express.Router();
const productController = require('../controller/products');
const {validate} = require('../middleware/common')

router.get("/", productController.getAllProduct);
// create
router.post("/", validate, productController.createProduct);
// memanggil data secara spesifik sesuai id
router.get("/:id", productController.getDetailProduct);
// update
router.put("/:id", validate, productController.updateProduct);
// delete
router.delete("/:id", productController.deleteProduct);

module.exports = router;