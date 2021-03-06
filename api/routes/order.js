const router = require("express").Router();
const verify = require("./verifyToken");
const Order = require("../models/Order");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user._id === req.params.id || req.user.isAdmin) {
    const newOrder = new Order(req.body);
    try {
      const savedOrder = await newOrder.save();
      return res.status(200).json({
        status: "success",
        massage: "Đặt hàng thành công!",
        payload: savedOrder,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You not authenticated!");
  }
});

// //UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json({
        status: "success",
        massage: "Cập nhật thành công!",
        payload: updatedOrder,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You not authenticated!");
  }
});

// //DETELE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "success",
        massage: "Đơn hàng đã được xóa!",
        payload: null,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You not authenticated!");
  }
});

//GET USER ORDER
router.get("/find/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const orders = await Order.find({ _id: req.params.id });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You not authenticated!");
  }
});

// //GET USER ORDERS
router.get("/find/user/:id", verify, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ORDERS
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const orders = await Order.find().sort({ createdAt: -1 }).limit(4);
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You not authenticated!");
  }
});

//GET MONTHLY INCOME
router.get("/income", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

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
      ]).sort({ _id: 1 });
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You not authenticated!");
  }
});

//GET TOTAL ODDERS
router.get("/total", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    try {
      const total = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(total);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You not authenticated!");
  }
});

// GET done
router.get("/done", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const orders = await Order.find({ status: "Đã hoàn thành" });
      res.status(200).json(orders.length);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You not authenticated!");
  }
});

module.exports = router;
