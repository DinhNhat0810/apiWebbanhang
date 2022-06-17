import { DataGrid } from '@mui/x-data-grid'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/userContext/UserContext'
import { getUsers, deleteUser } from '../../context/userContext/apiCalls'
import './userList.scss'

const UserList = () => {

  const { users, dispatch } = useContext(UserContext)

  useEffect(() => {

    let isCancelled = false
          
    if (!isCancelled) {
      getUsers(dispatch)
    }
    
    return () => {
      isCancelled = true
    }
  }, [dispatch])

  const handleDelete = (id) => {
      deleteUser(id, dispatch)
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'username', headerName: 'Tên đăng nhập', width: 200, renderCell: (params) => { 
      return (
        <div className="userListUser">
          <img className="userListImg" src={params.row.profilePicture} alt="" />
          {params.row.username}
        </div>
      )
    }},
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'isAdmin',
      headerName: 'IsAdmin',
      width: 120,
    },
    {
      field: 'action',
      headerName: '',
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: "/user/" + params.row._id }}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlinedIcon className="userListDelete" onClick={() => handleDelete(params.row._id)}/>
          </>
        )
      }
    },
  ]

    return (
        <div className="userList">
            <div style={{ height: 500, width: '100%'}}>
                <DataGrid
                    rows={users}
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

export default UserList