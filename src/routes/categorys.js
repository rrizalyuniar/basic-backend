const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categorys');
const {validate} = require('../middleware/common')

router.get("/", categoryController.getAllCategory);
// create
router.post("/", validate,categoryController.createCategory);
// memanggil data secara spesifik sesuai id
router.get("/:id", categoryController.getDetailCategory);
// update
router.put("/:id", validate,categoryController.updateCategory);
// delete
router.delete("/:id", categoryController.deleteCategory);

module.exports = router