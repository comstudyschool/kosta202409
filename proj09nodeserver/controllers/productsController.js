const ProductDAO = require('../models/productModel');

// 한 페이지에 여러 모듈 등록 가능
module.exports.getAllProducts = (req, res)=>{
    try {
        const products = ProductDAO.findAll();
        //res.send(productList);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({"message": "getAllProducts 오류!"});
    }
}

module.exports.getProductById = (req, res)=>{
    const id = req.params.id;
    console.log('>>> 특정 상품 조회 id:', id);
    try {
        const products = ProductDAO.findById(id);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({"message": "getProductById 오류!"});
    } 
}

module.exports.createProduct = (req, res)=>{
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        company: req.body.company,
        year: req.body.year
    }
    console.log(newProduct);
    try {
        ProductDAO.create(newProduct);
        const products = ProductDAO.findAll();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({"message": "getProductById 오류!"});
    } 
}

module.exports.modifyProductById = (req, res)=>{
    const id = req.body.id;
    console.log('특정 상품 수정 id: ', id);
    const updateProduct = {
        id: Number(req.body.id),
        name: req.body.name,
        price: Number(req.body.price),
        company: req.body.company,
        year: Number(req.body.year)
    };

    console.log("updateProduct:", updateProduct);

    try {
        ProductDAO.update(Number(id), updateProduct);
        const products = ProductDAO.findAll();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({"message": "getProductById 오류!"});
    } 
}

module.exports.deleteProductById = (req, res)=>{
    console.log('>>> 특정 상품 삭제 id:', req.params.id);
    try {
        ProductDAO.delete(req.params.id);
        const products = ProductDAO.findAll();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({"message": "getProductById 오류!"});
    } 
}
