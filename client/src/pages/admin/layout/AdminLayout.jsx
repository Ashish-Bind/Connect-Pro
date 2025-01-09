import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Menu as MenuIcon,
  Person as UserIcon,
} from '@mui/icons-material'
import {
  Box,
  Drawer,
  Grid2,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from '../../../components/styles/StyledComponent'
import { gray, mattBlack } from '../../../constants/color'
import { useAsyncMutation } from '../../../hooks/customHooks'
import { useAdminLogoutMutation } from '../../../redux/query/api'
import { adminNotExists } from '../../../redux/reducer/auth'

const adminTabs = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    Icon: DashboardIcon,
  },
  {
    name: 'Users',
    path: '/admin/user-management',
    Icon: UserIcon,
  },
  {
    name: 'Chats',
    path: '/admin/chat-management',
    Icon: ChatIcon,
  },
]

const Sidebar = ({ w = '100%' }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAdmin } = useSelector((state) => state.auth)

  const [adminLogout, isAdminLogoutLoading] = useAsyncMutation(
    useAdminLogoutMutation
  )
  const logoutHandler = () => {
    adminLogout('Admin logged out...').then(() => {
      dispatch(adminNotExists())
      navigate('/admin')
    })
  }

  if (!isAdmin && isAdminLogoutLoading) {
    return <div>Loading...</div>
  }

  return (
    <Stack width={w} direction={'column'} p={'3rem'} spacing={'3rem'}>
      <Typography variant="h5">ConnectPro.</Typography>

      <Stack spacing={'1rem'}>
        {adminTabs.map(({ path, name, Icon }) => (
          <Link
            to={path}
            key={name}
            sx={
              location.pathname === path
                ? { bgcolor: mattBlack, color: 'white' }
                : {}
            }
          >
            <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
              <Icon />
              <Typography>{name}</Typography>
            </Stack>
          </Link>
        ))}

        <Link to="/admin" onClick={logoutHandler}>
          <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
            <ExitToAppIcon />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  )
}

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAdmin } = useSelector((state) => state.auth)

  const [adminLogout, isAdminLogoutLoading] = useAsyncMutation(
    useAdminLogoutMutation
  )

  const [isMobile, setIsMobile] = useState(false)

  const handleMobile = () => setIsMobile(!isMobile)

  const handleMobileClose = () => setIsMobile(false)

  if (!isAdmin) return <Navigate to="/admin" />

  return (
    <Grid2 container sx={{ minHeight: '100vh' }}>
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          right: '1rem',
          top: '1rem',
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid2
        sx={{ display: { xs: 'none', md: 'block' } }}
        size={{ lg: 3, md: 4 }}
      >
        <Sidebar />
      </Grid2>
      <Grid2 size={{ lg: 9, md: 8, xs: 12 }} bgcolor={gray}>
        {children}
      </Grid2>

      <Drawer
        open={isMobile}
        onClose={handleMobileClose}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Sidebar />
      </Drawer>
    </Grid2>
  )
}

export default AdminLayout
