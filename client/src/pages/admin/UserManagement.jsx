import { useEffect, useState } from 'react'
import AdminLayout from './layout/AdminLayout'
import Table from '../../components/Table'
import { Avatar } from '@mui/material'
import { dashboardData } from '../../constants/data'

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
    headerClassName: 'table-header',
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    width: 200,
    headerClassName: 'table-header',
    renderCell: (params) => {
      return <Avatar src={params.row.avatar} alt="avatar" />
    },
  },
  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'username',
    headerName: 'Username',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'friends',
    headerName: 'Friends',
    headerClassName: 'table-header',
    width: 150,
  },
  {
    field: 'groups',
    headerName: 'Groups',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'joined',
    headerName: 'Joined',
    headerClassName: 'table-header',
    width: 200,
  },
]

const UserManagement = () => {
  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(dashboardData.users.map((user) => ({ ...user, id: user._id })))
  })

  return (
    <AdminLayout>
      <Table rows={rows} heading={'All Users'} columns={columns} />
    </AdminLayout>
  )
}

export default UserManagement
