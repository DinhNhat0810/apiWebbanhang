const router = require("express").Router()
const verify = require("./verifyToken")
const CryptoJS = require("crypto-js")
const Product = require("../models/Product")

//CREATE
router.post("/", verify , async (req, res) => {
    if (req.user.isAdmin) {

        const { title, desc, price } = req.body
        const titleCheck =  await Product.findOne({ title: title })

        if (!title || !desc || !price) {
            return res.status(200).json({ status:"failure", message: "Vui lòng nhập đủ thông tin", payload : null })
        }

        if (titleCheck) {
            return res.status(200).json({ status:"failure", message: "Tên sản phẩm đã tồn tại", payload : null })
        }

        const newProduct = new Product(req.body)
        try {
            const savedProduct = await newProduct.save()
            return res.status(200).json( {status: "success", message: `Thêm sản phẩm ${title} thành công`, payload: savedProduct} )
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('Bạn không có quyền để tạo mới sản phẩm!')
    }

})

//UPDATE
router.put("/:id", verify , async (req, res) => {
    if (req.user.isAdmin) {

        try {
            const updateProduct = await Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.status(200).json(updateProduct)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('Bạn không có quyền để sửa sản phẩm!')
    }

})

//DELETE
router.delete("/:id", verify , async (req, res) => {
    if (req.user.isAdmin) {

        try {
            await Product.findByIdAndDelete(req.params.id)
            res.status(200).json('Sản phẩm đã được xóa...')
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('Bạn không có quyền xóa sản phẩm!')
    }

})

//GET PRODUCT
router.get("/find/:id" , async (req, res) => {

    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({ status: 'success',payload: product})
    } catch (err) {
        res.status(500).json({ status: "failure", message: "Sản phẩm không tồn tại", payload:null});
    }
})
// const product = await Product.find({title:{$regex:req.params.key}})

//SEARCH PRODUCT
router.get("/search/:key" , async (req, res) => {

    try {
        const searchValue = req.params.key
        const newStr = `${searchValue[0].toUpperCase()}${searchValue.slice(1)}`;

        const product = await Product.find(
            {
                "$or":[
                    {title:{$regex:newStr}},
                    {categories:{$regex:newStr}},
                ]
            }
        )
     
        
        res.status(200).json({ status: 'success', payload: product})
    } catch (err) {
        res.status(500).json({ status: "failure", message: "Sản phẩm không tồn tại", payload:null});
    }
})


//GET ALL PRODUCT
router.get("/", async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    
    try {
        let products

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1)
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                $in: [qCategory],
                },
            })
        } else {
            products = await Product.find().sort({ createdAt: -1 })
        }

        res.status(200).json( {status: "success", payload: products}) 
    } catch (err) {
        res.status(500).json(err)
    }
    

})




module.exports = router