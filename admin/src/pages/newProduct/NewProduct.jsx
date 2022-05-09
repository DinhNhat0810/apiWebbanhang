import { useState, useContext, useEffect} from 'react'
import { createProduct } from '../../context/productContext/apiCalls'
import { ProductContext } from '../../context/productContext/ProductContext'
import storage from "../../firebase"
import './newProduct.scss'

const NewProduct = () => {
    const [productImg, setProductImg] = useState()
    const [product, setProduct] = useState(null)
    const { dispatch } = useContext(ProductContext)
    const [uploaded, setUploaded] = useState(0)

    useEffect(() => {

        return () => {
            productImg && URL.revokeObjectURL(productImg.preview)
        }
    }, [productImg])

    const handlePreviewProductImg = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setProductImg(file)
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
                    setProduct(prev => {
                        return {...prev, [item.label]:url }
                    })

                    setUploaded((prev) => prev + 1)
                })
            })
        })
    }

    const handleChange = (e) => {
        const value = e.target.value
        setProduct({ ...product, [e.target.name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        upload([
            { file: productImg, label: "img" },
        ])
    }

    useEffect(() => {
        if (uploaded === 1) {
            createProduct(product, dispatch)
            setUploaded((prev) => prev - 1)
        }
    }, [uploaded])

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">Sản phẩm mới</h1>
            <div className="uploadData">
                <form className="addProductForm">
                    <div className="addProductItem">
                        <label>Hình ảnh</label>
                        <input 
                            type="file" 
                            id="file" 
                            required
                            onChange = {handlePreviewProductImg} 
                        />
                    </div>

                    <div className="addProductItem">
                        <label>Tên sản phẩm</label>
                        <input 
                            type="text" 
                            placeholder="..."
                            name="title"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="addProductItem">
                        <label>Chi tiết sản phẩm</label>
                        <input 
                            type="text" 
                            placeholder="..."
                            name="desc" 
                            onChange={handleChange}
                        />
                    </div>

                    <div className="addProductItem">
                        <label>Giá sản phẩm</label>
                        <input 
                            type="text" 
                            placeholder="..."
                            name="price"
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="addProductItem">
                        <label>Kích cỡ</label>
                        <input 
                            type="text" 
                            placeholder="example: 28, 29"
                            name="size" 
                            onChange={handleChange}
                        />
                    </div>

                    <div className="addProductItem">
                        <label>Giảm giá</label>
                        <input 
                            type="text" 
                            placeholder="..."
                            name="discount" 
                            onChange={handleChange}
                        />
                    </div>

                    <div className="addProductItem">
                        <label>Loại sản phẩm</label>
                        <input 
                            type="text" 
                            placeholder="example: Nam, NỮ"
                            name="categories" 
                            onChange={handleChange}
                        />
                    </div>

                    <button className="addProductButton" onClick={handleSubmit}>
                        Thêm sản phẩm
                    </button>
                </form>

                <div className="addProductDisplayImg">
                    {productImg ? 
                        (<img src={productImg.preview} alt="" className="addProductImg" />) : 
                        (<p>No img display</p>) 
                    }
                </div>
            </div>


        </div>
    )
}

export default NewProduct