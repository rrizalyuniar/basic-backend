const express = require('express')
const router = express.Router()
const ProductRouter = require('../routes/products')
const CategoryRouter = require('../routes/categorys')
const CustomerRouter =require('../routes/customers')

router.use('/products', ProductRouter);
router.use('/categorys', CategoryRouter);
router.use('/customers', CustomerRouter);

module.exports = router