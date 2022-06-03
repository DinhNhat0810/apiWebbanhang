const router = require("express").Router()
const verify = require("./verifyToken")
const CryptoJS = require("crypto-js")
const Cart = require("../models/Cart")

//CREATE
router.post("/", verify , async (req, res) => {
    if (req.user._id === req.params.id || req.user.isAdmin) {
        const newCart = new Cart(req.body)
        try {
            const savedCart = await newCart.save()
            res.status(200).json({ status: 'success',massage: "Tạo giỏ hàng thành công!" , payload: savedCart })

        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You can not create!')
    }
})

//UPDATE
router.put("/:id", verify , async (req, res) => {
    if (req.user._id === req.params.id || req.user.isAdmin) {
        try {
            const updateCart = await Cart.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.status(200).json({ status: 'success',massage: "Cập nhật giỏ hàng thành công!" , payload: updateCart })

        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You can not update cart!')
    }
})

//DELETE
router.delete("/:id", verify , async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await Cart.findByIdAndDelete(req.params.id)
            res.status(200).json({ status: 'success',massage: "Giỏ hàng đã được xóa!" , payload: null })
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You can not delete cart!')
    }
})

//GET CART
router.get("/find/:userId", verify , async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            const cart = await Cart.findOne({ userId: req.params.userId });
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You can not get cart!')
    }
})

//GET ALL CART
router.get("/", verify , async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            const carts = await Cart.find()
            res.status(200).json(carts)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You can not get all cart!')
    }
    

})


module.exports = router