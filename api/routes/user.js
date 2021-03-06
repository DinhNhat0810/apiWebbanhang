const router = require("express").Router();
const verify = require("./verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update your account!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can not delete this account!");
  }
});

//GET
router.get("/find/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const user = await User.findById(req.params.id);

      const { password, ...infor } = user._doc;
      // Decrypt password
      var bytes = CryptoJS.AES.decrypt(password, process.env.SECRET_KEY);
      var originalTPassword = bytes.toString(CryptoJS.enc.Utf8);

      res
        .status(200)
        .json({
          status: "success",
          payload: { originalTPassword, ...infor },
        });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can not show this account!");
  }
});

//GET ALL
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ createdAt: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json("B???n kh??ng c?? ????? quy???n ????? hi???n th??? t???t c??? ng?????i d??ng!");
  }
});

//Get user stats
router.get("/stats", async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]).sort({ _id: 1 });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
