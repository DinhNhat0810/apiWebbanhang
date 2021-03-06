import { useState, useContext, useEffect} from 'react'
import { createProduct } from '../../context/productContext/apiCalls'
import { ProductContext } from '../../context/productContext/ProductContext'
import storage from "../../firebase"
import './newProduct.scss'

const NewProduct = () => {
    const { dispatch } = useContext(ProductContext)
    const [productImg, setProductImg] = useState()
    const [product, setProduct] = useState(null)
    const [uploaded, setUploaded] = useState(0)
    const [cat, setCat] = useState([])
    const [productSize, setProductSize] = useState([])


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
        setProduct({ ...product, [e.target.name]: value, size: productSize, categories: cat })
    }

    const handleSize = (e) => {
        setProductSize(e.target.value.split(","))
    } 

    const handleCat = (e) => {
        setCat(e.target.value.split(","))
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
            <h1 className="addProductTitle">S???n ph???m m???i</h1>
            <div className="uploadData">
                <form className="addProductForm">
                    <div className="addProductItem">
                        <label>H??nh ???nh</label>
                        <input 
                            type="file" 
                            id="file" 
                            required
                            onChange = {handlePreviewProductImg} 
                        />
                    </div>

                    <div className="addProductItem">
                        <label>T??n s???n ph???m</label>
                        <input 
                            type="text" 
                            placeholder="..."
                            name="title"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="addProductItem">
                        <label>Chi ti???t s???n ph???m</label>
                        <input 
                            type="text" 
                            placeholder="..."
                            name="desc" 
                            onChange={handleChange}
                        />
                    </div>

                    <div className="addProductItem">
                        <label>Gi?? s???n ph???m</label>
                        <input 
                            type="text" 
                            placeholder="..."
                            name="price"
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="addProductItem">
                        <label>K??ch c???</label>
                        <input 
                            type="text" 
                            placeholder="example: 28, 29"
                            name="size" 
                            onChange={handleSize}
                        />
                    </div>

                    <div className="addProductItem">
                        <label>Gi???m gi??</label>
                        <input 
                            type="text" 
                            placeholder="..."
                            name="discount" 
                            onChange={handleChange}
                        />
                    </div>

                    <div className="addProductItem">
                        <label>Lo???i s???n ph???m</label>
                        <input 
                            type="text" 
                            placeholder="example: Nam, N???"
                            name="categories" 
                            onChange={handleCat}
                        />
                    </div>

                    <button className="addProductButton" onClick={handleSubmit}>
                        Th??m s???n ph???m
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