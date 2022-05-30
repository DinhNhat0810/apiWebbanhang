import { DataGrid } from '@mui/x-data-grid'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/productContext/ProductContext'
import { getProducts, deleteProduct } from '../../context/productContext/apiCalls'
import './productList.scss'


const ProductList = () => {
    const { products, dispatch } = useContext(ProductContext)
    const [searchValue, setSearchValue] = useState('')


    useEffect(() => {

      let isCancelled = false
            
      if (!isCancelled) {
        getProducts(dispatch)
      }
      
      return () => {
        isCancelled = true
      }
    }, [dispatch])

    const handleDelete = (id) => {
      deleteProduct(id, dispatch)
    }

    const handleChange = (e) => {
      setSearchValue(e.target.value)
    }


    const columns = [
        { field: '_id', headerName: 'Mã sản phẩm', width: 200 },
        { field: 'product', headerName: 'Sản phẩm', width: 300, renderCell: (params) => { 
          return (
            <div className="productListItem">
              <img className="productListImg" src={params.row.img} alt="" />
              {params.row.title}
            </div>
          )
        }},
        {
          field: 'price',
          headerName: 'Giá',
          width: 160,
          renderCell: (params) => {
            return (
              <>
                <span>{params.row.price}.000vnđ</span>
              </>
            )
          }
        },
        {
          field: 'categories',
          headerName: 'Thể loại',
          width: 160,
          renderCell: (params) => {
            return (
              <>
                <span>{params.row.categories}</span>
              </>
            )
          }
        },
        {
          field: 'action',
          headerName: '',
          width: 120,
          renderCell: (params) => {
            return (
              <>
                <Link to={{ pathname: "/product/" + params.row._id, product: params.row }}>
                  <button className="productListEdit">Edit</button>
                </Link>
                <DeleteOutlinedIcon className="productListDelete" onClick={() => handleDelete(params.row._id)}/>
              </>
            )
          }
        },
    ]

    return (
        <div className="productList">
            <div className="productList__search">
              <input 
                className="productList__search-input" 
                type="text" 
                placeholder="Tìm kiếm sản phẩm..."
                onChange={handleChange}
              />
              <SearchIcon className="productList__search-icon"/>
            </div>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={products}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    getRowId={(r) => r._id}
                    // checkboxSelection

                />
            </div>
        </div>
    )
}

export default ProductList