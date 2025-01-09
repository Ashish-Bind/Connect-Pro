import { useEffect, useState } from 'react'
import AdminLayout from './layout/AdminLayout'
import Table from '../../components/Table'
import { Avatar, Stack } from '@mui/material'
import { dashboardData } from '../../constants/data'
import AvatarCard from '../../components/AvatarCard'
import { transformImage } from '../../libs/features'
import { useChatStatsQuery } from '../../redux/query/api'

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    headerClassName: 'table-header',
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },

  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'table-header',
    width: 300,
  },

  {
    field: 'groupChat',
    headerName: 'Group',
    headerClassName: 'table-header',
    width: 100,
  },
  {
    field: 'totalMembers',
    headerName: 'Total Members',
    headerClassName: 'table-header',
    width: 120,
  },
  {
    field: 'members',
    headerName: 'Members',
    headerClassName: 'table-header',
    width: 200,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: 'totalMessages',
    headerName: 'Total Messages',
    headerClassName: 'table-header',
    width: 120,
  },
  {
    field: 'creator',
    headerName: 'Created By',
    headerClassName: 'table-header',
    width: 250,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={'1rem'}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
]

const ChatManagement = () => {
  const { data } = useChatStatsQuery()
  const [rows, setRows] = useState([])

  const { chats } = data || []

  useEffect(() => {
    setRows(
      chats?.map((i) => ({
        ...i,
        id: i._id,
        avatar: i.groupChat
          ? [i.groupAvatar]
          : i.avatar.map((i) => transformImage(i, 50)),
        members: i.members.map((i) => transformImage(i.avatar, 50)),
        creator: {
          name: i.creator.name,
          avatar: transformImage(i.creator.avatar, 50),
        },
      }))
    )
  }, [])

  return (
    <AdminLayout>
      <Table rows={rows} heading={'All Users'} columns={columns} />
    </AdminLayout>
  )
}

export default ChatManagement
