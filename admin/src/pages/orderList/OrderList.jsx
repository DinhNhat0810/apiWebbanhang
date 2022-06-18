import { DataGrid } from '@mui/x-data-grid'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useContext, useEffect } from 'react'
import { OrderContext } from '../../context/orderContext/OrderContext'
import { getOrders, deleteOrder } from '../../context/orderContext/apiCalls'
import './productList.scss'

function changeDateFormat(date) {
  const newDate = new Date(date);
  const day = `0${newDate.getDate()}`.slice(-2);
  const month = `0${newDate.getMonth() + 1}`.slice(-2);
  const year = newDate.getFullYear();
  const hours = `0${newDate.getHours()}`.slice(-2);
  const minutes = `0${newDate.getMinutes()}`.slice(-2);
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}


const OrderList = () => {
    const { orders, dispatch } = useContext(OrderContext)


    useEffect(() => {

      let isCancelled = false
            
      if (!isCancelled) {
        getOrders(dispatch)
      }
      
      return () => {
        isCancelled = true
      }
    }, [dispatch])

    const handleDelete = (id) => {
      deleteOrder(id, dispatch)
    }

    console.log(orders)


    const columns = [
        { field: 'username', headerName: 'Tên khách hàng', width: 200, renderCell: (params) => { 
          return (
            <div className="productListItem">
              {params.row.username}
            </div>
          )
        }},
        {
          field: 'createdAt',
          headerName: 'Thời gian',
          width: 160,
          renderCell: (params) => {
            return (
              <>
                <span>{changeDateFormat(params.row.createdAt)}</span>
              </>
            )
          }
        },
        {
          field: 'amount',
          headerName: 'Tổng giá tiền',
          width: 120,
          renderCell: (params) => {
            return (
              <>
                <span>${params.row.amount}</span>
              </>
            )
          }
        },
        {
          field: 'address',
          headerName: 'Địa chỉ',
          width: 160,
          renderCell: (params) => {
            return (
              <>
                <span>{params.row.address}</span>
              </>
            )
          }
        },
        {
          field: 'status',
          headerName: 'Trạng thái',
          width: 150,
          renderCell: (params) => {
            return (
              <>
                <span>{params.row.status}</span>
              </>
            )
          }
        },
        {
          field: 'action',
          headerName: 'Xóa đơn hàng',
          width: 100,
          renderCell: (params) => {
            return (
              <>
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
                    rows={orders}
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

export default OrderList