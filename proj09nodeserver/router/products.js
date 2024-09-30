const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, deleteProductById, modifyProductById } 
            = require('../controllers/productsController');

router.route('/products').get(getAllProducts)
                        .post(createProduct);

router.route('/products/:id').get(getProductById)
                    .post(modifyProductById)
                    .delete(deleteProductById);

// nodejs 모듈로 등록 (app.js에서 미들웨어로 사용)
module.exports = router;