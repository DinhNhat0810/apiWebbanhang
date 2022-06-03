const router = require("express").Router()
const verify = require("./verifyToken")
const CryptoJS = require("crypto-js")
const Order = require("../models/Order")

//CREATE
router.post("/", verify , async (req, res) => {
    if (req.user._id === req.params.id || req.user.isAdmin) {

        const newOrder = new Order(req.body);
        try {
            const savedOrder = await newOrder.save()
            res.status(200).json(savedOrder)
            res.status(200).json({ status: 'success',massage: "Đặt hàng thành công!" , payload: savedOrder })

        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You can not create!')
    }
})

//UPDATE
router.put("/:id", verify , async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {$set: req.body }, { new: true })
            res.status(200).json({ status: 'success',massage: "Cập nhật thành công!" , payload: updatedOrder })

        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You can not create!')
    }
})

//DETELE
router.delete("/:id", verify , async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Order.findByIdAndDelete(req.params.id)
            res.status(200).json({ status: 'success',massage: "Đơn hàng đã được xóa!" , payload: null })
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You can not create!')
    }
})

//GET USER ORDERS
router.get("/find/:userId", verify , async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const orders = await Order.find({ userId: req.params.userId })
            res.status(200).json(orders)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You can not create!')
    }
})

//GET MONTHLY INCOME
router.get("/income", verify , async (req, res) => {
    if (req.user.isAdmin) {
        const date = new Date()
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
      
        try {
            const income = await Order.aggregate([
                { $match: { createdAt: { $gte: previousMonth } } },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        sales: "$amount",
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: "$sales" },
                    },
                },
            ])
            res.status(200).json(income)
        } catch (err) {
          res.status(500).json(err)
        }
    } else {
        res.status(403).json('You can not create!')
    }
})

module.exports = router
