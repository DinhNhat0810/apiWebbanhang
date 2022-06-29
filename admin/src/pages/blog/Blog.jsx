import PublishIcon from '@mui/icons-material/Publish'
import { useState, useContext, useEffect } from 'react'
import storage from "../../firebase"
import { Link, useParams} from 'react-router-dom'
import { updateBlog } from '../../context/blogContext/apiCalls'
import { BlogContext } from '../../context/blogContext/BlogContext'
import axios from 'axios'

import './blog.scss'

const Blog = () => {

    const [imgUpdate, setImgUpdate] = useState(null)
    const [blogUpdated, setBlogUpdated] = useState(null)
    const [uploaded, setUploaded] = useState(0)
    const [blog, setBlog]  = useState([])
    // const [cat, setCat] = useState([])
    const { dispatch } = useContext(BlogContext)
    const { blogId } = useParams({})


    useEffect(() => {
   
            const getBlog = async () => {
                try {
                    const res = await axios.get(`/blogs/find/${blogId}`)
                    console.log('ok')
                    setBlog(res.data.payload)
                } catch (err) {
                    console.log(err)
                }
            }
    
            getBlog()

    }, [])


    useEffect(() => {
        
        return () => {
            imgUpdate && URL.revokeObjectURL(imgUpdate.preview)
        }
    }, [imgUpdate])

    const handlePreviewImg = (e) => {

        const file = e.target.files[0]
        file && (file.preview = URL.createObjectURL(file))
        setImgUpdate(file)
    }

    const upload = (items) => {
        items.forEach((item) => {

            const fileName = new Date().getTime() + item.label + item.file.name
            const uploadTask = storage.ref(`/items/${fileName}`).put(item.file)
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + ' % done.') 
            }, err => {console.log(err)}, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    setBlogUpdated(prev => {
                        return {...prev, [item.label]:url }
                    })

                    setUploaded((prev) => prev + 1)
                })
            })
        })
    }

    const handleUpload = (e) => {
        e.preventDefault()
        upload([
            { file: imgUpdate, label: "img" },
        ])
    }

    

    const handleChange = (e) => {
        const value = e.target.value
        setBlogUpdated({ ...blogUpdated, [e.target.name]: value})
    }
  
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(blogUpdated)
        updateBlog(blog._id , blogUpdated, dispatch)
    }

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Thông tin sản phẩm</h1>
                <Link to="/newProduct">
                    <button className="productCreateButton">Tạo mới</button>
                </Link>
            </div>

            <div className="productTop">

                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={blog ? blog.img : 'https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'} alt="" className="productInfoImg" />
                        <span className="productName">Tên bài viết: {blog ? blog.title : '...'}</span>
                    </div>

    
                </div>

            </div>
            
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Tên bài viết</label>
                        <input 
                            type="text" 
                            defaultValue={blog ? blog.title : '...'} 
                            name="title"
                            onChange={handleChange}
                        />

                        <label>Chi tiết bài viết</label>
                        <input 
                            type="text" 
                            defaultValue={blog ? blog.description : '...'} 
                            name="description"
                            onChange={handleChange}
                        />

                        <label>Nội dung</label>
                        <textarea  
                            type="text" 
                            defaultValue={blog ? blog.content : '...'} 
                            name="content"
                            onChange={handleChange}
                        ></textarea>
                    </div>
                       
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={imgUpdate ? imgUpdate.preview : blog.img} alt="" className="productUploadImg" />
                            <label htmlFor="file">
                                <PublishIcon/>
                            </label>
                            <input 
                                type="file" 
                                id="file" 
                                style={{display:"none"}} 
                                onChange={handlePreviewImg}
                            />
                        </div>
                       <div className="buttons">
                        {uploaded === 1 ? (
                                <p>Chọn nút cập nhật để hoàn thành</p>
                                ) : (
                                <button className="productButton" onClick={handleUpload}>
                                    Cập nhật hình ảnh
                                </button>
                            )}
                            <button className="productButton" onClick={handleSubmit}>
                                Cập nhật
                            </button>
                       </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Blog