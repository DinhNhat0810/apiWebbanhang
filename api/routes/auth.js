const router = require("express").Router()
const CryptoJS = require("crypto-js")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

//REGISTER
router.post("/register", async (req, res) => {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
      res.status(200).json({ status:"failure", message: "Vui lòng nhập đủ thông tin", payload : null })
    }

    const userCheck = await User.findOne({ username: username })
    userCheck && res.status(200).json( { status: "failure", message: "Tên đăng nhập đã tồn tại!", payload: null} )
    const emailCheck = await User.findOne({ email: email })
    emailCheck && res.status(200).json( { status: "failure", message: "Địa chỉ email đã tồn tại!", payload: null} )

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    })
  
    try {
      const savedUser = await newUser.save()
      res.status(200).json({ status: 'success',massage: "Tạo tài khoản thành công" , payload: savedUser })
    } catch (err) {
      res.status(500).json(err)
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(401).json( { status: 'failure', massage: 'Địa chỉ email không chính xác!', payload: null} )

        // Decrypt password
        var bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
        var originalTPassword = bytes.toString(CryptoJS.enc.Utf8)

        if (originalTPassword !== req.body.password) {
          return res.status(401).json({ status: 'failure', massage: 'Mật khẩu không chính xác!', payload: null} )
        }
          
        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin },
          process.env.SECRET_KEY,
          { expiresIn: '5d' }
        )

        const { password, ...infor } = user._doc
        res.status(200).json({ status: 'success', message: "Đăng nhập thành công", payload: {...infor, accessToken} })
        
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router