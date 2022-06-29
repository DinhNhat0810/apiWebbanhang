import { DataGrid } from '@mui/x-data-grid'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { BlogContext } from '../../context/blogContext/BlogContext'
import { getBlogs, deleteBlog } from '../../context/blogContext/apiCalls'
import './blogList.scss'


const BlogList = () => {
    const { blogs, dispatch } = useContext(BlogContext)


    useEffect(() => {

      let isCancelled = false
            
      if (!isCancelled) {
        getBlogs(dispatch)
      }
      
      return () => {
        isCancelled = true
      }
    }, [dispatch])

    const handleDelete = (id) => {
      deleteBlog(id, dispatch)
    }


    const columns = [

        { field: 'title', headerName: 'Tên bài viết', width: 300, renderCell: (params) => { 
          return (
            <div className="productListItem">
              <img className="productListImg" src={params.row.img} alt="" />
              {params.row.title}
            </div>
          )
        }},
        {
          field: 'description',
          headerName: 'Mô tả',
          width: 300,
          renderCell: (params) => {
            return (
              <>
                <span>{params.row.description}</span>
              </>
            )
          }
        },
        {
          field: 'content',
          headerName: 'Nội dung',
          width: 300,
          renderCell: (params) => {
            return (
              <>
                <span>{params.row.content}</span>
              </>
            )
          }
        },
        {
          field: 'action',
          headerName: 'Action',
          width: 120,
          renderCell: (params) => {
            return (
              <>
                <Link to={{ pathname: "/blog/" + params.row._id, product: params.row }}>
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

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={blogs}
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

export default BlogList