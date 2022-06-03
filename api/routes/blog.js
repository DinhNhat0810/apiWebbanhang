const router = require("express").Router();
const Blog = require("../models/Blog");

//CREATE
router.post("/", async (req, res) => {
  const { title, description, content } = req.body;
  const titleCheck = await Blog.findOne({ title: title });

  if (!title || !description || !content) {
    return res.status(200).json({
      status: "failure",
      message: "Vui lòng nhập đủ thông tin",
      payload: null,
    });
  }

  if (titleCheck) {
    return res.status(200).json({
      status: "failure",
      message: "Tên bài viết đã tồn tại",
      payload: null,
    });
  }

  const newBlog = new Blog(req.body);
  try {
    const savedBlog = await newBlog.save();
    return res.status(200).json({
      status: "success",
      message: `Thêm bài viết thành công`,
      payload: savedBlog,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updateBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
        status: "success",
        message: `Cập nhật bài viết thành công`,
        payload: updateBlog,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE blog
router.delete("/:id", async (req, res) => {
  try {
    const blogDeleted = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: "success",
        message: `Bài viết đã được xóa!`,
        payload: blogDeleted,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Blog
router.get("/find/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json({ status: "success", payload: blog });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: "Không tìm thấy bài viết!",
      payload: null,
    });
  }
});

//GET ALL Blog
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({ status: "success", payload: blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
