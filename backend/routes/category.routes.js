const router = require("express").Router();

const categoryController = require('../controller/category.controller')

router.post('/create', categoryController.createCategory)

router.get('/cashflow', categoryController.calculateIncomeFlow)

router.get('/sample-data', categoryController.getTableData)

router.get('/pie-chart', categoryController.getData)

module.exports = router;